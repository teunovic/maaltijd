// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');



//GET-requests || Maaltijd

router.get('/:id/maaltijd', (req, resp) => {
    const id = req.params.id;
    db.query("SELECT Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ?", [id], (err, result, fields) => {
        if(err) {
            console.error(err);
            resp.status(404).json(util.getError("HuisId bestaat niet"));
        }
        resp.status(200).json(result);
    });
});


router.get('/:id/maaltijd/:maaltijdId?', (req, resp) => {
    const id = req.params.id;
    const maaltijdid = req.params.maaltijdId;
    db.query("SELECT Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?", [id, maaltijdid], (err, result, fields) => {
        if(err) {
            console.error(err);
            resp.status(404).json(util.getError("HuisId bestaat niet"));
        }
        resp.status(200).json(result);
    });
});

//POST-requests || Maaltijd


router.post('/:id/maaltijd', (req, res, next) => {

    const id = req.params.id;

    const naam = req.body.naam || '';
    const beschrijving = req.body.beschrijving || '';
    const ingredienten = req.body.ingredienten || '';
    const allergie = req.body.allergie || '';
    const prijs = req.body.prijs || -1;

    if(typeof naam !== 'string' || naam.length < 2 || naam.length > 32)
    {
        res.status(412).json(util.getError("Naam moet tussen 2 en 32 tekens zijn", 1)).end();
        return;
    }
    if(typeof naam !== 'string' || naam.length < 2 || naam.length > 32)
    {
        res.status(412).json(util.getError("Naam moet tussen 2 en 32 tekens zijn", 1)).end();
        return;
    }
    if(typeof naam !== 'string' || naam.length < 2 || naam.length > 32)
    {
        res.status(412).json(util.getError("Naam moet tussen 2 en 32 tekens zijn", 1)).end();
        return;
    }
    if(typeof naam !== 'string' || naam.length < 2 || naam.length > 32)
    {
        res.status(412).json(util.getError("Naam moet tussen 2 en 32 tekens zijn", 1)).end();
        return;
    }

    const query = {
        sql: 'INSERT INTO `maaltijd`(Naam, Beschrijving, Ingredienten, Allergie, Prijs) VALUES (?, ?, ?, ?, ?)',
        values: [naam, beschrijving, ingredienten, allergie, prijs],
        timeout: 2000
    };

    console.log('QUERY: ' + query.sql);

    db.query(query, (error, rows) => {
        if (error) {
            res.status(500).json(util.getError(error.toString()));
        } else {
            res.status(200).json(rows)
        }
    })

});


module.exports = router;