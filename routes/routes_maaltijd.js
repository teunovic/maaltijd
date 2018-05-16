// API - Version 1
const express   = require('express');
const router    = express.Router();
const db = require('../db/mysql-connection.js');
const util = require('../util.js');
const Maaltijd = require('../classes/Maaltijd.js');


//Check permission of maaltijd is made by user
function hasPermission(r, maaltijd, user) {
    return user.ID == maaltijd.userid || !r.status(409).json(util.getError("Geen toestemming om deze data te wijzigen", 1)).end();
}

router.all('/:id/maaltijd/:maaltijdId*', (req, res, next) => {
    const huis = res.locals.huis;
    const mid = req.params.maaltijdId;

    console.log("Resolving maaltijd...");

    if(isNaN(mid)) {
        res.status(404).json(util.getError("Maaltijd bestaat niet", 3)).end();
        return;
    }

    db.query("SELECT ID, Naam as naam, Beschrijving as beschrijving, Ingredienten as ingredienten, Allergie as allergie, Prijs as prijs, UserID as userid FROM maaltijd WHERE ID = ? AND StudentenhuisID = ? LIMIT 1",
        [mid, huis.id],
        (err, results) => {
            if(err) console.error(err);
            else if(results.length !== 1) {
                res.status(404).json(util.getError("Maaltijd bestaat niet"));
                return;
            } else {
                res.locals.maaltijd = new Maaltijd(results[0]['ID'], results[0]['naam'], results[0]['beschrijving'], results[0]['ingredienten'], results[0]['allergie'], results[0]['prijs'], results[0]['userid']);
                next();
            }
        }
    );
});

//GET-requests || Maaltijd

router.get('/:id/maaltijd/:maaltijdId?', (req, res) => {
    const huis = res.locals.huis;
    const maaltijd = res.locals.maaltijd;

    if(!maaltijd) {
        db.query("SELECT ID, Naam as naam, Beschrijving as beschrijving, Ingredienten as ingredienten, Allergie as allergie, Prijs as prijs FROM maaltijd WHERE StudentenhuisID = ?",
            [huis.id],
            (err, result, fields) => {
                if (err) {
                    console.error(err);
                    res.status(404).json(util.getError("HuisId bestaat niet"));
                    return;
                }
                res.json(result).end();
            }
        );
    } else {
        res.json(maaltijd.json);
        return;
    }
});

//POST-requests || Maaltijd


router.post('/:id/maaltijd', (req, res, next) => {

    const user = res.locals.user;
    const huis = res.locals.huis;

    const naam = req.body.naam || '';
    const beschrijving = req.body.beschrijving || '';
    const ingredienten = req.body.ingredienten || '';
    const allergie = req.body.allergie || '';
    const prijs = req.body.prijs || -1;

    //Errorhandling

    if(typeof naam !== 'string' || naam.length < 2 || naam.length > 32)
    {
        res.status(412).json(util.getError("Naam moet tussen 2 en 32 tekens zijn", 1)).end();
        return;
    }
    if(typeof beschrijving !== 'string' || beschrijving.length < 2 || beschrijving.length > 64)
    {
        res.status(412).json(util.getError("Beschrijving moet tussen 2 en 64 tekens zijn", 2)).end();
        return;
    }
    if(typeof ingredienten !== 'string' || ingredienten.length < 2 || ingredienten.length > 64)
    {
        res.status(412).json(util.getError("Ingredienten moet tussen 2 en 64 tekens zijn", 3)).end();
        return;
    }
    if(typeof allergie !== 'string' || allergie.length < 2 || allergie.length > 32)
    {
        res.status(412).json(util.getError("Allergie moet tussen 2 en 32 tekens zijn", 4)).end();
        return;
    }
    if(isNaN(prijs) || prijs < 0 || prijs > 1000)
    {
        res.status(412).json(util.getError("Prijs moet een getal tussen 0 en 1000 euro zijn", 5)).end();
        return;
    }

    const query = {
        sql: 'INSERT INTO `maaltijd` (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values: [naam, beschrijving, ingredienten, allergie, prijs, user.ID, huis.id],
        timeout: 2000
    };

    console.log('QUERY: ' + query.sql);

    db.query(query, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).json(util.getError(error.toString(), 1));
        } else {

            //Online database had different column names...
            db.query("SELECT ID, Naam as naam, Beschrijving as beschrijving, Ingredienten as ingredienten, Allergie as allergie, Prijs as prijs, StudentenhuisID as huisid FROM maaltijd WHERE ID = ? AND StudentenhuisID = ? LIMIT 1",
                [rows.insertId, huis.id],
                (err, result) => {
                    if(err) {
                        console.error(err);
                        res.status(500).json(util.getError("Internal SQL error -> " + err, 2))
                    }
                    else {
                        res.json(result[0]).end();
                        return;
                    }
                }
            );
        }
    })

});

router.put('/:id/maaltijd/:mid', (req, res) => {
    const user = res.locals.user;
    const huis = res.locals.huis;
    const maaltijd = res.locals.maaltijd;

    if(!hasPermission(res, maaltijd, user)) return;

    const naam = req.body.naam || '';
    const beschrijving = req.body.beschrijving || '';
    const ingredienten = req.body.ingredienten || '';
    const allergie = req.body.allergie || '';
    const prijs = req.body.prijs || -1;

    if(typeof naam !== 'string' || naam.length < 2 || naam.length > 32)
    {
        res.status(412).json(util.getError("Naam moet tussen 2 en 32 tekens zijn", 1)).end();
        return;
    }
    if(typeof beschrijving !== 'string' || beschrijving.length < 2 || beschrijving.length > 64)
    {
        res.status(412).json(util.getError("Beschrijving moet tussen 2 en 64 tekens zijn", 2)).end();
        return;
    }
    if(typeof ingredienten !== 'string' || ingredienten.length < 2 || ingredienten.length > 64)
    {
        res.status(412).json(util.getError("Ingredienten moet tussen 2 en 64 tekens zijn", 3)).end();
        return;
    }
    if(typeof allergie !== 'string' || allergie.length < 2 || allergie.length > 32)
    {
        res.status(412).json(util.getError("Allergie moet tussen 2 en 32 tekens zijn", 4)).end();
        return;
    }
    if(isNaN(prijs) || prijs < 0 || prijs > 1000)
    {
        res.status(412).json(util.getError("Prijs moet een getal tussen 0 en 1000 euro zijn", 5)).end();
        return;
    }

    const query = {
        sql: 'UPDATE `maaltijd` ' +
        'SET Naam = ?, Beschrijving = ?, Ingredienten = ?, Allergie = ?, Prijs = ? ' +
        'WHERE ID = ? LIMIT 1',
        values: [naam, beschrijving, ingredienten, allergie, prijs, maaltijd.id],
        timeout: 2000
    };

    db.query(query, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).json(util.getError(error.toString(), 1));
            return;
        } else {
            db.query("SELECT ID, Naam as naam, Beschrijving as beschrijving, Ingredienten as ingredienten, Allergie as allergie, Prijs as prijs FROM maaltijd WHERE ID = ? AND StudentenhuisID = ? LIMIT 1",
                [maaltijd.id, huis.id],
                (err, result) => {
                    if(err) {
                        console.error(err);
                        res.status(500).json(util.getError("Internal SQL error -> " + err, 2))
                    }
                    else {
                        res.json(result[0]).end();
                        return;
                    }
                }
            );
        }
    })

});

router.delete('/:id/maaltijd/:mid', (req, res) => {
    const user = res.locals.user;
    const huis = res.locals.huis;
    const maaltijd = res.locals.maaltijd;

    if(!hasPermission(res, maaltijd, user)) return;

    db.query("DELETE FROM deelnemers WHERE MaaltijdID = ?", [maaltijd.id], (err, result) => {
        db.query("DELETE FROM `maaltijd` WHERE `maaltijd`.`ID` = ?", [maaltijd.id], (err, result) => {
            if(err) console.error(err);
            else {
                res.json({}).end();
                return;
            }
        });
    });

});


module.exports = router;