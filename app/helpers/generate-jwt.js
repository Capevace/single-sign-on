const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function generateJWT(user) {
	const token = jwt.sign(
		{
			user: {
				id: user.id
			}
		},
		config.secrets.jwt,
		{
			expiresIn: config.jwt.expiresIn,
			issuer: config.jwt.issuer,
			audience: config.jwt.audience
		}
	);

	return token;
};