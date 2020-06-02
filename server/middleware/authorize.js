// this middleware takes in a jwt token and verifies it. it will be used for authorization when accessing protected routes 

const jwt = require("jsonwebtoken")
const key = process.env.ACCESS_TOKEN_SECRET

// this is a middleware so it  will have access to the request object of the main URL, it is also able to give a response.
// next() allows it to carry on to the next middleware or to the callback
// the request must have a header with the authorization bearer holding the token for protected routes.
// provide specific modal on mobile app when user tries to access protected pages
const authorize = (req, res, next) => {
    try{
        // get the token from bearer
        const token = req.body.authorization.split(" ")[1]

        // verify token the send appropriate response
        jwt.verify(token, key, (err, info) => {
                if (err) {res.status(401).send({"message": "access denied"})}
                else {
                    res.json({message: "token ok"})
                    next()
                }
           })

    }
    catch(e){
        return res.status(401).json({
            message: `${e}`
        })
    }
}

module.exports = authorize