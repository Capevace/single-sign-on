const fs = require('fs');
const config = require('../../config');
const passport = require('../passport');
const finaliseAuth = require('../middleware/finalise-auth');
const fullUrl = require('../../helpers/full-url');

/**
 * Get the login view.
 * @param  {Request} req The express request object.
 * @param  {Response} res The express response object.
 */
function getLoginPage(req, res) {
	let content = fs.readFileSync(config.viewPath + '/login.html').toString();

	const error = req.flash('error');

	if (error.length > 0) {
		content = content.replace(
			'{{ERROR_MSG}}',
			`<p class="error-msg">${error[0]}</p>`
		);
	} else {
		content = content.replace('{{ERROR_MSG}}', '');
	}

	content = content.replace(/\{\{URL\}\}/g, config.http.url);

	return res.send(content);
}

/**
 * Perform the login action.
 * @param  {Request} req The express request object.
 * @param  {Response} res The express response object.
 */
const postLoginFunctions = [passport.authenticate('local', {
		failureRedirect: fullUrl('/login'),
		failureFlash: 'Incorrect username or password.'
	}), finaliseAuth];

function postLogin(req, res) {
	passport.authenticate('local', {
		failureRedirect: fullUrl('/login'),
		failureFlash: 'Incorrect username or password.'
	})(req, res, err => finaliseAuth(req, res));

	// passport.authenticate('local', (err, user, info) => {
	// 	if (err) {
	// 		return next(err);
	// 	}

	// 	if (!user) {
	// 		return res.redirect('/login');
	// 	}

	// 	req.logIn(user, (err) => {
	// 		if (err) {
	// 			return next(err);
	// 		}

	// 		return finaliseAuth(req, res);
	// 	});
	// })(req, res, next);
}

/**
 * Logout the user.
 * @param  {Request} req The express request object.
 * @param  {Response} res The express response object.
 */
function logout(req, res) {
	if (req.isAuthenticated()) {
		req.logout();
	}

	return res.redirect(req.query.redirect_url || fullUrl('/'));
}

module.exports = {
	getLoginPage,
	postLogin,
	postLoginFunctions,
	logout
};
