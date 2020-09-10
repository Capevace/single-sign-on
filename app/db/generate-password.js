const crypto = require('./crypto');

module.exports = async function hashPassword(password) {
	console.log('Hash: ' + crypto.hashPasswordSync(password));

	process.exit();
}
