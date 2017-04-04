const Controller = require('./controller');
const express = require('express');

const app = express.Router();

app.get('/events/:username', Controller.getEvents);

app.post('/artists', (req, res) => {
  console.log("ARTISTS, HERE");
  console.log('REQ BOD', req.body);
});

module.exports = app;
