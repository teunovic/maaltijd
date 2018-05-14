// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');



//GET-requests || Deelnemers

router.get('/:id/maaltijd/:maaltijdid/deelnemers', (req, resp) => {
    const id = req.params.id;
    const maaltijdid = req.params.maaltijdid;
    db.query("SELECT * from `view_deelnemers` WHERE StudentenhuisID = ? AND MaaltijdID = ?", [id, maaltijdid], (err, result, fields) => {
        if(err) {
            console.error(err);
            resp.status(404).json(util.getError("Niet gevonden (huisId of maaltijdId bestaat niet"));
        }
        resp.status(200).json(result);
    });
});




module.exports = router;