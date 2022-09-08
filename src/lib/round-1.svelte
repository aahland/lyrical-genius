<script>
	import { io } from '$lib/realtime';
	import { createEventDispatcher } from 'svelte';
	import { getRandomAnswer } from '../helpers/answers';
	import { distractors } from '../helpers/sendAlternatives';
	import { questions, storedStats } from '../helpers/store';
	import { randomArrayShuffle } from '../helpers/randomArrayShuffle';
	import { splitLyrics } from '../helpers/splitLyrics';
	import supabase from '$lib/db';
	let supaSongs;
	async function getSupaData() {
		const { data, error } = await supabase.from('lyrical-genius').select('*');
		if (error) throw new Error(error.message);
		randomArrayShuffle(data);

		supaSongs = [
			{
				song: [{ song: data[0].song, artist: data[0].artist, lyric: data[0].lyric }],
				distractor1: distractors[0],
				distractor2: distractors[1],
				answerAlts: [
					{ song: distractors[0], id: 'button2' },
					{ song: distractors[1], id: 'button3' },
					{ song: data[0].song, id: 'button1' }
				]
			},
			{
				song: [{ song: data[1].song, artist: data[1].artist, lyric: data[1].lyric }],
				distractor1: distractors[2],
				distractor2: distractors[3],
				answerAlts: [
					{ song: distractors[2], id: 'button2' },
					{ song: distractors[3], id: 'button3' },
					{ song: data[1].song, id: 'button1' }
				]
			},
			{
				song: [{ song: data[2].song, artist: data[2].artist, lyric: data[2].lyric }],
				distractor1: distractors[4],
				distractor2: distractors[5],
				answerAlts: [
					{ song: distractors[4], id: 'button2' },
					{ song: distractors[5], id: 'button3' },
					{ song: data[2].song, id: 'button1' }
				]
			},
			{
				song: [{ song: data[3].song, artist: data[3].artist, lyric: data[3].lyric }],
				distractor1: distractors[6],
				distractor2: distractors[7],
				answerAlts: [
					{ song: distractors[6], id: 'button2' },
					{ song: distractors[7], id: 'button3' },
					{ song: data[3].song, id: 'button1' }
				]
			}
		];
		return supaSongs;
	}

	console.log(getSupaData(), 'supadata');

	const dispatch = createEventDispatcher();
	let round = 'Round 1';
	let objects = [];
	let data;
	let playersReadyToStart = [];
	let song1 = '';
	let extraPoint = [];
	let playersAnswered = 0;

	// recieves sent data contains all songs and distractors for all 4 rounds. Saves data to store
	io.on('data', (data) => {
		console.log(data);
		storedStats.set([]);
		objects = [data];
		questions.set(objects);
		console.log(objects[0].data[0].song[0].song, 'object should be same for all');
	});

	// Listening on players ready to start round. Won't start until all 4 players are ready
	io.on('start', (start) => {
		playersReadyToStart = [...playersReadyToStart, start];
		let waiting = document.getElementById('waiting');
		waiting.innerHTML = 'waiting for other players';
		let playersReady = document.getElementById('playersReady');
		if (playersReadyToStart.length === 1) {
			playersReady.innerHTML = '1/4';
		}
		if (playersReadyToStart.length === 2) {
			playersReady.innerHTML = '2/4';
		}
		if (playersReadyToStart.length === 3) {
			playersReady.innerHTML = '3/4';
		}
		if (playersReadyToStart.length === 4) {
			waiting.remove();
			playersReady.remove();
			displayLyrics();
		}
	});

	io.on('answered', (answered) => {
		playersAnswered++;
		if (playersAnswered === 4) {
			dispatch('newRound');
		}
		let start = 'start';
		io.emit('start', start);
	});

	async function shareData() {
		data = await getSupaData();
		io.emit('data', data);
	}

	let lyrics;
	let answerAlts;
	let splittedLyrics;
	function displayLyrics() {
		lyrics = objects[0].data[0].song[0].lyric;
		splittedLyrics = splitLyrics(lyrics);
		console.log(splittedLyrics);
		answerAlts = randomArrayShuffle(objects[0].data[0].answerAlts);
	}

	// Sends info to server that you are ready to start the round
	function startRound() {
		let start = 'start';
		io.emit('start', start);
		let btn = document.getElementById('btn');
		btn.style.height = '0px';
		btn.style.visibility = 'hidden';
	}

	// Handles the players answer
	function buttonClicked(event) {
		let innerHtml = event.target.innerHTML;
		let button = event.target.id;
		if (innerHtml === song1) {
			document.getElementById(button).style.backgroundColor = 'green';
			let audio = new Audio('../static/sounds/correct.wav');
			audio.play();
			dispatch('correct');
			if (extraPoint.length === 1) {
				let score = localStorage.getItem('Score');
				let scoreAsNumber = parseInt(score);
				let newScore = scoreAsNumber + 1;
				let newScoreAsString = JSON.stringify(newScore);
				localStorage.setItem('Score', newScoreAsString);
			}
		} else {
			document.getElementById(button).style.backgroundColor = 'red';
			let audio = new Audio('../static/sounds/wrong.wav');
			audio.play();
			let correct = document.getElementById('button1');
			correct.style.backgroundColor = 'green';
		}
		setTimeout(function () {
			io.emit('answered');
		}, 2000);
	}
	shareData();
</script>

<div id="mainWrapper" class="mainWrapper">
	<div class="componentWrapper" id="componentWrapper">
		<p class="round">{round}</p>
		<div id="stylisticLine" />
		<!-- change this id -->
		<button id="btn" class="button" on:click={startRound}>start round</button>
		<div class="waitingForPlayers">
			<p id="waiting" />
			<p id="playersReady" />
		</div>
		<div class="lyricsWrapper1" id="lyricsWrapper1">
			{#if splittedLyrics}
				{#each splittedLyrics as splittedLyric}
					<div class="displayLyrics">
						<p class="snippet">
							{splittedLyric}
						</p>
					</div>
				{/each}
			{/if}
		</div>
		<div class="alternatives" id="alternatives">
			{#if answerAlts}
				{#each answerAlts as answerAlt}
					<div class="altBtns">
						<button on:click={buttonClicked} class="altBtn" id={answerAlt.id}>
							{answerAlt.song}
						</button>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
</style>
