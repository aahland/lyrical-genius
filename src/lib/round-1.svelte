<script>
	import { io } from '$lib/realtime';
	import { createEventDispatcher } from 'svelte';
	import { answer } from '../helpers/fetchLyrics';
	import { distractors } from '../helpers/fetchLyrics';
	import { questions } from '../helpers/store';

	const dispatch = createEventDispatcher();
	let round = 'Round 1';
	let score = 0;
	let lyric;
	let playerName = localStorage.getItem('Playername');

	let objects = [];

	io.on('data', (data) => {
		objects = [...objects, data];
		questions.set(objects);
	});

	let data2;

	async function shareData() {
		let number = Math.floor(Math.random() * 3);
		// let number2 = Math.floor(Math.random() * 7);
		// let number3 = Math.floor(Math.random() * 7);
		let song = answer[number];
		let distractor1 = distractors[0];
		let distractor2 = distractors[1];
		data2 = { song: song, distractor1: distractor1, distractor2: distractor2 };
		io.emit('data', data2); //sends the data
	}

	let snippet = [];
	let song1 = '';
	let artist1 = '';
	let d1 = '';
	let d2 = '';
	let allAlternatives = [];
	let shuffled = [];
	let alts = [];

	async function fetchLyrics() {
		song1 = objects[0].data.song.answer.song;
		artist1 = objects[0].data.song.answer.artist;
		d1 = objects[0].data.distractor1;
		d2 = objects[0].data.distractor2;
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
		button1.innerHTML = alts[0];
		let alternatives = document.getElementById('alternatives');
		alternatives.appendChild(button1);
		button1.addEventListener('click', buttonClicked);
		let button2 = document.createElement('button');
		button2.id = 'button2';
		button2.innerHTML = alts[1];
		alternatives.appendChild(button2);
		button2.addEventListener('click', buttonClicked);
		let button3 = document.createElement('button');
		button3.id = 'button3';
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
		snippet = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
		if(textSplitted[0].includes("Paroles")){
			lyricsWrapper.style.visibility = "hidden";
			console.log("We got paroles");
			let lyrics = await fetch(url);
			let lyricsResponse = await lyrics.json();
			let textSplitted = lyricsResponse.lyrics.split(/(?=[A-Z])/);
			snippet = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
			
			if(textSplitted[0].includes("Paroles")){
			console.log("We got paroles");
			let lyrics = await fetch(url);
			let lyricsResponse = await lyrics.json();
			let textSplitted = lyricsResponse.lyrics.split(/(?=[A-Z])/);
			snippet = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
			
		}
		}
		lyricsWrapper.style.visibility = "visible";
		return snippet;
	}

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
			dispatch('wrong');
		}
		setTimeout(function () {
			// let stats = [score, playerName]
			dispatch('newRound');
		}, 2000);
	}
	shareData();
</script>

<div id="mainWrapper" class="mainWrapper">
	<div class="componentWrapper" id="componentWrapper">
		<p class="round">{round}</p>
		<div id="head" />
		<button id="btn" on:click={fetchLyrics}>start round</button>
		<div class="lyricsWrapper" id="lyricsWrapper">
			<p>{snippet[0]}</p>
			<p>{snippet[1]}</p>
			<p>{snippet[2]}</p>
			<p>{snippet[3]}</p>
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
</style>
