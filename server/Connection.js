const mysql = require("mysql")

const conn = mysql.createConnection({
    host: "",
    port: 3306,
    user: "",
    password: "",
    database: ""  
})
 

module.exports = conn
