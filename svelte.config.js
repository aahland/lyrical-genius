
import { Server } from 'socket.io';
import node from '@sveltejs/adapter-node';
import auto from '@sveltejs/adapter-auto';
// import preprocess from 'svelte-preprocess';

// export const webSocketServer = {
// 	name: 'webSocketServer',
// 	configureServer(server) {
// 		const io = new Server(server.httpServer);

// 		io.on('connect')
// 	}
// }


/** @ty{pe {import('@sveltejs/kit').Config} */
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
		}

		
	}
};

export default config;

