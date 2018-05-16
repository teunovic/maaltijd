// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');



//GET-requests || Deelnemers

router.get('/:id/maaltijd/:maaltijdid/deelnemers/?', (req, res) => {
    const user = res.locals.user;
    const maaltijd = res.locals.maaltijd;

    db.query("SELECT * from `view_deelnemers` WHERE MaaltijdID = ?", [maaltijd.id], (err, result, fields) => {
        if(err) {
            console.error(err);
            res.status(404).json(util.getError("Niet gevonden (huisId of maaltijdId bestaat niet", 1));
            return;
        }
        res.status(200).json(result);
    });
});

//POST-requests || Deelnemers




module.exports = router;