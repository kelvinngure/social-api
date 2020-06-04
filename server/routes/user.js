require('dotenv').config()
const express = require("express")
const app = express()
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcryptjs")
const hat = require('hat')
const db = require("../Connection")
const jwt = require('jsonwebtoken')

const authorize = require("../middleware/authorize")
const key = process.env.ACCESS_TOKEN_SECRET


// routing to "/user"
router.route("/")
    .get((req, res) => {
        res.send("IN USER")      
    })

// GET SPECIFIC USER
router.route("/:id")
    .get((req, res) => {
        userId = req.params.id
        const user = `SELECT * FROM users WHERE idusers = ${userId}`

        db.query(user, (error, result) => {
            if (error) console.log("selecting user error")
            userCred = {
                id: result[0].idusers,
                email: result[0].email,
                fname: result[0].firstName,
                lname: result[0].lastName,
            }
            res.json(userCred)
        })      
    })



module.exports = router;
    






