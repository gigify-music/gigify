const Controller = require('./controller.js');
const express = require('express');

const app = express.Router();

app.get('/events', Controller.getEvents);

module.exports = app;
