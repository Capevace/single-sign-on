const app = require('./http/express');

require('./http/routes');

app.listen(3001, () =>
	console.log('Mission Control SSO listening on port 3001.')
);
