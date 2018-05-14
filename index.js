const config    =       require('./config.json');
const express   =       require('express');
const app       =       express();



app.get('/maaltijd', (req, resp) => {
    resp.json({
        'msg': 'test'});
    });



//Define port
const port = process.env.PORT || 8080;

app.listen( port, () => {
    console.log('server is ready')
});