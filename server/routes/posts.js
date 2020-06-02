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



// routing to "/posts"

router.route("/")
    .post(authorize, (req, res) => {
        res.json({
            posts: [{
                    title: "post 1 title",
                    content: "post 1 contentssss"
                    }
            ]
        })
        // const users = `SELECT * FROM posts`
        // db.query(users, (error, result) => {
        //                 if (error) res.send("error in my db ...")
        //                 res.setHeader('Content-Type', 'application/json');
        //                 res.send(result)
                        
        //         })
                
    })




module.exports = router;
    





