
import { Server } from 'socket.io';
import node from '@sveltejs/adapter-node'
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: node({ out: 'production' }),
		vite: {
			plugins: [
				{
					name: 'sveltekit-socket-io',
					configureServer(server) {
						const io = new Server(server.httpServer);
						io.on('connection', (socket) => {

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

							socket.on('playersScoreReady', (ready) => {
								io.emit('playersScoreReady', {
									ready

								});

							});

							socket.on('start', (start) => {
								io.emit('start', {
									start

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

