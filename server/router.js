const Controller = require('./controller.js');
const express = require('express');

const app = express.Router();

app.get('/events', Controller.getEvents);

app.get('/home', Controller.goHome);

app.post('/artists', (req, res) => {
  console.log('REQ BOD', req.body);
});

module.exports = app;
