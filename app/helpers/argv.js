const { program } = require('commander');
program
	.version('0.0.1')
	.option('-u, --url <url>', 'the url SSO is reachable at')
	.option('-p, --port <port>', 'the port to use for the http server')

program.parse(process.argv);

module.exports = program;