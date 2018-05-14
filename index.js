const config = require('./config.json');
const express = require('express');
const app = express();
const http = require('http');


app.all('*', (req, res, next) => {
    next();
});


app.use('/api', require('./routes/routes_apiv1.js'));

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
    res.status(400).json({
        'error': 'This route is not available.'
    }).end();
});

//Define port
const port = process.env.PORT || config.port;


//Start server
app.listen(port, () => {
    console.log('server is ready at port: ' + port)
});