const express = require('express');
const http = require('http');
const socket = require('socket.io');
const messages = require('./utils/messages');
const { addUser, getCurrentUser, users } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.port || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
	socket.on('join', ({ username, room }) => {
		socket.join(room);
		addUser(socket.id, username, room);
		socket.broadcast
			.to(room)
			.emit('message', messages('admin', `${username} connected!`));
		io.to(room).emit('users', users);
		socket.emit('message', messages('admin', 'welcome to the room'));
		socket.on('chatMessage', (msg) => {
			io.to(room).emit('message', messages(username, msg));
		});
	});
	socket.on('disconnect', () => {
		const user = getCurrentUser(socket.id);
		const index = users.indexOf(user);
		users.splice(index, 1);
		io.to(user.room).emit('users', users);
	});
});

server.listen(PORT, () => {
	console.log('server running on port number', PORT);
});
