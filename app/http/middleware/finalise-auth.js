const queryString = require('querystring');
const generateJWT = require('../../helpers/generate-jwt');

module.exports = function finaliseAuth(req, res) {
	const redirectUrl = req.query.redirect_url || req.session.redirectUrl;
	delete req.session.redirectUrl;

	// If we somehow get here and arent authenticated, redirect to login
	if (!req.isAuthenticated()) {
		req.session.redirectUrl = redirectUrl;
		return req.session.save(function(err) {
			if (err) { console.log('Error saving session', err); }
			res.redirect('/login');
		});
	}

	// Generate the JWT
	const token = generateJWT(req.user);

	// Send the JWT payload to the client
	const payload = {
		auth_token: token,
		status: req.query.status || null
	};

	const url = redirectUrl + '?' + queryString.stringify(payload);
	if (redirectUrl) res.redirect(url);
	else res.redirect('/');
}