<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { io } from '$lib/realtime';
	import { onMount } from 'svelte';
	import { storedStats } from '../helpers/store';

	let textfield = '';
	let messages = [];

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

	function sendMessage() {
		storedStats.set([]);
		const message = textfield.trim();
		let btn = document.getElementById('btn');
		let input = document.getElementById('input');
		input.style.visibility = 'hidden';
		btn.style.visibility = 'hidden';
		if (!message) return;
		localStorage.setItem('Playername', message);
		localStorage.setItem('Score', '0');
		textfield = '';
		io.emit('message', message);
	}
</script>

<div class="wrap">
	<form action="#" on:submit|preventDefault={sendMessage}>
		<div class="signInWrapper" id="signInWrapper">
			<input id="input" type="text" bind:value={textfield} placeholder="Enter your name..." />
			<button id="btn" type="submit">Join</button>
		</div>
	</form>

	<div class="usernames">
		<div>
			<header>
				<span class="wait">Waiting for players..</span>
			</header>
			<div>
				{#each messages as message}
					<div class="messages">
						<span class="flex items-center space-between gap-4">
							<b>{message.message}</b>
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
		margin-top: 50px;
	}

	.usernames {
		color: white;
		text-align: center;
		margin-top: 50px;
	}

	.signInWrapper {
		display: flex;
		flex-direction: column;
	}

	.messages {
		color: white;
	}

	.wait {
		font-family: sans-serif;
	}
</style>
