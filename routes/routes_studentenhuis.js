// API - Version 1
const express = require('express');
const router = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');
const auth = require('../auth/authentication.js');


//GET-requests || Studentenhuis


router.get('/:id?', (req, resp) => {
    const id = req.params.id;

    console.log("Studentenhuis request from user " + resp.locals.user['Voornaam'] + " " + resp.locals.user['Achternaam'] + "with UserID " + resp.locals.user['ID'])
    if (!id) {
        db.query("SELECT * FROM view_studentenhuis", (err, result, fields) => {
            if (err) console.error(err);
            resp.json(result);
        })
    } else {
        db.query("SELECT * FROM view_studentenhuis WHERE id = ? LIMIT 1", [id], (err, result, fields) => {
            if (err) console.error(err);
            if (result.length !== 1) {
                resp.status(404).json(util.getError("HuisId bestaat niet"));
            } else {
                resp.json(result);
            }
        })
    }
});

//POST-requests || Studentenhuis


router.post('', (req, resp) => {

    console.log("Studentenhuis post from user " + resp.locals.user['Voornaam'] + " " + resp.locals.user['Achternaam'] + " with UserID " + resp.locals.user['ID'])

    let info = req.body;
    const query = {
        sql: 'INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES (?, ?, ?)',
        values: [info.naam, info.adres, resp.locals.user['ID']],
        timeout: 2000
    };
    console.log('QUERY: ' + query.sql);

    db.query( query, (error, rows, fields) => {
        if (error) {
            resp.status(500).json(error.toString())
        } else {
            resp.status(200);
            db.query("SELECT * FROM view_studentenhuis INNER JOIN studentenhuis ON studentenhuis.ID = view_studentenhuis.ID WHERE UserID = ?", [resp.locals.user['ID']], (err, result, fields) => {
                if (err) console.error(err);
                resp.json(result[0]);
            })

        }
    })
});

module.exports = router;


