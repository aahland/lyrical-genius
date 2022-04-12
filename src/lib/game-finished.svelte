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
		let storeData = get(storedStats);

		storeData.splice(0,1);

		let scoreOne = parseInt(storeData[0].finalScores[0].score);
		storeData[0].finalScores[0].score = scoreOne;
		let scoreTwo = parseInt(storeData[1].finalScores[0].score);
		storeData[1].finalScores[0].score = scoreTwo;
		let scoreThree = parseInt(storeData[2].finalScores[0].score);
		storeData[2].finalScores[0].score = scoreThree;
		let scoreFour = parseInt(storeData[3].finalScores[0].score);
		storeData[3].finalScores[0].score = scoreFour;

		let finalScores = storeData;
		
		let sortedFinal = finalScores;

		let sortedResults = sortedFinal.sort((a, b) => {
			return  b.finalScores[0].score - a.finalScores[0].score;
		});

		playersReady.remove();
		waiting.remove();

		// KAN DETTA REFAKTORISERAS KANSKE?? LOOP
		let scores = document.getElementById('scores');
		let score1 = document.createElement('p');
		let position1 = document.createElement('div');
		let firstPlace = document.createElement('div');
		scores.appendChild(firstPlace);
		score1.id = "score1";
		score1.innerHTML =
			sortedResults[0].finalScores[0].name + ': ' + storeData[0].finalScores[0].score + " points";
		score1.style.border = "solid #198dc1 3px";
		score1.style.borderRadius = "10px";
		score1.style.padding = "5px 10px 5px 20px";
		position1.innerHTML = "1";
		position1.style.border = "solid #198dc1 3px";
		position1.style.borderRadius = "50%"
		position1.style.height = "35px";
		position1.style.width = "35px";
		position1.style.fontSize = "30px";
		position1.style.position = "relative";
		position1.style.left = "15px";
		position1.style.top = "5px";
		position1.style.backgroundColor = "black";
		firstPlace.appendChild(position1);
		firstPlace.appendChild(score1);
		firstPlace.style.display = "flex";
		firstPlace.style.flexDirection = "row";
		firstPlace.style.alignItems = "baseline";
		firstPlace.style.marginTop = "15px";

		let score2 = document.createElement('p');
		let position2 = document.createElement('div');
		let secondPlace = document.createElement('div');
		scores.appendChild(secondPlace);
		score2.innerHTML =
			sortedResults[1].finalScores[0].name + ': ' + storeData[1].finalScores[0].score + " points";
			score2.style.border = "solid #198dc1 3px";
		score2.style.borderRadius = "10px";
		score2.style.padding = "5px 10px 5px 20px";
		position2.innerHTML = "2";
		position2.style.border = "solid #198dc1 3px";
		position2.style.borderRadius = "50%"
		position2.style.height = "35px";
		position2.style.width = "35px";
		position2.style.fontSize = "30px";
		position2.style.position = "relative";
		position2.style.left = "15px";
		position2.style.top = "5px";
		position2.style.backgroundColor = "black";
		secondPlace.appendChild(position2);
		secondPlace.appendChild(score2);
		secondPlace.style.display = "flex";
		secondPlace.style.flexDirection = "row";
		secondPlace.style.alignItems = "baseline";

		let score3 = document.createElement('p');
		let position3 = document.createElement('div');
		let thirdPlace = document.createElement('div');
		scores.appendChild(thirdPlace);
		score3.innerHTML =
			sortedResults[2].finalScores[0].name + ': ' + storeData[2].finalScores[0].score + " points";
		score3.style.border = "solid #198dc1 3px";
		score3.style.borderRadius = "10px";
		score3.style.padding = "5px 10px 5px 20px";
		position3.innerHTML = "3";
		position3.style.border = "solid #198dc1 3px";
		position3.style.borderRadius = "50%"
		position3.style.height = "35px";
		position3.style.width = "35px";
		position3.style.fontSize = "30px";
		position3.style.position = "relative";
		position3.style.left = "15px";
		position3.style.top = "5px";
		position3.style.backgroundColor = "black";
		thirdPlace.appendChild(position3);
		thirdPlace.appendChild(score3);
		thirdPlace.style.display = "flex";
		thirdPlace.style.flexDirection = "row";
		thirdPlace.style.alignItems = "baseline";
		
		let score4 = document.createElement('p');
		let position4 = document.createElement('div');
		let forthPlace = document.createElement('div');
		scores.appendChild(forthPlace);
		score4.innerHTML =
			sortedResults[3].finalScores[0].name + ': ' + storeData[3].finalScores[0].score + " points";
		score4.style.border = "solid #198dc1 3px";
		score4.style.borderRadius = "10px";
		score4.style.padding = "5px 10px 5px 20px";
		position4.innerHTML = "4";
		position4.style.border = "solid #198dc1 3px";
		position4.style.borderRadius = "50%"
		position4.style.height = "35px";
		position4.style.width = "35px";
		position4.style.fontSize = "30px";
		position4.style.position = "relative";
		position4.style.left = "15px";
		position4.style.top = "5px";
		position4.style.backgroundColor = "black";
		forthPlace.appendChild(position4);
		forthPlace.appendChild(score4);
		forthPlace.style.display = "flex";
		forthPlace.style.flexDirection = "row";
		forthPlace.style.alignItems = "baseline";
	

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
		align-items: center;
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
		width: 300px;
	}

	.stylistic-line {
		border-bottom: 1px solid white;
		
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
