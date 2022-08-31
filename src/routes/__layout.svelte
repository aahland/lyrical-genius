<script>
	import '../app.css';
	import Round1 from '../lib/round-1.svelte';
	import Round2 from '../lib/round-2.svelte';
	import Round3 from '../lib/round-3.svelte';
	import Round4 from '../lib/round-4.svelte';
	import Gamefinished from '../lib/game-finished.svelte';
	import Footer from '../lib/footr.svelte';
	import Signin from '../lib/signin.svelte';
	import { storedStats } from '../helpers/store';

	const round = [
		{ component: Signin },
		{ component: Round1 },
		{ component: Round2 },
		{ component: Round3 },
		{ component: Round4 },
		{ component: Gamefinished }
	];

	let i = 0;

	// let newRoundClicked = 0;
	function newRound() {
		// newRoundClicked ++
		// if (newRoundClicked > 4){
		i = i + 1;
		//	}
	}

	function gameFinished() {
		i = 3;
	}

	// let score = 0;

	function addToScore() {
		let score = parseInt(localStorage.getItem('Score'));
		let newScore = score + 1;
		localStorage.setItem('Score', JSON.stringify(newScore));
	}

	function restart() {
		i = 0;
		storedStats.set([]);
		let score = 0;
		localStorage.setItem('Score', JSON.stringify(score));
	}
</script>

<div class="layoutWrapper">
	<svelte:component
		this={round[i].component}
		on:newRound={newRound}
		on:gameFinished={gameFinished}
		on:correct={addToScore}
		on:restartGame={restart}
	/>
	<Footer />
</div>

<style>
	.layoutWrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
	}
</style>
