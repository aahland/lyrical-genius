<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { io } from '$lib/realtime';
	import { onMount } from 'svelte';
	import { storedStats } from '../helpers/store';



	let textfield = '';
	let messages = [];
	let message;
// Starting the game when 4 players have signed in
	function startGame() {
		if (messages.length === 4) {
			dispatch('newRound');
		}
	}

	onMount(() => {
		io.on('message', (message) => {
			messages = [...messages, message];
			console.log(messages);
			startGame();
		});
	});
// Function for sending chosen username to server
	
	function sendName() {
		storedStats.set([]);
		let btn = document.getElementById('btn');
		let input = document.getElementById('input');
		input.remove();
		btn.remove();
		let instructions = document.getElementById("instructions");
		instructions.style.visibility = "hidden";
		let users = document.getElementById("usernames");
		users.style.visibility = "visible"
		if (!message) return;
		localStorage.setItem('Playername', message);
		localStorage.setItem('Score', '0');
		textfield = '';
		io.emit('message', message);
	}

	function submitName(){
		message = textfield.trim();
		
		if(message.length === 0){
			
		}
		else {
			sendName();
		}
		
	}

	
</script>

<div class="wrap">
	<div>
		<img id="logo" src="../static/images/logoMobile.png" alt="logotype">
	</div>
	<div class="signinAndUsernamesWrapper">
	<form action="#" on:submit|preventDefault={submitName}>
		<div class="signInContainer" id="signInContainer">
			<input id="input" type="text" bind:value={textfield} placeholder="Enter your name..." />
			<button id="btn" type="submit">Join</button>
		</div>
	</form>

	<div class="usernames" id="usernames">
		<div>
			<header>
				<span class="wait">Waiting for players..</span>
			</header>
			<div>
				{#each messages as message}
					<div class="messages">
						<span>
							<p>{message.message}</p>
						</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

    <div class="instructions" id="instructions">
	<div>
		<h2>Game Instructions</h2>
		<p>Each round you are presented with a snippet of a songlyric and three answer alternatives.<br> A correct answer gives the player 1 point.<br> The player with the highest score after 4 rounds wins. Fair play!</p>
	</div>
	</div>
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		margin-top: 50px;
		justify-content: space-around;
		max-height: 400px;
		justify-content: center;
		justify-items: center;
	}

	#logo {
		width: 300px;
		position: relative;
		left: 5px;
		margin-bottom: 10px;
	}

	.instructions {
		color: white;
		display: flex;
		flex-direction: column;
		text-align: center;
		max-width: 300px;
		padding: 0px 5px 0px 5px;
		border: 1px solid white;
		border-radius: 10px;
	}

	.instructions, h2 {
		margin-top: 5px;
		margin-bottom: 0px;
		
	}

	.instructions, p {
		margin-top: 5px;
	}

	.signinAndUsernamesWrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100px;
	}

	.usernames {
		color: white;
		text-align: center;
		margin-top: 50px;
		visibility: hidden;
	}

	.signInContainer {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		align-items: center;
	}

	.messages {
		color: white;
		font-family: sans-serif;
	}

	.wait {
		font-family: sans-serif;
	}

	@media screen and (min-width: 1440px) {
		.instructions {
			margin-top: 30px;
		}

		.wrap {
			height: 400px;
		}
	}
</style>
