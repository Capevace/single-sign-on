const bcrypt = require('bcrypt');

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

module.exports.hashPassword = function hashPassword(password) {
	return new Promise(resolve => {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) throw err;

			resolve(hash);
		});
	});
};
