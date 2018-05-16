// API - Version 1
const express = require('express');
const router = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');

router.get('/:id?', (req, resp) => {
    const id = req.params.id;

    console.log("Studentenhuis request from user " + resp.locals.user['Voornaam'] + resp.locals.user['Achternaam']);
    if(!id) {
        db.query("SELECT * FROM studentenhuis", (err, result, fields) => {
            if (err) console.error(err);
            resp.json(result);
        })
    } else {
        db.query("SELECT * FROM studentenhuis WHERE id = ? LIMIT 1", [id], (err, result, fields) => {
            if (err) console.error(err);
            if(result.length !== 1) {
                resp.status(404).json(util.getError("HuisId bestaat niet"));
            } else {
                resp.json(result[0]);
            }
        })
    }
});


module.exports = router;


