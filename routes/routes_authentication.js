// API - Version 1
const express = require('express');
const router = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');

router.post('/login', (req, res) => {
    const email = req.body;
    console.log(email);
    console.log(password);

    db.query("SELECT * FROM user WHERE Email = ? AND Password = ? LIMIT 1", [email, password], (err, result, fields) => {
        if(err) console.error(err);
        if(result.length !== 1)
        {
            res.status(412).json(util.getError("Invalid credentials"));
        }
        else
        {
            res.status(200).json({
                "email" : result[0]['Email'],
                "password" : result[0]['Password']
            })
        }
    });

    const id = req.params.id;
    if(!id) {
        db.query("SELECT * FROM studentenhuis", (err, result, fields) => {
            if (err) console.error(err);
            resp.json(result);
        })
    } else {
        db.query("SELECT * FROM studentenhuis WHERE id = ? LIMIT 1", [id], (err, result, fields) => {
            if (err) console.error(err);
            if(result.length !== 1) {
                resp.status(404).json(util.getError("HuisId bestaat niet"));
            } else {
                resp.json(result);
            }
        })
    }
});


module.exports = router;


