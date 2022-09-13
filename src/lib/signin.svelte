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
		let singlePlayBtn = document.getElementById('singlePlay');
		singlePlayBtn.remove();
		let multiBtn = document.getElementById('btn');
		multiBtn.remove();
		let inputField = document.getElementById('input');
		inputField.remove();
		let fourRounds = document.createElement('button');
		let eightRounds = document.createElement('button');
		let twelveRounds = document.createElement('button');
		let singleWrap = document.getElementById('singleWrap');
		singleWrap.appendChild(fourRounds);
		singleWrap.appendChild(eightRounds);
		singleWrap.appendChild(twelveRounds);
		fourRounds.innerHTML = '4 rounds';
		eightRounds.innerHTML = '8 rounds';
		twelveRounds.innerHTML = '12 rounds';
		fourRounds.onclick = startSingle;
		eightRounds.onclick = startSingle;
		twelveRounds.onclick = startSingle;
	}

	function startSingle(event) {
		let innerHtml = event.target.innerHTML;
		if (innerHtml === '4 rounds') {
			dispatch('singlePlay');
			localStorage.setItem('Rounds', '4');
		} else if (innerHtml === '8 rounds') {
			dispatch('singlePlay');
			localStorage.setItem('Rounds', '8');
		} else if (innerHtml === '12 rounds') {
			dispatch('singlePlay');
			localStorage.setItem('Rounds', '12');
		}
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
		<div id="singleWrap">
			<button on:click={startSinglePlay} id="singlePlay">Single player version</button>
		</div>
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

	#singlePlay {
		margin-bottom: 10px;
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

	#singleWrap {
		display: flex;
		flex-direction: column;
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
