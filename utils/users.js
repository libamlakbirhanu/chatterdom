const users = [];

function addUser(id, username, room) {
	const user = { id, username, room };

	users.push(user);

	return user;
}

function getCurrentUser(id) {
	return users.find((user) => id === user.id);
}

function getRoomUsers(room) {
	return users.filter((user) => room === user.room);
}

module.exports = {
	addUser,
	getCurrentUser,
	users,
};
