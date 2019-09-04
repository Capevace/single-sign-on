const bcrypt = require('bcrypt');

/**
 * Compare a password to a hash to see if they match.
 * @async
 * @param  {string} password The unhashed password to check.
 * @param  {string} hash     The hashed password to check against.
 * @return {bool} True if the passwords do match.
 */
module.exports.comparePassword = function comparePassword(password, hash) {
	return new Promise(resolve => {
		bcrypt.compare(password, hash, (err, match) => {
			if (err) {
				console.log('Error matching passwords', err);
				resolve(false);
			}

			resolve(!!match);
		});
	});
};

/**
 * Generate a hash for a given password.
 * @param  {string} password The password to hash.
 * @return {string}          The hash.
 */
module.exports.hashPassword = function hashPassword(password) {
	return new Promise(resolve => {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) throw err;

			resolve(hash);
		});
	});
};
