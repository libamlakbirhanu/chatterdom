const users = [];

function addUser(id, username, room) {
	const user = { id, username, room };

	users.push(user);

	return user;
}

function getCurrentUser(id) {
	return users.find((user) => id === user.id);
}

module.exports = {
	addUser,
	getCurrentUser,
	users,
};
