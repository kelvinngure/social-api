const express = require("express")
const app = express()
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("../Connection")

// routing to "/users"

router.route("/")
    .get((req, res) => {
        const users = `SELECT * FROM users`
        db.query(users, (error, result) => {
                        if (error) console.log(error)
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

            // create the user
            const creator = `INSERT INTO users(email, firstName, lastName, create_date, password) values ("${req.body.email}", "${req.body.fname}", "${req.body.lname}", "${req.body.ts}", "${hashedPWD}")`
            db.query(creator, (error, result) => {
                            if (error) console.log(error)
                            console.log(`successful insert`)
                            console.log(`Account created. Welcome to Boards ${req.body.fname}`)
                    })
            res.setHeader('Content-Type', 'text/plain');
            res.send(`Account created. Welcome to Boards ${req.body.fname}`)
        }
        catch(e){(e) => console.log(e)}
        
})

//authenticate user login
router.route("/authenticate")
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
                    if (result.length !== 0 ) {
                        // what to do when the email does exist in the database 
                        const checkPWD = await bcrypt.compare(req.body.pwd, result[0].password)
                        if(checkPWD){ // when the password is correct
                            res.status(200).send({"success":"welcome back to boards"})
                        }
                        else{ // when the password is incorrect
                        res.status(204).send({ "code":204,"success":"The login details were incorrect"})
                        }
                    }
                    else{// what to do when email doesn't exist in database
                        console.log("email no exist")
                        res.status(204).send({ "code":204,"success":"The login details were incorrect"})
                    }
                }
                
            })
        } catch(e){(e) => {console.log(e)}}       
})




module.exports = router;
    





