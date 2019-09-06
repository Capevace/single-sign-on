const fs = require('fs');
const path = require('path');

const basePath = require('os').homedir() + '/.mission-control-sso';
const config = require('rc')('mission-control-sso', {
	basePath,
	viewPath: __dirname + '/views',
	usersDbPath: basePath + '/users.json',
	sessionStoragePath: basePath + '/session',
	port: 3001,
	secrets: {
		jwt: 'secret',
		session: 'session'
	},
	jwt: {
		issuer: 'mission-control-sso',
		audience: 'mission-control',
		expiresIn: 86400
	}
});

if (!fs.existsSync(config.basePath)) {
	console.log('Base path not found. Creating base directory ' + config.basePath);

	fs.mkdirSync(config.basePath, { recursive: true });
}

if (!fs.existsSync(config.basePath + '/config')) {
	console.log('Config file not found. Creating...');

	fs.writeFileSync(config.basePath + '/config', 
`; Single Sign On (Mission Control) Config File

;[secrets]
;session=
;jwt=
`
	);
}

if (!fs.existsSync(config.usersDbPath)) {
	console.log('Users file not found. Creating...');

	fs.writeFileSync(
		config.usersDbPath, 
		'{"hal": {"id": "hal","password": "$2b$10$4rDoXH4/AeYuSM201LJqIOfuF9Bqd6XKW3.7m8uknQcidcAIy4U/u"}}'
	);
}

if (!fs.existsSync(config.sessionStoragePath)) {
	console.log('Session storage folder not found. Creating...');

	fs.mkdirSync(config.sessionStoragePath);
}


module.exports = config;