const config = require('./config');
const app = require('./http/express');

require('./http/routes');

app.listen(config.port, () =>
	console.log(`Mission Control SSO listening on port ${config.port}.`)
);
