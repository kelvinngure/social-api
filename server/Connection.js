const mysql = require("mysql")

const conn = mysql.createPool({
    connectionLimit : 100,
    host: "us-cdbr-east-05.cleardb.net",
    user: "be885e9162bb49",
    password: "5b135a84",
    database: "heroku_29581636a3a70c7"  
})
 

module.exports = conn
