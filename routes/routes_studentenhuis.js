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

    if(isNaN(id)) {
        res.status(500).json(util.getError("Ongeldig studentenhuis id")).end();
        return;
    }

    db.query("SELECT v.*, s.UserID FROM view_studentenhuis AS v INNER JOIN studentenhuis AS s ON s.ID = v.ID WHERE v.ID = ? LIMIT 1",
        [id],
        (err, results) => {
            if(err) console.error(err);
            else {
                if(results.length !== 1) {
                    res.status(500).json(util.getError("Studentenhuis bestaat niet")).end();
                    return;
                }

                let huis = new Studentenhuis(id, results[0]['Naam'], results[0]['Adres'], results[0]['UserID'], results[0]['Contact'], results[0]['Email']);
                res.locals.huis = huis;
                return next();
            }
        });
});

router.get('/:id?', (req, res) => {
    const id = req.params.id;
    const huis = res.locals.huis;
    console.log("Studentenhuis request from user " + res.locals.user['Voornaam'] + ' ' + res.locals.user['Achternaam']);
    if(!id || !huis) {
        db.query("SELECT * FROM studentenhuis", (err, result) => {
            if (err) console.error(err);
            res.json(result);
        })
    } else {
        res.json(huis.json).end();
        return;
    }
});

//POST-requests || Studentenhuis


router.post('^/?$', (req, res) => {
    console.log("Studentenhuis post from user " + res.locals.user['Voornaam'] + " " + res.locals.user['Achternaam'] + " with UserID " + res.locals.user['ID'])

    // Checking post body
    let naam = req.body.naam || '';
    let adres = req.body.adres || '';

    if(naam == '' || naam.length > 64 || naam.length < 1) {
        res.status(412).json(util.getError("De naam moet tussen 1 en 64 tekens zijn", 1)).end();
        return;
    }

    if(adres == '' || adres.length > 64 || adres.length < 1) {
        res.status(412).json(util.getError("Het adres moet tussen 1 en 64 tekens zijn", 2)).end();
        return;
    }

    const query = {
        sql: 'INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES (?, ?, ?)',
        values: [naam, adres, res.locals.user['ID']],
        timeout: 2000
    };
    console.log('QUERY: ' + query.sql);

    db.query(query, (error, rows, fields) => {
        if (error) {
            res.status(500).json(util.getError(error.toString(), -1))
        } else {
            db.query("SELECT * FROM view_studentenhuis WHERE ID = ? LIMIT 1",
                [rows.insertId],
                (err, result, fields) => {
                    if (err) console.error(err);
                    res.json(result[0]);
                }
            );

        }
    })
});

module.exports = router;


