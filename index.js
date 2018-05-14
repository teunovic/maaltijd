const config = require('./config.json');
const express = require('express');
const app = express();
const http = require('http');
const util = require('./util.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

// Define different versions of routes
app.use('/api', require('./routes/routes_authentication.js'));
app.use('/api/studentenhuis', require('./routes/routes_studentenhuis.js'));
// app.use('/api/deelnemers', require('./routes/routes_deelnemers.js'));
app.use('/api/studentenhuis', require('./routes/routes_maaltijd.js'));



// Handle all errors
app.use((err, req, res, next) => {

    console.log(err.toString());

    const error = {
        message: err.message,
        code: err.code,
        name: err.name,
        datetime: new Date().toUTCString(),
        url: req.url
    };
    res.status(500).json({
        error: error
    }).end();
});

app.use('*', (req, res, next) => {
    res.status(400).json(util.getError("Could not access endpoint")).end();
});

//Define port
const port = process.env.PORT || config.port;


//Start server
app.listen(port, () => {
    console.log('server is ready at port: ' + port)
});