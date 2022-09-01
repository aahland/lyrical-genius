<script>
	import { createEventDispatcher } from 'svelte';
	import { getRandomAnswer } from '../helpers/answers';
	import { distractors } from '../helpers/sendAlternatives';
	import { questions } from '../helpers/store';
	import { randomArrayShuffle } from '../helpers/randomArrayShuffle';
	import { splitLyrics } from '../helpers/splitLyrics';
	import { get } from 'svelte/store';

	const dispatch = createEventDispatcher();
	let round = 1;
	let lyrics;
	let answerAlts;
	let splittedLyrics;
	let song1;
	let i = 0;
	localStorage.setItem('Score', '0');
	let songs = getRandomAnswer();
	console.log(songs[0]);
	$: song1 = songs[i].answer.song;
	console.log(song1);
	let data = [
		{
			song: songs[0],
			distractor1: distractors[0],
			distractor2: distractors[1],
			answerAlts: [
				{ song: distractors[0], id: 'button2' },
				{ song: distractors[1], id: 'button3' },
				{ song: songs[0].answer.song, id: 'button1' }
			]
		},
		{
			song: songs[1],
			distractor1: distractors[2],
			distractor2: distractors[3],
			answerAlts: [
				{ song: distractors[2], id: 'button2' },
				{ song: distractors[3], id: 'button3' },
				{ song: songs[1].answer.song, id: 'button1' }
			]
		},
		{
			song: songs[2],
			distractor1: distractors[4],
			distractor2: distractors[5],
			answerAlts: [
				{ song: distractors[4], id: 'button2' },
				{ song: distractors[5], id: 'button3' },
				{ song: songs[2].answer.song, id: 'button1' }
			]
		},
		{
			song: songs[3],
			distractor1: distractors[6],
			distractor2: distractors[7],
			answerAlts: [
				{ song: distractors[6], id: 'button2' },
				{ song: distractors[7], id: 'button3' },
				{ song: songs[3].answer.song, id: 'button1' }
			]
		}
	];

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
			lyrics = data[i].song.answer.lyrics;
			splittedLyrics = splitLyrics(lyrics);
			console.log(splittedLyrics);
			answerAlts = randomArrayShuffle(data[i].answerAlts);
			console.log(answerAlts);
		}, 500);
	}

	function displayLyrics() {
		lyrics = data[0].song.answer.lyrics;
		splittedLyrics = splitLyrics(lyrics);
		console.log(splittedLyrics);
		answerAlts = randomArrayShuffle(data[0].answerAlts);
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
	}

	displayLyrics();
</script>

<div id="mainWrapper" class="mainWrapper">
	<div class="componentWrapper" id="componentWrapper">
		<p class="round">Round{round}</p>
		<div id="stylisticLine" />
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
	#mainWrapper {
		text-align: center;
		color: #198dc1;
	}
</style>
