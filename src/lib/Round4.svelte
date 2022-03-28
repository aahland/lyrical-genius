<script>
	import { createEventDispatcher } from 'svelte';
	import { getLyrics } from '../helpers/fetchLyrics';
	import { answer } from '../helpers/fetchLyrics';
	const dispatch = createEventDispatcher();

	let round = 'Round 4';
	let lyric;
	let song;
	let correct = answer[3].answer4.song;

	async function handleLyrics() {
		let snippet;
		lyric = await getLyrics();
		let textSplitted = lyric[3].fourthObject.split(/(?=[A-Z])/);
		snippet = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
		song = lyric[3].song;
		let distractor1 = lyric[3].distractor1;
		let distractor2 = lyric[3].distractor2;
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
            let audio = new Audio("../static/sounds/correct.wav")
            audio.play();
			dispatch('correct');
		} else {
			document.getElementById(button).style.backgroundColor = 'red';
            let audio = new Audio("../static/sounds/wrong.wav")
            audio.play();
			dispatch('wrong');
		}
		setTimeout(function () {
			dispatch('newRound');
		}, 2000);
	}
</script>

<div class="gameComponent">
	<div class="gameHeading">
		<p>{round}</p>
		<h1>Which song is this?</h1>
	</div>
	<div class="songLyricWrapper" />
	{#await handleLyrics()}
    <div class="spinnerContainer">
        <div class="lds-ring">
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
	{:then data}
		<div>
			{#if data.allData.snippet[0].length < 10}
				<p class="songLyric" style="color: white">
					{data.allData.snippet[0]}{data.allData.snippet[1]}<br />{data.allData.snippet[2] + data.allData.snippet[3]}
				</p>
			{:else if data.allData.snippet[1].length < 10}
				<p class="songLyric" style="color: white">
					{data.allData.snippet[0]}<br />{data.allData.snippet[1] + data.allData.snippet[2]}
				</p>
			{:else}
				<p class="songLyric" style="color: white">
					{data.allData.snippet[0]}<br />{data.allData.snippet[1]}<br />{data.allData.snippet[2]}
				</p>
			{/if}
		</div>

		<div class="answerAlternatives">
			<button id="button1" on:click={(event) => buttonClicked(event)}>{data.alts[0]}</button>
			<button id="button2" on:click={(event) => buttonClicked(event)}>{data.alts[1]}</button>
			<button id="button3" on:click={(event) => buttonClicked(event)}>{data.alts[2]}</button>
		</div>
	{/await}
</div>

<style>
    

	
</style>
