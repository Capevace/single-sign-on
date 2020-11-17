const fs = require('fs');
const config = require('../../config');
const fullUrl = require('../../helpers/full-url');

function getProfilePage(req, res) {
	if (!req.isAuthenticated()) {
		res.redirect(fullUrl('/login'));
		return;
	}

	let content = fs.readFileSync(config.viewPath + '/profile.html').toString();
	content = content.replace('{{TOKEN}}', req.session.jwt);

	content = content.replace(/\{\{URL\}\}/g, config.http.url);

	res.send(content);
}

module.exports = {
	getProfilePage
};