const fs = require('fs');
const config = require('../../config');

function getProfilePage(req, res) {
	if (!req.isAuthenticated()) {
		res.redirect('/login');
		return;
	}

	let content = fs.readFileSync(config.viewPath + '/profile.html').toString();
	content = content.replace('{{TOKEN}}', req.session.jwt);

	res.send(content);
}

module.exports = {
	getProfilePage
};