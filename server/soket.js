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
	let sysId = socket.handshake.query.sysId;
	console.log(`A user ${sysId} connected`);

	if (!sysId) {
    console.error('Missing sysId in handshake query');
    socket.disconnect(true);
    return;
  }

	if (typeof sysId !== 'string' || sysId.trim() === '') {
    console.error('Invalid sysId');
    socket.disconnect(true);
    return;
  }

	socketMap[sysId] = socket.id;

	socket.on('disconnect', () => {
		console.log('A user disconnected');
		delete socketMap[sysId];
	});
});

export { app, io, httpServer };
