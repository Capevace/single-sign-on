const config = require('../config');
const express = require('express');
const http = require('http');
const https = require('https');

const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const passport = require('./passport');

const app = express();

app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'", 'https://fonts.gstatic.com'],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			styleSrc: [
				"'self'",
				'https://fonts.googleapis.com',
				'https://fonts.gstatic.com',
				"'unsafe-inline'",
			],
		},
	})
);
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		store: new FileStore({
			path: config.basePath + '/session',
			secret: config.http.secret,
		}),
		secret: config.http.secret,
		resave: false,
		saveUninitialized: false,
		name: 'sso.sid',
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 // sessions are active for a year
		},
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('base', '/sso');

module.exports = app;
