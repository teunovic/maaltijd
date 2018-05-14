const dbconf = require('./dbconfig');
const mysql = require('mysql');

let con = mysql.createConnection({
    host: dbconf.dbServer,
    user: dbconf.dbUsername,
    password: dbconf.dbPassword,
    database: dbconf.dbSchema
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
    con.query("SELECT * FROM maaltijd", function (err, result, fields) {
        if (err) throw err;
        console.log(fields);
    });
});