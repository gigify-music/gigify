const Controller = require('./controller');
const express = require('express');
const Reminder = require('./reminder');

const app = express.Router();

app.get('/events/:username', Controller.getEvents);

app.get('/home', Controller.goHome);

app.get('/checksession', Controller.checkSession);

app.post('/addreminder', Reminder.addReminder);

app.post('/artists', Controller.createPlaylist);

module.exports = app;
