<script>
	import { io } from '$lib/realtime';
	import { createEventDispatcher } from 'svelte';
	import { getRandomAnswer } from '../helpers/answers';
	import { distractors } from '../helpers/sendAlternatives';
	import { questions } from '../helpers/store';
	import { randomArrayShuffle } from '../helpers/randomArrayShuffle';
	import { splitLyrics } from '../helpers/splitLyrics';
	import { get } from 'svelte/store';
	import { getRandomDistractors } from '../helpers/distractors';

	const dispatch = createEventDispatcher();
	let round = 'Round 2';
	let objects = get(questions);
	let data;
	let playersReadyToStart = [];
	let snippets = [];
	let song1 = '';
	let artist1 = '';
	let distractor1 = '';
	let distractor2 = '';
	let allAlternatives = [];
	let shuffled = [];
	// let answerAlts = [];
	let extraPoint = [];
	let playersAnswered = 0;

	console.log(objects, 'objects from store');

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
		// let start = 'start';
		// io.emit('start', start);
	});

	// // Sends one song and 2 distractors per player to the server for saving it to store.
	// async function shareData() {
	// 	let songs = objects;
	// 	console.log(songs[1].answer.song, 'songs from getRandom');
	// 	// let answerAlts = [
	// 	// 	{ song: data.song.answer.song, id: 'button1' },
	// 	// 	{ song: data.distractor1, id: 'button2' },
	// 	// 	{ song: data.distractor2, id: 'button3' }
	// 	// ];

	// 	data = {
	// 		song: songs[1].answer,
	// 		distractor1: distractors[2],
	// 		distractor2: distractors[3],
	// 		answerAlts: [
	// 			{ song: distractors[2], id: 'button2' },
	// 			{ song: distractors[3], id: 'button3' },
	// 			{ song: songs[1].answer.song, id: 'button1' }
	// 		]
	// 	};
	// 	console.log(data, 'all data');
	// 	console.log(data.answerAlts);
	// 	io.emit('data', data);
	// }

	// Function for creating answer alternatives, shuffle the order of them before displaying and fetching the lyrics of the song
	// async function fetchLyrics() {
	// 	song1 = objects[0].data.song.answer.song;
	// 	artist1 = objects[0].data.song.answer.artist;
	// 	distractor1 = objects[0].data.distractor1;
	// 	distractor2 = objects[0].data.distractor2;
	// 	alts = [
	// 		{ song: song1, id: 'button1' },
	// 		{ song: distractor1, id: 'button2' },
	// 		{ song: distractor2, id: 'button3' }
	// 	];
	// 	allAlternatives = [...allAlternatives, alts];
	// 	//Shuffle alts so that the correct answer is not always the first
	// 	shuffled = randomArrayShuffle(alts);
	// 	let stylisticLine = document.getElementById('stylisticLine');
	// 	let header = document.createElement('h1');
	// 	header.className = 'header';
	// 	header.innerHTML = 'Which song is this?';
	// 	header.style.marginBottom = '0';
	// 	header.style.marginTop = '0';
	// 	stylisticLine.appendChild(header);
	// 	stylisticLine.style.borderBottom = '1px solid white';

	// 	let lyricsWrapper = document.getElementById('lyricsWrapper1');
	// 	lyricsWrapper.style.color = 'white';

	// 	let url = 'https://api.lyrics.ovh/v1/' + artist1 + '/' + song1;
	// 	let lyrics = await fetch(url);
	// 	if (!lyrics.ok) {
	// 		let failedToFetch = document.getElementById('lyricsWrapper1');
	// 		let sorryMessage = document.createElement('p');
	// 		sorryMessage.id = 'sorryMessage';
	// 		sorryMessage.innerHTML =
	// 			"Sorry, we couldn't get the lyrics for you. Have a blind guess and earn 2 points if you are correct!";
	// 		sorryMessage.style.backgroundColor = 'red';
	// 		sorryMessage.style.padding = '5px 10px 5px 10px';
	// 		sorryMessage.style.borderRadius = '10px';
	// 		sorryMessage.style.width = '280px';
	// 		sorryMessage.style.fontWeight = 'bold';
	// 		failedToFetch.appendChild(sorryMessage);
	// 		extraPoint.push('1');
	// 	}
	// 	let lyricsResponse = await lyrics.json();
	// 	let textSplitted = splitLyrics(lyricsResponse.lyrics);
	// 	snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
	// 	// Function to fetch lyrics again if result contains Paroles and therefor is faulty
	// 	// RECURSIVE FUNCTION INSTEAD OF NESTED IF STATEMENT FOR ALL ROUNDS
	// 	if (textSplitted[0].includes('Paroles')) {
	// 		lyricsWrapper.style.visibility = 'hidden';
	// 		let lyrics = await fetch(url);
	// 		let lyricsResponse = await lyrics.json();
	// 		let textSplitted = splitLyrics(lyricsResponse.lyrics);
	// 		snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];

	// 		if (textSplitted[0].includes('Paroles')) {
	// 			lyricsWrapper.style.visibility = 'hidden';
	// 			let lyrics = await fetch(url);
	// 			let lyricsResponse = await lyrics.json();
	// 			let textSplitted = splitLyrics(lyricsResponse.lyrics);
	// 			snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
	// 		}
	// 	}
	// 	if (textSplitted[0].length + textSplitted[1].length > 70) {
	// 		snippets = [textSplitted[0], textSplitted[1], textSplitted[2]];
	// 	}
	// 	if (textSplitted[0].length < 40 && textSplitted[1].length < 10) {
	// 		textSplitted[1] = textSplitted[0] + textSplitted[1];
	// 		textSplitted.splice(0, 1);
	// 		snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
	// 	}

	// 	lyricsWrapper.style.visibility = 'visible';
	// 	return snippets;
	// }
	let lyrics;
	let answerAlts;
	function displayLyrics() {
		song1 = objects[0].data[1].song.answer.song;
		lyrics = objects[0].data[1].song.answer.lyrics;
		answerAlts = randomArrayShuffle(objects[0].data[1].answerAlts);

		// 	{ song: data.song.answer.song, id: 'button1' },
		// 	{ song: data.distractor1, id: 'button2' },
		// 	{ song: data.distractor2, id: 'button3' }
		// ];
		// console.log(answerAlts, 'answer alternatives');
		// await fetchLyrics();
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
	// shareData();
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
			{#if lyrics}
				<div class="displayLyrics">
					<p class="snippet">
						{lyrics}
					</p>
				</div>
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
