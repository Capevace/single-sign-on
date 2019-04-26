const config = require('../config');
const express = require('express');
const http = require('http');
const https = require('https');

const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./passport');

const app = express();

app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'", 'https://fonts.gstatic.com'],
			styleSrc: [
				"'self'",
				'https://fonts.googleapis.com',
				'https://fonts.gstatic.com',
				"'unsafe-inline'"
			]
		}
	})
);
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: false,
		name: 'sso.sid'
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
