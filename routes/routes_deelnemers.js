// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');



//GET-requests || Deelnemers

router.get('/:id/maaltijd/:maaltijdid/deelnemers', (req, resp) => {
    console.log("Deelnemers GET-request from user " + resp.locals.user['Voornaam'] + " " + resp.locals.user['Achternaam'] + " with UserID " + resp.locals.user['ID'])

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

//POST-requests || Deelnemers


router.post('/:id/maaltijd/:maaltijdid/deelnemers', (req, resp) => {

    console.log("Deelnemers POST-request from user " + resp.locals.user['Voornaam'] + " " + resp.locals.user['Achternaam'] + " with UserID " + resp.locals.user['ID']);

    const id = req.params.id;
    const maaltijdid= req.params.maaltijdid;

    const query = {
        sql: 'INSERT INTO `deelnemers` (UserID, StudentenhuisID, MaaltijdID) VALUES (?, ?, ?)',
        values: [resp.locals.user['ID'], id, maaltijdid],
        timeout: 2000
    };
    console.log('QUERY: ' + query.sql);
    db.query( query, (error, rows, fields) => {
        if (error) {
            resp.status(500).json(error.toString())
            //TODO: Send error (duplication is still a thing)

        } else {
            resp.status(200);
        }
    });
    console.log("User " + resp.locals.user['Voornaam'] + " " + resp.locals.user['Achternaam'] + " with UserID " + resp.locals.user['ID'] + " successfully applied for meal " +
        maaltijdid + " in student house with ID " + id);
    db.query("SELECT Voornaam, Achternaam, Email FROM `user` WHERE ID = ?", [resp.locals.user['ID']], (err, result, fields) =>{
        if (err) {
            console.error(err);
            //TODO: Send error
        }
        else{
            resp.status(200).json(result[0]);
        }
    });
});




module.exports = router;