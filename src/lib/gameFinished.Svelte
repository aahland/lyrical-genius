<script>
	export let score;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function restartGame(){
        console.log("restart game");
        dispatch('restartGame');
    
    }
   
</script>

<div class="score">
	<div class="stylistic-line">
		<h1>Score</h1>
	</div>
	<div>
		{#if score === 4}
			<p>4/4</p>
		{:else if score === 3}
			<p>3/4</p>
		{:else if score === 2}
			<p>2/4</p>
		{:else if score === 1}
			<p>1/4</p>
		{:else}
			<p>0/4</p>
		{/if}
	</div>
	<div>
		<button on:click={restartGame}>Play Again</button>
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
