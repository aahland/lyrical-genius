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
			startGame();
		});
	});
	// Function for sending chosen username to server

	function sendName() {
		storedStats.set([]);
		let inputAndBtn = document.getElementById('signinAndUsernamesWrapper');
		inputAndBtn.remove();
		let wrap = document.getElementById('wrap');
		wrap.style.maxHeight = '239px';
		// let instructions = document.getElementById('instructions');
		// instructions.style.visibility = 'hidden';
		let users = document.getElementById('playernames');
		users.style.marginTop = '0px';
		users.style.visibility = 'visible';
		if (!message) return;
		localStorage.setItem('Playername', message);
		localStorage.setItem('Score', '0');
		textfield = '';
		io.emit('message', message);
	}

	function submitName() {
		message = textfield.trim();

		if (message.length === 0) {
		} else {
			sendName();
		}
	}

	function startSinglePlay() {
		dispatch('singlePlay');
	}
</script>

<div class="wrap" id="wrap">
	<div>
		<img id="logo" src="/images/logoMobile.png" alt="logotype" />
	</div>
	<div class="signinAndUsernamesWrapper" id="signinAndUsernamesWrapper">
		<form action="#" on:submit|preventDefault={submitName}>
			<div class="signInContainer" id="signInContainer">
				<input id="input" type="text" bind:value={textfield} placeholder="Enter your name..." />
				<button id="btn" type="submit">Join multiplayer</button>
			</div>
		</form>
		<button on:click={startSinglePlay} id="singlePlay">Single player version</button>
	</div>
	<div class="playernames" id="playernames">
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

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		margin-top: 70px;
		justify-content: space-around;
		max-height: 400px;
		justify-content: center;
		align-items: center;
	}

	#logo {
		width: 300px;
		position: relative;
		left: 5px;
		margin-bottom: 20px;
		margin-top: 20px;
	}

	.messages,
	p {
		margin-bottom: 5px;
	}

	.instructions {
		color: rgba(255, 255, 255, 0.8);
		text-align: center;
		max-width: 250px;
		padding: 0px 5px 5px 5px;
		border: 1px solid rgba(255, 255, 255, 0.8);
		border-radius: 10px;
		margin-top: 20px;
		position: relative;
		bottom: 40px;
	}

	#singlePlay {
		margin-bottom: 10px;
	}

	.instructions,
	h2 {
		margin-top: 5px;
		margin-bottom: 0px;
	}

	.instructions,
	p {
		margin-top: 5px;
	}

	.signinAndUsernamesWrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100px;
		margin-bottom: 10px;
	}

	.playernames {
		color: white;
		text-align: center;
		margin-top: 50px;
		height: 0px;
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
	}

	.wait {
		font-weight: bold;
	}

	@media screen and (min-width: 1440px) {
		.wrap {
			height: 400px;
		}

		#logo {
			width: 350px;
			margin-top: 60px;
		}
	}
</style>
