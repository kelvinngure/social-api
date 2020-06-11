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
            const uid = `${req.body.lname}_${req.body.fname}${Math.random().toString(36).substr(2, 13)}`

            const User = {
                uid: uid,
                email : req.body.email,
                fname : req.body.fname,
                lname : req.body.lname,
                ts: req.body.ts,
                pwd: hashedPWD  
            }

            const payload = {
                "uid": uid,
                "email" : `${User.email}`,
                "fname" : `${User.fname}`,
                "lname" : `${User.lname}`
            }

            // user creation query
            const creator = `INSERT INTO users(idusers, email, name, createDate, password) values ("${User.uid}", "${User.email}", "${User.fname} ${User.lname}", "${User.ts}", "${User.pwd}")`
            console.log(`${User.fname} ${User.lname}`)
            db.query(creator, (error, result) => {
                            if (error) res.send(error)
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
                                    "refreshToken": `${refreshToken}`,
                                    "user": payload
                                })}
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
                        uid: result[0].idusers,
                        email: result[0].email,
                        fname: result[0].firstName,
                        lname: result[0].lastName
                    }


                    if (result.length !== 0 ) {
                        // what to do when the email does exist in the database 
                        const checkPWD = await bcrypt.compare(req.body.pwd, result[0].password)
                        if(checkPWD){ // when the password is correct
                            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, ((err, token)=> {
                                res.status(200).send({"success":"welcome back to boards",
                                "token":`${token}`,
                                "user": payload
                            })}
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

router.route("/searchUser")
    .post(async (req, res) => {
        try{
            const trimmedQuery = req.body.name.trim()
            const splitQuery = trimmedQuery.split(" ")
            console.log(splitQuery.length)

            let findUser;

            if (splitQuery.length > 1){
                findUser = `SELECT idusers, name FROM users WHERE name LIKE "%${splitQuery[0]}%" OR name LIKE "%${splitQuery[1]}%" `
                
            }else{
                findUser = `SELECT idusers, name FROM users WHERE name LIKE "%${splitQuery[0]}%"`
            }
            

            const userResults = await db.query(findUser, async (err, result) => {
                if (err) {
                    console.log(err)

                }
                else{// when mysql returns data
                    if (result.length !== 0 ) {
                        res.send(result)
                    } 
                    else{ // when the password is incorrect
                        res.send([])
                    }
                }
                
            })
        } catch(e){(e) => {console.log(e)}}       
})





module.exports = router;
    





