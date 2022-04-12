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
	<form
		action="#"
		on:submit|preventDefault={sendMessage}
		class="px-6 py-4 border-t border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center"
	>
		<div class="signInWrapper" id="signInWrapper">
			<input
				id="input"
				type="text"
				bind:value={textfield}
				placeholder="Enter your name..."
				class="bg-transparent border-none px-4 py-3 w-full"
			/>
			<button id="btn" type="submit" class="shrink-0 border border-white rounded-lg px-4 py-3"
				>Join</button
			>
		</div>
	</form>

	<div class="usernames">
		<div class="h-full w-full max-w-md mx-auto bg-zinc-500 flex flex-col">
			<header
				class="px-6 py-4 border-b border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center justify-between"
			>
				<span class="font-bold text-xl">Waiting for players..</span>
			</header>

			<div class="h-full w-full p-4">
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
</style>
