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

// Check authentication for all other endpoints
app.all('*', (req, res, next) => {
    console.log(req.method + " " + req.url);
    let token = req.get('Authorization');
    if(!token)
    {
        res.status(401).json(util.getError("No token was sent")).end();
    }
    else
    {
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                console.error(err);
                res.status(401).json(util.getError("Token is invalid")).end();
            }
            else {
                let uid = payload.userid;
                console.log(payload);
                db.query("SELECT * FROM user WHERE ID = ? LIMIT 1", [uid], (err, results, fields) => {
                    if(err) console.error(err);
                    if(results.length !== 1) {
                        res.status(401).json(util.getError("Token has expired")).end();
                    }
                    res.locals.user = results[0];
                    next();
                });
            }
        });
    }
});

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