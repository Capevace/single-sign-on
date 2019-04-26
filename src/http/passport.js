const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');
const crypto = require('../db/crypto');

passport.use(
	new LocalStrategy(async (username, password, done) => {
		const user = db.findUser(username);

		if (user && (await crypto.comparePassword(password, user.password))) {
			return done(null, user);
		}

		return done(null, false);
	})
);

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	const user = db.findUserById(id);

	if (!user) return cb(null, false);

	return cb(null, user);
});

module.exports = passport;
