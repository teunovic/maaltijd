// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');



//GET-requests || Deelnemers

router.get('/:id/maaltijd/:maaltijdid/deelnemers/?', (req, res) => {
    const user = res.locals.user;
    const maaltijd = res.locals.maaltijd;

    db.query("SELECT * from `view_deelnemers` WHERE MaaltijdID = ?", [maaltijd.id], (err, result, fields) => {
        if(err) {
            console.error(err);
            res.status(500).json(util.getError("Interne SQL fout -> " + err, 1));
            return;
        }
        res.json(result);
    });
});

//POST-requests || Deelnemers

router.post('/:id/maaltijd/:mid/deelnemers/?', (req, res) => {
    const user = res.locals.user;
    const huis = res.locals.huis;
    const maaltijd = res.locals.maaltijd;

    db.query("SELECT null FROM deelnemers WHERE UserID = ? AND StudentenhuisID = ? AND MaaltijdID = ? LIMIT 1",
        [user.ID, huis.id, maaltijd.id],
        (err, rows) => {
            if(err) console.error(err);
            else {
                if(rows.length === 1) {
                    res.status(409).json(util.getError("Al aangemeld op deze maaltijd")).end();
                    return;
                }

                db.query("INSERT INTO deelnemers (UserID, StudentenhuisID, MaaltijdID) " +
                    "VALUES (? , ? , ?)", [user.ID, huis.id, maaltijd.id],
                    (err, result) => {
                        if(err) console.error(err);
                        else {
                            res.json({
                                "voornaam": user.firstname,
                                "achternaam": user.lastname,
                                "email": user.email
                            })
                        }
                    }
                );
            }
        }
    );
});

router.delete('/:id/maaltijd/:mid/deelnemers/?', (req, res) => {
    const user = res.locals.user;
    const huis = res.locals.huis;
    const maaltijd = res.locals.maaltijd;

    db.query("SELECT null FROM deelnemers WHERE UserID = ? AND StudentenhuisID = ? AND MaaltijdID = ? LIMIT 1",
        [user.ID, huis.id, maaltijd.id],
        (err, rows) => {
            if(err) console.error(err);
            else {
                if(rows.length !== 1) {
                    res.status(409).json(util.getError("Niet aangemeld op deze maaltijd")).end();
                    return;
                }

                db.query("DELETE FROM deelnemers WHERE UserID = ? AND StudentenhuisID = ? AND MaaltijdID = ?",
                    [user.ID, huis.id, maaltijd.id],
                    (err, result) => {
                        if(err) console.error(err);
                        else {
                            res.json({});
                        }
                    }
                );
            }
        }
    );
});


module.exports = router;