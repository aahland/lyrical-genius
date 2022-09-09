<script>
	import { createEventDispatcher } from 'svelte';
	import { distractors } from '../helpers/sendAlternatives';
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

	const dispatch = createEventDispatcher();
	let round = 1;
	let lyrics;
	let answerAlts;
	let all;
	let splittedLyrics;
	let song1;
	let i = 0;
	localStorage.setItem('Score', '0');

	function buttonClicked(event) {
		let innerHtml = event.target.innerHTML;
		let button = event.target.id;
		if (innerHtml === song1) {
			document.getElementById(button).style.backgroundColor = 'green';
			let audio = new Audio('../static/sounds/correct.wav');
			audio.play();
			dispatch('correct');
		} else {
			document.getElementById(button).style.backgroundColor = 'red';
			let audio = new Audio('../static/sounds/wrong.wav');
			audio.play();
			let correct = document.getElementById('button1');
			correct.style.backgroundColor = 'green';
		}
		setTimeout(function () {
			let correct = document.getElementById('button1');
			correct.style.backgroundColor = '#198dc1';
			document.getElementById(button).style.backgroundColor = '#198dc1';
			round = round + 1;
			i = i + 1;
			if (i > 3) {
				gameOver();
			}
			lyrics = all[i].song[0].lyric;
			song1 = all[i].song[0].song;
			splittedLyrics = splitLyrics(lyrics);
			console.log(splittedLyrics);
			answerAlts = randomArrayShuffle(supaSongs[i].answerAlts);
		}, 500);
	}

	async function displayLyrics() {
		all = await getSupaData();
		console.log(all);
		lyrics = all[i].song[0].lyric;
		song1 = all[i].song[0].song;
		splittedLyrics = splitLyrics(lyrics);
		console.log(splittedLyrics);
		answerAlts = randomArrayShuffle(supaSongs[i].answerAlts);
	}

	function gameOver() {
		let mainWrapper = document.getElementById('mainWrapper');
		let componentWrapper = document.getElementById('componentWrapper');
		componentWrapper.remove();
		let gameOver = document.createElement('h1');
		mainWrapper.appendChild(gameOver);
		gameOver.id = 'gameOverHeader';
		gameOver.innerHTML = 'Game Over';
		let scoreDisplay = document.createElement('p');
		mainWrapper.appendChild(scoreDisplay);
		let score = localStorage.getItem('Score');
		scoreDisplay.innerHTML = score + '/4';
		scoreDisplay.id = 'scoreDisplay';
		scoreDisplay.style.color = 'white';
		scoreDisplay.style.fontWeight = 'bold';
		let playAgain = document.createElement('button');
		playAgain.innerHTML = 'Play Again';
		mainWrapper.appendChild(playAgain);
		playAgain.onclick = restartGame;
	}

	function restartGame() {
		dispatch('restartGame');
	}

	displayLyrics();
</script>

<div id="mainWrapper" class="mainWrapper">
	<div class="componentWrapper" id="componentWrapper">
		<p class="round">Round{round}</p>
		<div id="stylisticLine" />
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
	#mainWrapper {
		text-align: center;
		color: #198dc1;
	}
</style>
