import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';

const port = 'https://lg-quiz.herokuapp.com/';
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    socket.emit('event from server', 'Hello World')
    console.log("someone connected")

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


app.use(handler);

server.listen(port);