const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) =>{
    if (err) throw err
    console.log("Connesso al DB", process.env.DB_NAME);
})

module.exports = connection