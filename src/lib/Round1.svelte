<script>
	import { createEventDispatcher } from 'svelte';
	import { getLyrics } from '../helpers/fetchLyrics';
	import { answer } from '../helpers/fetchLyrics';

	const dispatch = createEventDispatcher();
	let round = 'Round 1';
	let score = 0;
	let fetched;
	let lyric;
	let song;
	let correct = answer[0].answer1.song;

	async function handleLyrics() {
		let snippet;
		fetched = await getLyrics();
		if (fetched[0].firstObject.includes('Paroles de la chanson')) {
			let fetchedAgain = getLyrics();
			lyric = await fetchedAgain;
		} else {
			lyric = fetched;
		}
		let textSplitted = lyric[0].firstObject.split(/(?=[A-Z])/);
		snippet = textSplitted[0] + textSplitted[1] + textSplitted[2];
		song = lyric[0].song;
		let distractor1 = lyric[0].distractor1;
		let distractor2 = lyric[0].distractor2;
		let alternatives = [song, distractor1, distractor2];

		function randomArrayShuffle(array) {
			var currentIndex = array.length,
				temporaryValue,
				randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}
		let shuffledAlternatives = randomArrayShuffle(alternatives);
		console.log(shuffledAlternatives);

		let data = {
			allData: { snippet: snippet, song: song, distractor1: distractor1, distractor2: distractor2 },
			alts: shuffledAlternatives
		};

		return data;
	}

	async function buttonClicked(event) {
		let innerHtml = event.target.innerHTML;
		let button = event.target.id;
		if (innerHtml === correct) {
			document.getElementById(button).style.backgroundColor = 'green';
			score = score + 1;
			dispatch('correct');
		} else {
			document.getElementById(button).style.backgroundColor = 'red';
			dispatch('wrong');
		}
		setTimeout(function () {
			dispatch('newRound');
			dispatch('score', score);
		}, 2000);
	}
</script>

<div>
	<div class="gameHeading">
		<p>{round}</p>
		<h1>Which song is this?</h1>
	</div>
	<div class="songLyric" />
	{#await handleLyrics()}
		<p>loading</p>
	{:then data}
		<p style="color: white">{data.allData.snippet}</p>
		<div class="answerAlternatives">
			<button id="button1" on:click={(event) => buttonClicked(event)}>{data.alts[0]}</button>
			<button id="button2" on:click={(event) => buttonClicked(event)}>{data.alts[1]}</button>
			<button id="button3" on:click={(event) => buttonClicked(event)}>{data.alts[2]}</button>
		</div>
	{/await}
</div>

<style>
	.gameHeading {
		border-bottom: 1px solid white;
		text-align: center;
		width: 300px;
		color: white;
	}

	.songLyric {
		width: 300px;
		text-align: center;
		color: white;
	}

	.answerAlternatives {
		display: flex;
		flex-direction: column;
		color: white;
		align-items: center;
	}

	button {
		margin-top: 20px;
		background-color: #198dc1;
		color: white;
		border: none;
		border-radius: 10px;
		width: 200px;
		height: 50px;
		font-size: 20px;
	}
</style>
