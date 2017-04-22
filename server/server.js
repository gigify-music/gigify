require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRouter = require('./authRouter.js');
const router = require('./router.js');
const CronJob = require('./cronjob');
// const sendNotification = require('./sendreminder');

const port = process.env.PORT || 8000;

const app = express();

// MIDDLEWARE===================================================================
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));
app.use(session({ secret: 'moms spaghetti' }));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig.js')(passport);

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// ROUTER CONFIGURATION=========================================================
app.use('/auth', authRouter);
app.use('/api', router);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});
// SERVER CONFIGURATION=========================================================

app.listen(port);
console.log(`Listening on ${port}`);
CronJob.job();
// sendNotification.sendNotification();
