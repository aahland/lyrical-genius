<script>
	import { io } from '$lib/realtime';
	import { createEventDispatcher } from 'svelte';
	import { storedStats, questions } from '../helpers/store';
	import { get } from 'svelte/store';
	import { randomArrayShuffle } from '../helpers/randomArrayShuffle';
	import { splitLyrics } from '../helpers/splitLyrics';

	const dispatch = createEventDispatcher();
	let round = 'Round 4';
	let objects = get(questions);
	let allStats = [{}];
	let snippets = [];
	let song1 = '';
	let artist1 = '';
	let distractor1 = '';
	let distractor2 = '';
	let allAlternatives = [];
	let shuffled = [];
	let alts = [];
	let playersReadytoStart = [];
	let extraPoint = [];

	// Server listening on final scores send for each player. Saves scores to store.
	io.on('finalScores', ({ finalScores }) => {
		allStats = [...allStats, { finalScores }];
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
	// Function for creating answer alternatives, shuffle the order of them before displaying and fetching the lyrics of the song
	async function fetchLyrics() {
		song1 = objects[3].data.song.answer.song;
		artist1 = objects[3].data.song.answer.artist;
		distractor1 = objects[3].data.distractor1;
		distractor2 = objects[3].data.distractor2;
		alts = [
			{ song: song1, id: 'button1' },
			{ song: distractor1, id: 'button2' },
			{ song: distractor2, id: 'button3' }
		];
		allAlternatives = [...allAlternatives, alts];
		//Shuffle alts so that the correct answer is not always the first
		shuffled = randomArrayShuffle(alts);
		let btn = document.getElementById('btn');
		btn.remove();
		let stylisticLine = document.getElementById('stylisticLine');
		let header = document.createElement('h1');
		header.className = 'header';
		header.innerHTML = 'Which song is this?';
		header.style.marginBottom = '0';
		header.style.marginTop = '0';
		stylisticLine.appendChild(header);
		stylisticLine.style.borderBottom = '1px solid white';
		let lyricsWrapper = document.getElementById('lyricsWrapper');
		lyricsWrapper.style.color = 'white';

		let url = 'https://api.lyrics.ovh/v1/' + artist1 + '/' + song1;
		let lyrics = await fetch(url);
		if (!lyrics.ok) {
			let failedToFetch = document.getElementById('lyricsWrapper');
			let sorryMessage = document.createElement('p');
			sorryMessage.innerHTML =
				"Sorry, we couldn't get the lyrics for you. Have a blind guess and earn 2 points if you are correct";
			sorryMessage.style.backgroundColor = 'red';
			sorryMessage.style.padding = '5px 10px 5px 10px';
			sorryMessage.style.borderRadius = '10px';
			sorryMessage.style.width = '280px';
			sorryMessage.style.fontWeight = 'bold';
			failedToFetch.appendChild(sorryMessage);
			extraPoint.push('1');
		}
		let lyricsResponse = await lyrics.json();
		let textSplitted = splitLyrics(lyricsResponse.lyrics);
		snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
		// Function to fetch lyrics again if result contains Paroles and therefor is faulty
		if (textSplitted[0].includes('Paroles')) {
			lyricsWrapper.style.visibility = 'hidden';
			let lyrics = await fetch(url);
			let lyricsResponse = await lyrics.json();
			let textSplitted = splitLyrics(lyricsResponse.lyrics);
			snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];

			if (textSplitted[0].includes('Paroles')) {
				lyricsWrapper.style.visibility = 'hidden';
				let lyrics = await fetch(url);
				let lyricsResponse = await lyrics.json();
				let textSplitted = splitLyrics(lyricsResponse.lyrics);
				snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
			}
		}
		if (textSplitted[0].length + textSplitted[1].length > 70) {
			snippets = [textSplitted[0], textSplitted[1], textSplitted[2]];
		}
		if (textSplitted[0].length < 40 && textSplitted[1].length < 10) {
			textSplitted[1] = textSplitted[0] + textSplitted[1];
			textSplitted.splice(0, 1);
			snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
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
		<div class="lyricsWrapper" id="lyricsWrapper">
			{#each snippets as snippet}
				<div class="displayLyrics">
					<p class="snippet">
						{snippet}
					</p>
				</div>
			{/each}
		</div>
		<div class="alternatives" id="alternatives">
			{#each alts as alt}
				<div class="altBtns">
					<button on:click={buttonClicked} class="altBtn" id={alt.id}>
						{alt.song}
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
</style>
