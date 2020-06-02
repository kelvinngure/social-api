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



// routing to "/users"

router.route("/", )
    .get((req, res) => {
        const users = `SELECT * FROM users`
        db.query(users, (error, result) => {
                        if (error) res.send("error in my db ...")
                        res.setHeader('Content-Type', 'application/json');
                        res.send(result)
                        
                })
                
    })

//register users
router.route("/register")
    .post( async (req, res) => {
        try{
            // hash the password 
            const salt = await bcrypt.genSalt()
            const hashedPWD = await bcrypt.hash(req.body.pwd, salt)

            const User = {
                email : req.body.email,
                fname : req.body.fname,
                lname : req.body.lname,
                ts: req.body.ts,
                pwd: hashedPWD  
            }

            const payload = {
                "email" : `${User.email}`,
                "fname" : `${User.fname}`
            }

            // user creation query
            const creator = `INSERT INTO users(email, firstName, lastName, createDate, password) values ("${User.email}", "${User.fname}", "${User.lname}", "${User.ts}", "${User.pwd}")`
            
            db.query(creator, (error, result) => {
                            if (error) res.send("error while registering")
                            else{
                                //jwt
                                const token = jwt.sign(payload, key, ((err, token)=> {
                                    if (err) {console.log(err)}
                                    else{console.log(`jwt created ${token}`)
                                    
                                    const refreshToken = hat()
                                    // return response 
                                    res.setHeader('Content-Type', 'application/json');
                                    res.send({"success":`welcome to boards ${User.fname}`, 
                                    "accessToken":`${token}`, 
                                    "refreshToken": `${refreshToken}`})}
                                }))
                                console.log(`Account created. Welcome to Boards ${User.fname}`)
                                
                            }
                            
                    })
        }
        catch(e){(e) => console.log(e)}
        
})

//authenticate user login
router.route("/login")
    .post(async (req, res) => {
        // LATER: add functionality  to check if email exists first; response to user shouldn't explicitly state that the email doesn't exist
        try{
            const findUser = `SELECT * FROM users where email = "${req.body.email}"`

            
            // LATER: add functionality for when user does not exist

            const checked_pwd = await db.query(findUser, async (err, result) => {
                if (err) {// when mysql returns an error
                    console.log(err)

                }
                else{// when mysql returns data
                    const payload ={
                        email: result[0].email,
                        fname: result[0].firstName
                    }


                    if (result.length !== 0 ) {
                        // what to do when the email does exist in the database 
                        const checkPWD = await bcrypt.compare(req.body.pwd, result[0].password)
                        if(checkPWD){ // when the password is correct
                            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, ((err, token)=> {
                                res.status(200).send({"success":"welcome back to boards","token":`${token}`})}
                            )
                            )
                        }
                        
                        else{ // when the password is incorrect
                        res.status(204).send({ "code":204,"error":"The login details were incorrect"})
                        }
                    }
                    else{// what to do when email doesn't exist in database
                        console.log("email no exist")
                        res.status(204).send({ "code":204,"error":"The login details were incorrect"})
                    }
                }
                
            })
        } catch(e){(e) => {console.log(e)}}       
})




module.exports = router;
    





