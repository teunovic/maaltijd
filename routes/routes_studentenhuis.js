

// API - Version 1
const express   =       require('express');
const router    =       express.Router();




router.get('/studentenhuis', (req, resp) => {
    resp.json({
        'msg': 'test'});
});

module.exports = router;


