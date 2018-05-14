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
    if(!(typeof firstname === 'string') || firstname == '' || !firstname.match(/\w+(-\w+)?/))
    {
        res.status(412).json(util.getError("First name is invalid", 1)).end();
        return;
    }
    if(!(typeof lastname === 'string') || lastname == '' || !lastname.match(/\w+(-\w+)?/))
    {
        res.status(412).json(util.getError("Last name is invalid", 2)).end();
        return;
    }

    if(!(typeof email === 'string') || email == '' || !email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i))
    {
        res.status(412).json(util.getError("Email is invalid", 3)).end();
        return;
    }

    if(!(typeof password === 'string') || password == '' || password.length < 6 || password.length > 64)
    {
        res.status(412).json(util.getError("Password must be between 6 and 64 characters", 4)).end();
        return;
    }

    // Checking if the email is unique
    db.query("SELECT ID FROM user WHERE Email = ? LIMIT 1", [email], (_err, _res) => {
        if(_err || _res.length === 1) {
            console.error(_err || 'Email taken');
            res.status(412).json(util.getError("Email is taken", 5)).end();
            return;
        }
        else {
            // Email is unique, let's insert
            db.query("INSERT INTO `user` (Voornaam, Achternaam, Email, Password) VALUES (?, ?, ?, ?)",
                [firstname, lastname, email, password],
                (err, result) => {
                    if(err) {
                        console.error(err);
                        res.status(412).json(util.getError("Something unexpected went wrong with the database insert", 6)).end();
                        return;
                    }
                    else {
                        const uid = result.insertId;
                        res.status(200).json({
                            "token": auth.encodeToken(uid),
                            "email": email
                        }).end();
                    }
                }
            );
        }
    })

});
module.exports = router;


