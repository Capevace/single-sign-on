const path = require('path');
const express = require('express');
const app = require('./express');

const loginController = require('./controllers/login');
const apiController = require('./controllers/api');
const profileController = require('./controllers/profile');

const authStateRedirect = require('./middleware/auth-state-redirect');

app.get('/', authStateRedirect());

// API Routes
app.get('/api/v1/authenticate', apiController.authenticate);

// Login Routes
app.get('/login', authStateRedirect('/profile', 'next'), loginController.getLoginPage);
app.post('/login', authStateRedirect('/profile', 'next'), ...loginController.postLoginFunctions);
app.get('/logout', authStateRedirect('next', '/login'), loginController.logout);

// Profile Routes
app.get('/profile', authStateRedirect('next', '/login'), profileController.getProfilePage);

// Static Resources
app.use('/static', express.static(path.resolve(__dirname, '../../resources/static')));
