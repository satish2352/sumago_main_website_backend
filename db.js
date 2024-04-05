// db.js
const mysql = require('mysql2');
const env = require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MYsql_USER,
    password: process.env.MYsql_PASS,
    database: process.env.MYsql_DB
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

module.exports = db;

