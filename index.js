const config = require('./config.json');
const express = require('express');
const app = express();
const http = require('http');
const util = require('./util.js');
const db = require('./db/mysql-connection.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// First let users authenticate before anything else
app.use('/api', require('./routes/routes_authentication.js'));

// Check authentication for all other endpoints
app.all('*', (req, res, next) => {
    console.log(req.method + " " + req.url);
    let token = req.get('Authorization');
    if(!token)
    {
        res.status(401).json(util.getError("No authentication headers were sent"));
    }
    else
    {
        db.query("SELECT * FROM user WHERE token = ?", [token]);

        next();
    }
});

// Define different versions of routes
app.use('/api/studentenhuis', require('./routes/routes_studentenhuis.js'));
app.use('/api/studentenhuis', require('./routes/routes_deelnemers.js'));
app.use('/api/studentenhuis', require('./routes/routes_maaltijd.js'));



// Handle all errors
app.use((err, req, res, next) => {

    console.log(err.toString());

    res.status(500).json(util.getError(err.toString())).end();
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