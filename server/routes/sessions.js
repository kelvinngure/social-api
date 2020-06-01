require('dotenv').config()
const express = require("express")
const app = express()
const router = express.Router()
const cors = require("cors")
const db = require("../Connection")



// routing to "/sessions"

router.route("/")
    .get((req, res) => {
        const users = `SELECT * FROM sessions`
        db.query(users, (error, result) => {
                        if (error) res.send("error in my sessions db ...")
                        res.setHeader('Content-Type', 'application/json');
                        res.send(result)
                        
                })
                
    })
    


module.exports = router;
    





