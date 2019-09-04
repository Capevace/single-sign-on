const finaliseAuth = require('../middleware/finalise-auth');

/**
 * Get a JSON web token if the user is logged in.
 *
 * Otherwise he will be redirected to the login page to login beforehand.
 *
 * @param  {Request} req The express request object.
 * @param  {Response} res The express response object.
 */
function authenticate(req, res) {
	return finaliseAuth(req, res);
}

module.exports = {
	authenticate
};
