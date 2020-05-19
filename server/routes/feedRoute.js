const express = require("express")
const app = express()
const router = express.Router()
const cors = require("cors")
const db = require("../Connection")


// routing to "/feed"
router.route("/")
    .get((req, res) => {
        res.send("NEWSFEED GET")
    })





module.exports = router;
    





