const config = require('../config');
const app = require('./express');
const passport = require('./passport');
const jwt = require('jsonwebtoken');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const queryString = require('querystring');

const fs = require('fs');
const loginViewContent = fs.readFileSync(config.loginViewPath).toString();

const redirectBackOrOutputJWT = (req, res) => {
	const redirectUrl = req.query.redirect_url || req.session.redirectUrl;
	delete req.session.redirectUrl;

	if (!req.isAuthenticated()) {
		req.session.redirectUrl = redirectUrl;

		req.session.save(function(err) {
			if (err) {
				console.log('Error saving session', err);
			}
			res.redirect('/login');
		});
		return;
	}

	const token = jwt.sign(
		{
			user: {
				id: req.user.id
			}
		},
		config.jwt.secret,
		{
			expiresIn: config.jwt.expiresIn,
			issuer: config.jwt.issuer,
			audience: config.jwt.audience
		}
	);

	const payload = {
		auth_token: token,
		status: req.query.status || null
	};

	const url = redirectUrl + '?' + queryString.stringify(payload);
	if (redirectUrl) res.redirect(url);
	else res.json(payload);
};

app.get('/authenticate', redirectBackOrOutputJWT);
app.get('/login', (req, res) => {
	let content = loginViewContent;
	const error = req.flash('error');

	if (error.length > 0) {
		content = content.replace(
			'{{ERROR_MSG}}',
			`<p class="error-msg">${error[0]}</p>`
		);
	} else {
		content = content.replace('{{ERROR_MSG}}', '');
	}

	res.send(content);
});
app.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: 'Incorrect username or password.'
	}),
	redirectBackOrOutputJWT
);
