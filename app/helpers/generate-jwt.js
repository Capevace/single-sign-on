const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function generateJWT(user) {
	const token = jwt.sign(
		{
			user: {
				id: user.id
			}
		},
		config.auth.secret,
		{
			expiresIn: config.auth.expiresIn,
			issuer: config.auth.issuer,
			audience: config.auth.audience
		}
	);

	return token;
};