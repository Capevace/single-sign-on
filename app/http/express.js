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
				"'unsafe-inline'"
			]
		}
	})
);
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		store: new FileStore({
			path: config.basePath + '/session',
			secret: config.secrets.session,
		}),
		secret: config.secrets.session,
		resave: false,
		saveUninitialized: false,
		name: 'sso.sid',
		cookie: {
			
		}
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
