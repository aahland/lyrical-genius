<script>
	import '../app.css';
	import Round1 from '../lib/Round1.svelte';
	import Round2 from '../lib/Round2.svelte';
	import Round3 from '../lib/Round3.svelte';
	import Round4 from '../lib/Round4.svelte';
	import GameFinished from '../lib/gameFinished.svelte';
	import Footer from '../lib/footer.svelte';

	const round = [
		{component: Round1},
		{component: Round2},
		{component: Round3},
		{component: Round4},
		{component: GameFinished}
	]

	let i = 0;


	function newRound(){
		console.log("new round coming up");
		console.log(i);
		i = i + 1
	}

	function gameFinished(){
		console.log("Game finished!");
		i = 4
	}

	let score = 0;

	function addToScore(){
		score = score + 1
	}

	function restart(){
		console.log("restart");
		//i = 0;  laddar samma frågor igen. behöver refresha på ngt annat sätt. location reload inte ok 
		location.reload();
	}

	
</script>

<div class="layoutWrapper">
<main>
	<svelte:component this={round[i].component} on:newRound={newRound} on:gameFinished={gameFinished} on:correct={addToScore} score={score} on:restartGame={restart}/> 
	
</main>
<Footer />
</div>



<style>

.layoutWrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 700px;
}



	
</style>
