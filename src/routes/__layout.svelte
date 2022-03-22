<script>
	import '../app.css';
	import Round1 from '../lib/Round1.svelte';
	import Round2 from '../lib/Round2.svelte';
	import Round3 from '../lib/Round3.svelte';
	import GameFinished from '../lib/gameFinished.svelte';

	const round = [
		{component: Round1},
		{component: Round2},
		{component: Round3},
		{component: GameFinished}
	]

	let i = 0;


	function newRound(){
		console.log("new round coming up");
		i = i + 1
	}

	function gameFinished(){
		console.log("Game finished!");
		i = 3
	}

	let score = 0;

	function addToScore(){
		score = score + 1
	}

	
</script>


<main>
	<svelte:component this={round[i].component} on:newRound={newRound} on:gameFinished={gameFinished} on:correct={addToScore} score={score}/>

</main>



<style>

	
</style>
