const Controller = require('./controller.js');
const express = require('express');

const app = express.Router();

app.get('/events', Controller.getEvents);

app.get('/home', Controller.goHome);

app.post('/artists', Controller.createPlaylist);

module.exports = app;
