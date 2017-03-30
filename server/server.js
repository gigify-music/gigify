const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;

const app = express();

// MIDDLEWARE===================================================================

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client')));

// ROUTER CONFIGURATION=========================================================

const router = require('./router.js');

app.use('/api', router);

// SERVER CONFIGURATION=========================================================

app.listen(port);
console.log(`Listening on ${port}`);
