

// API - Version 1
const express   =       require('express');
const router    =       express.Router();
const db = require('../db/mysql-connector');





router.get('/studentenhuis:id?', (req, resp) => {

    const id = req.params.id;

    if( year === '' ) {
        result = db;
    } else {
        result = db.filter(function (item) {
            return (item.info.year === year);
        });
    }
    resp.json({
        'msg': 'test studentenhuis'});
});


//
// router.get('/studentenhuis/', (req, resp) => {
//     resp.json({
//         'msg': 'test studentenhuis'});
// });

module.exports = router;


