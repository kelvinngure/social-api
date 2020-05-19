const express = require("express")
const app = express()
const router = express.Router()
const cors = require("cors")
const db = require("../Connection")

// routing to "/users"

router.route("/")
    .get((req, res) => {
        const users = `SELECT * FROM users`
        db.query(users, (error, result) => {
                        if (error) console.log(error)
                        res.setHeader('Content-Type', 'application/json');
                        res.json(result)
                })
    })

//register users
router.route("/register")
    .post((req, res) => {
        const fname = req.body.fname
        const lname = req.body.lname
        const email = req.body.email
        const ts = req.body.ts
        const pwd = req.body.pwd

        const creator = `INSERT INTO users(email, firstName, lastName, create_date, password) values ("${email}", "${fname}", "${lname}", "${ts}", "${pwd}")`
        db.query(creator, (error, result) => {
                        if (error) console.log(error)
                        console.log(result)
                })
        res.setHeader('Content-Type', 'text/plain');
        res.send(`Account created. Welcome to Boards ${fname}`)
})

//authenticate user login
router.route("/authenticate")
    .post((req, res) => {
        console.log(req.body)
        const email = req.body.email
        const pwd = req.body.pwd

        const checker = `SELECT * FROM users WHERE password = "${pwd}" AND email = "${email}"`
        db.query(checker, (error, result) => {
                        if (error){
                            console.log(error)
                        }

                        if (result.length !== 0){
                            res.setHeader('Content-Type', 'text/plain');
                            res.send(`Welcome back`)
                        }else{
                            res.setHeader('Content-Type', 'text/plain');
                            res.send(`There's a problem with your login details`)
                        }
                        
                })
                
})




module.exports = router;
    





