const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");
const argv = require('./helpers/argv');

const basePath =
	process.env.NODE_ENV === "production"
		? "/etc/mission-control-sso"
		: require("os").homedir() + "/.mission-control-sso";

let config = require("rc")("mission-control-sso", {
	basePath,
	viewPath: __dirname + "/views",
	usersDbPath: basePath + "/users.json",
	sessionStoragePath: basePath + "/session",
	http: {
		port: 3001,
		secret: uuid(),
	},
	auth: {
		issuer: "mission-control-sso",
		audience: "mission-control",
		expiresIn: 86400,
		secret: "applepie",
	},
});

if (!fs.existsSync(config.basePath)) {
	console.log(
		"Base path not found. Creating base directory " + config.basePath
	);

	fs.mkdirSync(config.basePath, { recursive: true });
}

if (!fs.existsSync(config.basePath + "/config")) {
	console.log("Config file not found. Creating...");

	fs.writeFileSync(
		config.basePath + "/config",
`; Single Sign On (Mission Control) Config File

[http]
secret=${config.http.session}
;port=3001

[auth]
;expiresIn=86400
;secret=applepie
`
	);
}

if (!fs.existsSync(config.usersDbPath)) {
	console.log("Users file not found. Creating...");

	fs.writeFileSync(
		config.usersDbPath,
		'{"hal": {"id": "hal","password": "$2b$10$4rDoXH4/AeYuSM201LJqIOfuF9Bqd6XKW3.7m8uknQcidcAIy4U/u"}}'
	);
}

if (!fs.existsSync(config.sessionStoragePath)) {
	console.log("Session storage folder not found. Creating...");

	fs.mkdirSync(config.sessionStoragePath);
}

if (argv.port) {
	config.http.port = argv.port;
}

module.exports = config;
