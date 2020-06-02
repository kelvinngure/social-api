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
    .get((req, res) => {
        res.send("IN POSTS")      
    })

// GET ALL POSTS
router.route("/all")
    .get(authorize, (req, res) => {
        const allPost = `SELECT * FROM posts`

        db.query(allPost, (error, result) => {
            if (error) console.log("selecting all post error")
            res.json(result)
        })      
    })

// MAKE NEW POST
router.route("/new")
    .post(authorize, (req, res) => {
        const post = {
            userId: req.body.payload.userId,
            ts: req.body.payload.ts,
            title: req.body.payload.title,
            content: req.body.payload.content
        }
        const newPost = `INSERT INTO posts (userId, create_date, title, content) VALUES ("${post.userId}", "${post.ts}", "${post.title}", "${post.content}")`
        
        db.query(newPost, (error, result) => {
            if (error) res.status(401).json({"message": "post creation error"})
            res.json({"message": "post created"})
        })
    })


module.exports = router;
    






