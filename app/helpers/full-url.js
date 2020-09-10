const config = require('../config');

module.exports = function fullUrl(path) {
	return config.http.url + path;
}