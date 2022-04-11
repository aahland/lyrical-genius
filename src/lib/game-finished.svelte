<script>
	import { createEventDispatcher } from 'svelte';
	import { storedStats } from '../helpers/store';
	import { get } from 'svelte/store';
	import { io } from '$lib/realtime';

	const dispatch = createEventDispatcher();

	function restartGame() {
		dispatch('restartGame');
	}

	let clicked = [];

	io.on('sendScores', (click) => {
		clicked = [...clicked, click]; 
		let waiting = document.getElementById("waiting");
		waiting.innerHTML = "waiting for other players score"
		let playersReady = document.getElementById("playersReady");
	
		if (clicked.length === 1) {
			playersReady.innerHTML = "1/4";
		}
		if (clicked.length === 2) {
			playersReady.innerHTML = "2/4";
		}
		if (clicked.length === 3) {
			playersReady.innerHTML = "3/4";
		}
		if (clicked.length === 4){
		let finalScores = get(storedStats);
		console.log(finalScores);
		
		let sorted = finalScores.sort((a, b) => (a.score > b.score) ? 1 : -1)
		console.log(sorted);
		playersReady.remove();
		waiting.remove();

		// KAN DETTA REFAKTORISERAS KANSKE?? LOOP
		let scores = document.getElementById('scores');
		let score1 = document.createElement('p');
		score1.id = "score1";
		score1.innerHTML =
			finalScores[0].finalScores[0].name + ': ' + finalScores[0].finalScores[0].score;
		scores.appendChild(score1);
		let score2 = document.createElement('p');
		score2.innerHTML =
			finalScores[1].finalScores[0].name + ': ' + finalScores[1].finalScores[0].score;
		scores.appendChild(score2);
		let score3 = document.createElement('p');
		score3.innerHTML =
			finalScores[2].finalScores[0].name + ': ' + finalScores[2].finalScores[0].score;
		scores.appendChild(score3);
		let score4 = document.createElement('p');
		score4.innerHTML =
			finalScores[3].finalScores[0].name + ': ' + finalScores[3].finalScores[0].score;
		scores.appendChild(score4);
		let buttonWrapper = document.getElementById('buttonWrapper');
		let restartBtn = document.createElement('button');
		restartBtn.innerHTML = 'Play Again';
		buttonWrapper.appendChild(restartBtn);
		restartBtn.onclick = restartGame;
		let sendScoresBtn = document.getElementById('sendScoresBtn');
		sendScoresBtn.remove();
	}
	});

	function sendScores() {
		let click = 'clicked';
		io.emit('sendScores', click);
		let sendScoresBtn = document.getElementById('sendScoresBtn');
		sendScoresBtn.remove();
	}
</script>

<div class="score">
	<div class="stylistic-line">
		<h1>Score</h1>
		
	</div>
	<div>
		<p id="waiting"></p>
		<p id="playersReady"></p>
	</div>
	<div class="scores" id="scores" />
	<div id="buttonWrapper">
		<button id="sendScoresBtn" on:click={sendScores}>Hand in your score</button>
	</div>
</div>

<style>
	.score {
		background-color: black;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-bottom: 0;
	}

	.scores {
		color: white;
		font-family: sans-serif;
	}


	#waiting {
		color:white;
	}

	#playersReady {
		color: white;
	}


	h1 {
		color: white;
		margin-bottom: 0px;
	}

	.stylistic-line {
		border-bottom: 1px solid white;
	}
</style>
