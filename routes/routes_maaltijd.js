// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');

router.get(':id?/maaltijd', (req, resp) => {
    db.query("SELECT * FROM maaltijd", (err, result, fields) => {
        if(err) console.error(err);
        resp.status(200).json(result);
    });
});

module.exports = router;