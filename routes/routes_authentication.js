// API - Version 1
const express = require('express');
const router = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');
const auth = require('../auth/authentication.js');


router.post('/login', (req, res, next) => {
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
            console.log(result[0]);
            let newToken = auth.encodeToken(result[0]['ID']);
            res.status(200).json({
                "token": newToken,
                "email" : result[0]['Email']
            }).end();
        }
    });

});
router.post('/register', (req, res, next) => {
    console.log("Checking registration");
    // TODO: Registration
    const firstname = req.body.firstname || '';
    const lastname = req.body.lastname || '';
    const email = req.body.email || '';
    const password = req.body.password || '';

    // Checking if first- and last name are valid
    if(!firstname.match(/\w+(-\w+)?/))
    {
        res.status(412).json(util.getError("First nam")).end();
        return;
    }
    if(!lastname.match(/\w+(-\w+)?/))
    {
        res.status(412).json(util.getError("Something went wrong with the database insert")).end();
        return;
    }

    // Checking if the email is unique
    db.query("SELECT ID FROM user WHERE Email = ? LIMIT 1", [email], )

    db.query("INSERT INTO `user` (Voornaam, Achternaam, Email, Password) VALUES (?, ?, ?, ?)",
        [firstname, lastname, email, password],
        (err, result, fields) => {
            if(err) {
                console.error(err);
                res.status(412).json(util.getError("Something went wrong with the database insert", -1)).end();
                return;
            }
            else {
                const uid = result.insertId;
                res.status(200).json({
                    "token": auth.encodeToken(),
                    "email": email
                }).end();
            }
        });
});
module.exports = router;


