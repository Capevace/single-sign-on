const pkg = require('../../package.json');
const { program } = require('commander');
const generatePassword = require('../db/generate-password');

program
	.version(pkg.version)
	.option('-u, --url <url>', 'the url SSO is reachable at')
	.option('-p, --port <port>', 'the port to use for the http server')
	.command('password [password]')
	.description('hash a password to put it in config')
	.action(async (password) => {
		await generatePassword(password);
	});

program.parse(process.argv);

module.exports = program;