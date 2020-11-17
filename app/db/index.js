const config = require('../config');
const users = require(config.usersDbPath);

/**
 * Find a user by their ID.
 * @param  {string} id The user's ID to look for.
 * @return {Object}    The user object.
 */
module.exports.findUser = function findUser(username) {
	if (username in users) {
		const user = users[username];

		return {
			...user,
			username
		};
	}

	return null;
};
