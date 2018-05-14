// API - Version 1
const express = require('express');
const router = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE Email = ? AND Password = ? LIMIT 1", [email, password], (err, result, fields) => {
        if(err) console.error(err);
        if(result.length !== 1)
        {
            res.status(412).json(util.getError("Invalid credentials"));
        }
        else
        {
            let newToken = "2134I@U#HO@2o";
            res.status(200).json({
                "email" : result[0]['Email'],
                "token": newToken
            }).end();
            db.query("UPDATE user SET token = ? WHERE Id = '")
        }
    });

});


module.exports = router;


