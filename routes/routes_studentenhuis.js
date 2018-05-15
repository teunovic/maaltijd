// API - Version 1
const express = require('express');
const router = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');
const Studentenhuis = require('../classes/Studentenhuis.js');

// EVERY Studentenhuis request goes through here, first check whether it exists
router.all('/:id*', (req, res, next) => {
    console.log("ANY studentenhuis request, first get the requested studentenhuis");
    const id = req.params.id;

    db.query("SELECT * FROM studentenhuis WHERE ID = ? LIMIT 1",
        [id],
        (err, results) => {
            if(err) console.error(err);
            else {
                if(results.length !== 1) {
                    res.status(500).json(util.getError("Studentenhuis bestaat niet"));
                    return;
                }

                let huis = new Studentenhuis(id, results[0]['Naam'], results[0]['Adres'], results[0]['UserID']);
                res.locals.huis = huis;
                return next();
            }
        });
});

router.get('/:id?', (req, res) => {
    const id = req.params.id;

    console.log(res.locals.huis);

    console.log("Studentenhuis request from user " + res.locals.user['Voornaam'] + ' ' + res.locals.user['Achternaam']);
    if(!id) {
        db.query("SELECT * FROM studentenhuis", (err, result) => {
            if (err) console.error(err);
            res.json(result);
        })
    } else {
        db.query("SELECT * FROM studentenhuis WHERE id = ? LIMIT 1", [id], (err, result) => {
            if (err) console.error(err);
            if(result.length !== 1) {
                res.status(404).json(util.getError("HuisId bestaat niet"));
            } else {
                res.json(result[0]);
            }
        })
    }
});

module.exports = router;


