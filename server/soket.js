import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: [ 'GET', 'POST', 'PUT', 'DELETE' ]
	}
});

const socketMap = {};

export const getReceiversSocketId = (receiverId) => {
	return socketMap[receiverId];
};


io.on('connection', (socket) => {
	const telegram_id = socket.handshake.query.telegram_id;
	console.log(`A user ${telegram_id} connected`);

	if (!telegram_id) {
		console.error('Missing telegram_id in handshake query');
		socket.disconnect(true);
		return;
	}

	if (typeof telegram_id !== 'string' || telegram_id.trim() === '') {
		console.error('Invalid telegram_id');
		socket.disconnect(true);
		return;
	}

	socketMap[telegram_id] = socket.id;

	socket.on('disconnect', () => {
		console.log('A user disconnected');
		delete socketMap[telegram_id];
	});
});

export { app, io, httpServer };
