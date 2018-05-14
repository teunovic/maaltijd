// API - Version 1
const express   =       require('express');
const router    =       express.Router();


router.get('/maaltijd', (req, resp) => {
    resp.json({
        'msg': 'test maaltijd'});
});

module.exports = router;