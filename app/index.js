#! /usr/bin/env node

const config = require('./config');
const app = require('./http/express');

require('./http/routes');

app.listen(config.http.port, () =>
	console.log(`Single-Sign-On available on port ${config.http.port}.`)
);