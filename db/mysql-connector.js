const mysql = require('mssql');
const config = require('dbconfig');

let db = mysql.createConnection( {
    host: 'localhost',
    user: 'nodeapp',
    password: '70xHywPS9NHy',
    database: 'sakila',
    insecureAuth : true
});

console.log(db.host);

db.connect( (error) => {
    if(error) {
        console.log(error);
        return;
    } else {
        console.log("Connected to " + config.dbServer + ':' + config.dbSchema);
    }
});

module.exports = db;