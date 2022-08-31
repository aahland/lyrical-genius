<script>
	import { io } from '$lib/realtime';
	import { createEventDispatcher } from 'svelte';
	import { storedStats, questions } from '../helpers/store';
	import { get } from 'svelte/store';
	import { randomArrayShuffle } from '../helpers/randomArrayShuffle';

	const dispatch = createEventDispatcher();
	let round = 'Round 4';
	let objects = get(questions);
	let allStats = [{}];
	let song1 = '';
	let playersReadytoStart = [];
	let extraPoint = [];

	// Server listening on final scores send for each player. Saves scores to store.
	io.on('finalScores', ({ finalScores }) => {
		allStats = [...allStats, { finalScores }];
		console.log(allStats);
		storedStats.set(allStats);
	});

	// Listening on players ready to start round. Won't start until all 4 players are ready.
	io.on('start', (start) => {
		playersReadytoStart = [...playersReadytoStart, start];
		let waiting = document.getElementById('waiting');
		waiting.innerHTML = 'waiting for other players';
		let playersReady = document.getElementById('playersReady');
		if (playersReadytoStart.length === 1) {
			playersReady.innerHTML = '1/4';
		}
		if (playersReadytoStart.length === 2) {
			playersReady.innerHTML = '2/4';
		}
		if (playersReadytoStart.length === 3) {
			playersReady.innerHTML = '3/4';
		}
		if (playersReadytoStart.length === 4) {
			waiting.remove();
			playersReady.remove();
			displayLyrics();
		}
	});

	let lyrics;
	let answerAlts;
	let splittedLyrics;
	async function displayLyrics() {
		splittedLyrics = splitLyrics(lyrics);
		song1 = objects[0].data[3].song.answer.song;
		lyrics = objects[0].data[3].song.answer.lyrics;
		answerAlts = randomArrayShuffle(objects[0].data[3].answerAlts);
	}
	// Sends info to server that you are ready to start the round
	function startRound() {
		let start = 'start';
		io.emit('start', start);
		let btn = document.getElementById('btn');
		btn.style.height = '0px';
		btn.style.visibility = 'hidden';
	}
	// Handles the players answer, sends the final score for each player to the server
	async function buttonClicked(event) {
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
				console.log('you got extra point');
			}
		} else {
			document.getElementById(button).style.backgroundColor = 'red';
			let audio = new Audio('../static/sounds/wrong.wav');
			audio.play();
			let correct = document.getElementById('button1');
			correct.style.backgroundColor = 'green';
		}
		setTimeout(function () {
			dispatch('newRound');
			let componentWrapper = document.getElementById('componentWrapper');
			componentWrapper.remove();
			let name = localStorage.getItem('Playername');
			let score = localStorage.getItem('Score');
			let finalScores = { name, score };
			io.emit('finalScores', finalScores);
		}, 2000);
	}
</script>

<div id="mainWrapper" class="mainWrapper">
	<div class="componentWrapper" id="componentWrapper">
		<p class="round">{round}</p>
		<div id="stylisticLine" />
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
