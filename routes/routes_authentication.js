// API - Version 1
const express = require('express');
const router = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');
const auth = require('../auth/authentication.js');


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
            let newToken = auth.encodeToken(result[0]['Email']);
            res.status(200).json({
                "token": newToken,
                "email" : result[0]['Email']
            }).end();
            db.query("UPDATE user SET token = ? WHERE Id = '")
        }
    });

});
router.post('/register', (req, res) => {
    // TODO: Registration
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO `user` (Voornaam, Achternaam, Email, Password) VALUES (?, ?, ?, ?)", [firstname, lastname, email, password]);
        res.status(200).json({
            "token": auth.encodeToken([email]),
            "email": email
        });
});
module.exports = router;


