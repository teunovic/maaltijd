// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');

router.get('/maaltijd', (req, resp) => {
    db.query("SELECT * FROM maaltijd", (err, result, fields) => {
        if(err) console.error(err);
        resp.json(result);
    });
});

module.exports = router;