const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");
const argv = require('./helpers/argv');

const basePath =
	process.env.NODE_ENV === "production"
		? "/etc/single-sign-on"
		: require("os").homedir() + "/.single-sign-on";

let config = require("rc")("single-sign-on", {
	basePath,
	viewPath: __dirname + "/views",
	usersDbPath: basePath + "/users.json",
	sessionStoragePath: basePath + "/session",
	http: {
		url: '',
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
;url=
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
		'{"admin": {"password": "$2b$10$iOXefTbja0vFE39WKU96xeoQ3qwfH9LIXqWcvI6KljsbDVGAQY92O"}}'
	);
}

if (!fs.existsSync(config.sessionStoragePath)) {
	console.log("Session storage folder not found. Creating...");

	fs.mkdirSync(config.sessionStoragePath);
}

if (argv.url) {
	config.http.url = argv.url;
}

if (argv.port) {
	config.http.port = argv.port;
}

module.exports = config;
