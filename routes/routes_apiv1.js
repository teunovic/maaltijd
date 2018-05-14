

// API - Version 1
const express   =       require('express');
const router    =       express.Router();



// Fall back, display some info


router.get('*', (req, res) => {
    res.status(200);
    res.json({
        "description": "Project Studentenhuis API version 1."
    });
});

// app.get('/maaltijd', (req, resp) => {
//     resp.json({
//         'msg': 'test'});
// });

module.exports = router;


