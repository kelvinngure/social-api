const express = require("express")
const app = express()
// const conn = require('./Connection')
const cors = require("cors")
const bodyParser = require('body-parser');
const userRoute = require("./routes/usersRoute")
const feedRoute = require("./routes/feedRoute")

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// USE ROUTES
app.use(cors())
app.use("/users", userRoute)
app.use("/feed", feedRoute)

// MAIN PAGE
app.get("/", (req, res) => {res.send("BOARDS")})



//CONNECTION PORT
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`server running on ${port}`)
})



















//

// // DB VARIABLES 
// const table_users = "users" 

// // QUERIES
// const select_all = `SELECT * FROM ${table_users}`

// ROUTES 
// app.use("/users", )


// // URLs GET

// app.get("/users", cors(), (req, res) => {
    
//     conn.query(select_all, (error, result) => {
//         if (error) throw error
//         res.setHeader('Content-Type', 'text/plain');
//         console.log(JSON.stringify(result[0].name))
//         res.status(200).send(result)
//     })
    
// })

// // URLs POST

// app.get("/register", cors(), (req, res) => {
    
//     conn.query(select_all, (error, result) => {
//         if (error) throw error
//         res.setHeader('Content-Type', 'text/plain');
//         console.log(result)
//         res.status(200).send(result)
//     })
    
// })



