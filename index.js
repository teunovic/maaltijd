const config = require('./config.json');
const express = require('express');
const app = express();
const http = require('http');
const util = require('./util.js');
const auth = require('./auth/authentication.js');
const db = require('./db/mysql-connection.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// First let users authenticate before anything else
app.use('/api', require('./routes/routes_authentication.js'));

// Define different versions of routes
app.use('/api/studentenhuis', require('./routes/routes_studentenhuis.js'));
app.use('/api/studentenhuis', require('./routes/routes_deelnemers.js'));
app.use('/api/studentenhuis', require('./routes/routes_maaltijd.js'));


app.use('*', (req, res, next) => {
    res.status(400).json(util.getError("Could not access endpoint")).end();
});

//Define port
const port = process.env.PORT || config.port;


//Start server
app.listen(port, () => {
    console.log('server is ready at port: ' + port)
});