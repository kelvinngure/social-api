const mysql = require("mysql")

const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: ""  
})
 

module.exports = conn