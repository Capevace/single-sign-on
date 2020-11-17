const fullUrl = require('../../helpers/full-url');

/**
 * Middleware to redirect based on the auth state.
 * 
 * If 'next' is passed for any of the arguments, 
 * the middleware will call the next function instead
 * of redirecting.
 *
 * @param {string} loggedInUrl URL to redirect to if logged in
 * @param {string} loggedOutUrl URL to redirect to if logged out
 */
module.exports = function authStateRedirect(loggedInUrl = '/profile', loggedOutUrl = '/login') {
	return (req, res, next) => {
		if (req.isAuthenticated()) {
			if (loggedInUrl === 'next') {
				next();
			} else {
				res.redirect(fullUrl(loggedInUrl));
			}
		} else {
			if (loggedOutUrl === 'next') {
				next();
			} else {
				res.redirect(fullUrl(loggedOutUrl));
			}
		}
	};
};