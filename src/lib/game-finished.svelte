<script>
	import { createEventDispatcher } from 'svelte';
	import { storedStats } from '../helpers/store';
	import { get } from 'svelte/store';
	import { io } from '$lib/realtime';
	import { removeFirstObject } from '../helpers/splice.js';


	const dispatch = createEventDispatcher();

	// Socket listening for handed in scores, all players must hand in score before all scores can be displayed
	let playersScoreReady = [];
	let sortedResults = [];
	let sortedFinal;

	export function sortResults(){
		sortedResults = sortedFinal.sort((a, b) => {
				return b.finalScores[0].score - a.finalScores[0].score;
			});
	}
	

	io.on('playersScoreReady', (ready) => {
		playersScoreReady = [...playersScoreReady, ready];
		let waiting = document.getElementById('waiting');
		waiting.innerHTML = 'waiting for other players score';
		let numberOfPlayersReady = document.getElementById('playersReady');

		if (playersScoreReady.length === 1) {
			numberOfPlayersReady.innerHTML = '1/4';
		}
		if (playersScoreReady.length === 2) {
			numberOfPlayersReady.innerHTML = '2/4';
		}
		if (playersScoreReady.length === 3) {
			numberOfPlayersReady.innerHTML = '3/4';
		}
		if (playersScoreReady.length === 4) {
			let statsFromStore = get(storedStats);

			// Removes empty index 0 from object array
			// statsFromStore.splice(0, 1);
			removeFirstObject(statsFromStore);
			
			// Transforming score from string to number for all players
			let scoreOne = parseInt(statsFromStore[0].finalScores[0].score);
			statsFromStore[0].finalScores[0].score = scoreOne;
			let scoreTwo = parseInt(statsFromStore[1].finalScores[0].score);
			statsFromStore[1].finalScores[0].score = scoreTwo;
			let scoreThree = parseInt(statsFromStore[2].finalScores[0].score);
			statsFromStore[2].finalScores[0].score = scoreThree;
			let scoreFour = parseInt(statsFromStore[3].finalScores[0].score);
			statsFromStore[3].finalScores[0].score = scoreFour;

			let finalScores = statsFromStore;
			sortedFinal = finalScores;

			// Arranges the array of players and scores so that the highest score is on index 0
			sortResults();

			sortedResults[0].finalScores.push('1');
			sortedResults[1].finalScores.push('2');
			sortedResults[2].finalScores.push('3');
			sortedResults[3].finalScores.push('4');
			console.log(sortedResults[0]);

			numberOfPlayersReady.remove();
			waiting.remove();

			let buttonWrapper = document.getElementById('buttonWrapper');
			let restartBtn = document.createElement('button');
			restartBtn.innerHTML = 'Play Again';
			buttonWrapper.appendChild(restartBtn);
			restartBtn.onclick = restartGame;
			let sendScoresBtn = document.getElementById('sendScoresBtn');
			sendScoresBtn.remove();
		}
	});

	// function for handing in scores (sending your score to the server)
	function sendScores() {
		let ready = 'ready';
		io.emit('playersScoreReady', ready);
		let sendScoresBtn = document.getElementById('sendScoresBtn');
		sendScoresBtn.style.visibility = 'hidden';
	}
	// dispatch to layout to start a new game
	function restartGame() {
		dispatch('restartGame');
	}
</script>

<div class="scoreWrapper">
	<div class="stylisticLine">
		<h1>Score</h1>
	</div>
	<div>
		<p id="waiting" />
		<p id="playersReady" />
	</div>
	<div class="scores" id="scores" />
	{#each sortedResults as sortedResult}
		<div class="positionWrapper">
			<div class="position"><p class="positionNumber">{sortedResult.finalScores[1]}</p></div>
			<p class="score">
				{sortedResult.finalScores[0].name + ': ' + sortedResult.finalScores[0].score}
			</p>
		</div>
	{/each}
	<div id="buttonWrapper">
		<button id="sendScoresBtn" on:click={sendScores}>Submit in your score</button>
	</div>
</div>

<style>
	.scoreWrapper {
		background-color: black;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-bottom: 0;
		align-items: center;
	}

	.position {
		height: 30px;
		width: 30px;
		border-radius: 50%;
		border: solid #198dc1 3px;
		position: relative;
		top: 4px;
		left: 15px;
		background-color: black;
	}

	.positionNumber {
		color: white;
		font-size: 25px;
		position: relative;
		bottom: 28px;
	}

	.positionWrapper {
		display: flex;
		flex-direction: row;
		width: fit-content;
		padding: 0px 35px 0px 10px;
	}

	.scores {
		color: white;
	}

	.score {
		color: white;
		border: solid #198dc1 3px;
		border-radius: 10px;
		width: 100px;
		padding: 5px 10px 5px 20px;
		margin-top: 5px;
	}

	#waiting {
		color: white;
		font-weight: bold;
	}

	#playersReady {
		color: white;
		font-weight: bold;
	}

	h1 {
		color: #ffffffd4;
		margin-bottom: 0px;
		width: 300px;
	}

	.stylisticLine {
		border-bottom: 1px solid white;;
		margin-bottom: 15px;
	}

	@media screen and (min-width: 768px) {
		h1 {
			width: 700px;
		}
	}

	@media screen and (min-width: 1024px) {
		h1 {
			width: 900px;
		}
	}

	@media screen and (min-width: 1440px) {
		h1 {
			width: 1300px;
		}
	}
</style>
