const pkg = require('../../package.json');
const { program } = require('commander');
const crypto = require('../db/crypto');

program
	.version(pkg.version)
	.option('-u, --url <url>', 'the url SSO is reachable at')
	.option('-p, --port <port>', 'the port to use for the http server')
	.option('--hash-pw <password>', 'hash a password to put in config');

program.parse(process.argv);

if (program.hashPw) {
	console.log('Hash: ' + crypto.hashPasswordSync(program.hashPw));
	process.exit();
}

module.exports = program;