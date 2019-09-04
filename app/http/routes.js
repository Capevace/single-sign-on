const path = require('path');
const express = require('express');
const app = require('./express');

const loginController = require('./controllers/login');
const apiController = require('./controllers/api');
const profileController = require('./controllers/profile');

app.get('/', (req, res) => {
	if (!req.isAuthenticated()) {
		res.redirect('/login');
	} else {
		res.redirect('/profile');
	}
});

// API Routes
app.get('/api/v1/authenticate', apiController.authenticate);

// Login Routes
app.get('/login', loginController.getLoginPage);
app.post('/login', ...loginController.postLoginFunctions);
app.get('/logout', loginController.logout);

// Profile Routes
app.get('/profile', profileController.getProfilePage);

// Static Resources
app.use('/static', express.static(path.resolve(__dirname, '../../resources/static')));
