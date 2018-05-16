const dbconf = require('./dbconfig');
const mysql = require('mysql');

let settings = {
    host: process.env.DB_HOST || dbconf.dbServer,
    user: process.env.DB_USER || dbconf.dbUsername,
    password: process.env.DB_PASSWORD || dbconf.dbPassword,
    database: process.env.DB_DATABASE || dbconf.dbSchema
};

console.log("Starting connection...");
console.log(settings);

let con = mysql.createConnection(settings);

con.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = con;