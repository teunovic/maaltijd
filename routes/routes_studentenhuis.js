

// API - Version 1
const express   =       require('express');
const router    =       express.Router();
const db        =       require('../db/mysql-connection.js');


router.get('/studentenhuis:id?', (req, resp) => {

    const id = req.params.id;
    console.log(id);
    if(!id) {
        db.query("SELECT * FROM studentenhuis", (err, result, fields) => {
            if (err) console.error(err);
            resp.json(result);
        })
    } else {
        db.query("SELECT * FROM studentenhuis", (err, result, fields) => {
            if (err) console.error(err);
            resp.json(result);
            newresult = result.filter(function (item) {
                return (item.info.id === newresult);
            });
        })
    }
});


module.exports = router;


