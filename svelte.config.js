import adapter from '@sveltejs/adapter-auto';
import cloudflare from '@sveltejs/adapter-cloudflare'
import { Server } from 'socket.io';
import preprocessor from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor(),
	kit: {
		adapter: cloudflare(),
		
			
		vite: {
			plugins: [
				{
					name: 'sveltekit-socket-io',
					configureServer(server) {
						const io = new Server(server.httpServer);

						io.on('connection', (socket) => {
							// Generate a random username and send it to the client to display it
							let username = `User ${Math.round(Math.random() * 999999)}`;
							socket.emit('name', username);

							// Receive incoming messages and broadcast them
							socket.on('message', (message) => {
								io.emit('message', {
									message: message,

								});

							});
							socket.on('data', (data) => {
								io.emit('data', {
									data: data,

								});

							});

							socket.on('finalScores', ({ name, score }) => {
								io.emit('finalScores', {
									finalScores: [{ name, score }]

								});

							});

							socket.on('sendScores', (click) => {
								io.emit('sendScores', {
									click

								});

							});


						});

						console.log('SocketIO injected');
					}
				}
			]
		},
		

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;

