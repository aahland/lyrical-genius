<script>
	import '../app.css';
	import Round1 from '../lib/Round1.svelte';
	import Round2 from '../lib/Round2.svelte';
	import Round3 from '../lib/Round3.svelte';
	import Round4 from '../lib/Round4.svelte';
	import GameFinished from '../lib/GameFinished.svelte';
	import Footer from '../lib/Footer.svelte';
	import Signin from '../lib/Signin.svelte';

	const round = [
		{ component: Signin },
		{ component: Round1 },
		{ component: Round2 },
		{ component: Round3 },
		{ component: Round4 },
		{ component: GameFinished }
	];

	let i = 0;
	let stats;

	function newRound() {
		i = i + 1;
		console.log(i);
	}

	function gameFinished() {
		i = 3;
	}

	let score = 0;

	function addToScore() {
		score = score + 1;
		localStorage.setItem('Score', JSON.stringify(score));
	}

	function restart() {
		i = 0;
		score = 0; 
	}
</script>

<div class="layoutWrapper">
	<main>
		<svelte:component
			this={round[i].component}
			on:newRound={newRound}
			on:gameFinished={gameFinished}
			on:correct={addToScore}
			{score}
			on:restartGame={restart}
			{stats}
		/>
	</main>
	<Footer />
</div>

<style>
	.layoutWrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 800px;
	}
</style>
