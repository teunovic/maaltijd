// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');



//GET-requests || Maaltijd

router.get('/:id?/maaltijd', (req, resp) => {
    const id = req.params.id;
    db.query("SELECT Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ?", [id], (err, result, fields) => {
        if(err) {
            console.error(err);
            resp.status(404).json(util.getError("HuisId bestaat niet"));
        }
        resp.status(200).json(result);
    });
});


router.get('/:id?/maaltijd/:maaltijdId?', (req, resp) => {
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


router.post('/:id?/maaltijd', (req, res, next) => {

    const id = req.params.id;
    let maaltijd = req.body;

    const query = {
        sql: 'INSERT INTO `maaltijd`(Naam, Beschrijving, Ingredienten, Allergie, Prijs) VALUES (?, ?, ?, ?, ?)',
        values: [maaltijd.naam, maaltijd.beschrijving, maaltijd.ingredienten, maaltijd.allergie, maaltijd.prijs],
        timeout: 2000
    };

    console.log('QUERY: ' + query.sql);

    db.query( query, (error, rows, fields) => {
        if (error) {
            res.status(500).json(error.toString())
        } else {
            res.status(200).json(rows)
        }
    })
    //res.status(200).json('ok')

});


module.exports = router;