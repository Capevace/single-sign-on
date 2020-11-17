const fs = require('fs');
const config = require('../../config');
const fullUrl = require('../../helpers/full-url');

function getProfilePage(req, res) {
	let content = fs
		.readFileSync(config.viewPath + '/profile.html')
		.toString()
		.replace('{{TOKEN}}', req.session.jwt)
		.replace(/\{\{URL\}\}/g, config.http.url);

	res.send(content);
}

module.exports = {
	getProfilePage
};