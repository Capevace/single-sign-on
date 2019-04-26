const crypto = require('./crypto');

(async () => {
	console.log('Hashing:', process.argv[2]);
	console.log(await crypto.hashPassword(process.argv[2]));
})();
