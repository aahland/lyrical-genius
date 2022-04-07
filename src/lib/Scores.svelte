<script>
	import { io } from '$lib/realtime';

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { storedStats } from '../helpers/store';

	const dispatch = createEventDispatcher();
	let scores;

	let allScores = [];

	io.on('scores', (scores) => {
		allScores = [...allScores, scores];
	});

	//Testa att ta bort nedanstående

	onMount(async () => {
		scores = get(storedStats);
	});

	function displayScores() {
		if (scores.length === 3) {
			let stats = document.getElementById('stats');
			let displayBtn = document.getElementById('displayScoresBtn');
			displayBtn.remove();
			let nextRound = document.createElement('button');
			nextRound.innerHTML = 'Continue';
			nextRound.onclick = startNextRound;
			let buttonWrapper = document.getElementById('buttonWrapper');
			buttonWrapper.appendChild(nextRound);
			let first = document.createElement('p');
			first.innerHTML = scores[0].stats[0].score[1] + ' - ' + scores[0].stats[0].score[0];
			stats.appendChild(first);
			let second = document.createElement('p');
			second.innerHTML = scores[1].stats[0].score[1] + ' - ' + scores[1].stats[0].score[0];
			stats.appendChild(second);
			let third = document.createElement('p');
			third.innerHTML = scores[2].stats[0].score[1] + ' - ' + scores[2].stats[0].score[0];
			stats.appendChild(third);
			io.emit('scores', scores);
		} else {
			let wait = document.createElement('p');
			wait.innerHTML = 'Waiting for other players';
			let stats = document.getElementById('stats');
			stats.appendChild(wait);
		}
	}

	function startNextRound() {
		dispatch('newRound');
	}
</script>

<div class="wrapper">
	<div class="headWrapper" />
	<button id="displayScoresBtn" on:click={displayScores}>Show Scores</button>

	<div class="stats" id="stats" />
	<div id="buttonWrapper" />
</div>

<style>
	p {
		color: white;
		margin-bottom: 0px;
	}

	#displayScoresBtn {
		margin-top: 50px;
	}

	.headWrapper {
		border-bottom: 2px solid white;
		height: 40px;
		visibility: hidden;
	}

	.stats {
		color: white;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 200px;
	}
</style>
