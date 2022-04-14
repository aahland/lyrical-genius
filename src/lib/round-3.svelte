<script>
	import { createEventDispatcher } from 'svelte';
	import { questions } from '../helpers/store';
	import { get } from 'svelte/store';
	import { io } from '$lib/realtime';

	const dispatch = createEventDispatcher();
	let round = 'Round 3';
	let score = 0;
	let lyric;

	let objects = get(questions);

	let snippets = [];
	let song1 = '';
	let artist1 = '';
	let d1 = '';
	let d2 = '';
	let allAlternatives = [];
	let shuffled = [];
	let alts = [];
	let starts = [];

// Listening on players ready to start round. Won't start until all 4 players are ready
	io.on('start', (start) => {
		starts = [...starts, start];
		let waiting = document.getElementById('waiting');
		waiting.innerHTML = 'waiting for other players';
		let playersReady = document.getElementById('playersReady');
		if (starts.length === 1) {
			playersReady.innerHTML = '1/4';
		}
		if (starts.length === 2) {
			playersReady.innerHTML = '2/4';
		}
		if (starts.length === 3) {
			playersReady.innerHTML = '3/4';
		}
		if (starts.length === 4) {
			waiting.remove();
			playersReady.remove();
			displayLyrics();
		}
	});
// Function for creating answer alternatives, shuffle the order of them before displaying and fetching the lyrics of the song
	async function fetchLyrics() {
		song1 = objects[2].data.song.answer.song;
		artist1 = objects[2].data.song.answer.artist;
		d1 = objects[2].data.distractor1;
		d2 = objects[2].data.distractor2;
		alts = [song1, d1, d2];
		allAlternatives = [...allAlternatives, alts];
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
		shuffled = randomArrayShuffle(alts);
		let btn = document.getElementById('btn');
		btn.remove();
		let head = document.getElementById('head');
		let header = document.createElement('h1');
		header.innerHTML = 'Which song is this?';
		header.style.marginBottom = '0';
		header.style.marginTop = '0';
		head.appendChild(header);
		head.style.borderBottom = '1px solid white';
		let button1 = document.createElement('button');
		button1.id = 'button1';
		button1.className = 'button';
		button1.innerHTML = alts[0];
		let alternatives = document.getElementById('alternatives');
		alternatives.appendChild(button1);
		button1.addEventListener('click', buttonClicked);
		let button2 = document.createElement('button');
		button2.id = 'button2';
		button2.className = 'button';
		button2.innerHTML = alts[1];
		alternatives.appendChild(button2);
		button2.addEventListener('click', buttonClicked);
		let button3 = document.createElement('button');
		button3.id = 'button3';
		button3.className = 'button';
		button3.innerHTML = alts[2];
		alternatives.appendChild(button3);
		button3.addEventListener('click', buttonClicked);
		let lyricsWrapper = document.getElementById('lyricsWrapper');
		lyricsWrapper.style.color = 'white';

		let url = 'https://api.lyrics.ovh/v1/' + artist1 + '/' + song1;
		let lyrics = await fetch(url);
		if (!lyrics.ok) {
			throw new Error(`HTTP error! Status: ${lyric.status}`);
		}
		let lyricsResponse = await lyrics.json();
		let textSplitted = lyricsResponse.lyrics.split(/(?=[A-Z])/);
		snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
// Function to fetch lyrics again if result contains Paroles and therefor is faulty
		if (textSplitted[0].includes('Paroles')) {
			lyricsWrapper.style.visibility = 'hidden';
			let lyrics = await fetch(url);
			let lyricsResponse = await lyrics.json();
			let textSplitted = lyricsResponse.lyrics.split(/(?=[A-Z])/);
			snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];

			if (textSplitted[0].includes('Paroles')) {
				lyricsWrapper.style.visibility = 'hidden';
				let lyrics = await fetch(url);
				let lyricsResponse = await lyrics.json();
				let textSplitted = lyricsResponse.lyrics.split(/(?=[A-Z])/);
				snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
			}
		}
		lyricsWrapper.style.visibility = 'visible';
		return snippets;
	}

	async function displayLyrics() {
		await fetchLyrics();
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
	async function buttonClicked(event) {
		let innerHtml = event.target.innerHTML;
		let button = event.target.id;
		if (innerHtml === song1) {
			document.getElementById(button).style.backgroundColor = 'green';
			score = score + 1;
			let audio = new Audio('../static/sounds/correct.wav');
			audio.play();
			dispatch('correct');
		} else {
			document.getElementById(button).style.backgroundColor = 'red';
			let audio = new Audio('../static/sounds/wrong.wav');
			audio.play();
		}
		setTimeout(function () {
			dispatch('newRound');
		}, 2000);
	}
</script>

<div id="mainWrapper" class="mainWrapper">
	<div class="componentWrapper" id="componentWrapper">
		<p class="round">{round}</p>
		<div id="head" />
		<button id="btn" class="button" on:click={startRound}>start round</button>
		<div class="waitingForPlayers">
			<p id="waiting" />
			<p id="playersReady" />
		</div>
		<div class="lyricsWrapper" id="lyricsWrapper">
			{#each snippets as snippet}
			<div class="displayLyrics">
				<p class="snippet">
					{snippet}
				</p>
			</div>
		{/each}
		</div>
		<div class="alternatives" id="alternatives" />
	</div>
</div>

<style>
	#head {
		color: white;
		font-family: sans-serif;
		text-align: center;
	}

	.mainWrapper {
		color: white;
	}

	.alternatives {
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: sans-serif;
	}

	.lyricsWrapper {
		color: black;
		text-align: center;
	}

	.displayLyrics {
		color: white;
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		margin-bottom: 10px;

	}

	.snippet {
		margin-top: 0px;
		margin-bottom: 0px;
		font-family: sans-serif;
		padding: 0px 0px 0px 0px;
		
	}

	.componentWrapper {
		display: flex;
		flex-direction: column;
	}

	.round {
		color: white;
		text-align: center;
		margin-bottom: 0;
		font-family: sans-serif;
	}

	.waitingForPlayers {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#playersReady {
		margin-top: 0px;
	}
</style>
