import node from '@sveltejs/adapter-node';
import cloudflare from '@sveltejs/adapter-cloudflare'
import { Server } from 'socket.io';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: node(),
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

