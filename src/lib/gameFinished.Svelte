<script>
	export let score;
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
		let finalScores = get(storedStats);

		let scores = document.getElementById('scores');
		let score1 = document.createElement('p');
		score1.innerHTML =
			finalScores[1].finalScores[0].name + ': ' + finalScores[1].finalScores[0].score;
		scores.appendChild(score1);
		let score2 = document.createElement('p');
		score2.innerHTML =
			finalScores[2].finalScores[0].name + ': ' + finalScores[2].finalScores[0].score;
		scores.appendChild(score2);
		let score3 = document.createElement('p');
		score3.innerHTML =
			finalScores[3].finalScores[0].name + ': ' + finalScores[3].finalScores[0].score;
		scores.appendChild(score3);
		let score4 = document.createElement('p');
		score4.innerHTML =
			finalScores[4].finalScores[0].name + ': ' + finalScores[4].finalScores[0].score;
		scores.appendChild(score4);
		let buttonWrapper = document.getElementById('buttonWrapper');
		let restartBtn = document.createElement('button');
		restartBtn.innerHTML = 'Play Again';
		buttonWrapper.appendChild(restartBtn);
		restartBtn.onclick = restartGame;
		let sendScoresBtn = document.getElementById('sendScoresBtn');
		sendScoresBtn.remove();
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
	<div class="scores" id="scores" />
	<div id="buttonWrapper">
		<button id="sendScoresBtn" on:click={sendScores}>Show Scores</button>
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
	}

	p {
		color: white;
		text-align: center;
		font-size: 20px;
	}

	h1 {
		color: white;
		margin-bottom: 0px;
	}

	.stylistic-line {
		border-bottom: 1px solid white;
	}
</style>
