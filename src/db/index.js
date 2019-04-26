const config = require('../config');
const users = require(config.usersDbPath);

module.exports.findUser = function findUser(id) {
	if (id in users) {
		return users[id];
	}

	return null;
};

module.exports.findUserById = function findUser(id) {
	return Object.values(users).reduce((correctUser, user) => {
		if (correctUser) return correctUser;

		if (user.id === id) return user;

		return null;
	}, null);
};
