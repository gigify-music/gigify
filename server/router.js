const Controller = require('./controller');
const express = require('express');

const app = express.Router();

app.get('/events/:username', Controller.getEvents);

app.get('/home', Controller.goHome);

<<<<<<< HEAD
app.post('/artists', (req, res) => {
  console.log("ARTISTS, HERE");
  console.log('REQ BOD', req.body);
  res.send('butts');
});
=======
app.post('/artists', Controller.createPlaylist);
>>>>>>> artist-search-api

module.exports = app;
