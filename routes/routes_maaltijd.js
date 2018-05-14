// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');

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

module.exports = router;