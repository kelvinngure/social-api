const express = require("express")
const app = express()

const db = require("./Connection")
const cors = require("cors")
const logger = require("morgan")


// ROUTES
const users = require("./routes/usersRoute")
const sessions = require("./routes/sessions")
const posts = require("./routes/posts")

// MIDDLEWARE
app.use(cors())
app.use(logger('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// MAIN
app.get("/", (req, res) => {res.send("BOARDS")})

// ROUTERS
app.use("/users", users)
app.use("/sessions", sessions)
app.use("/posts", posts)



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



