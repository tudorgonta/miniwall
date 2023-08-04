const jsonwebtoken = require('jsonwebtoken')
// A middleware function called verifyToken that takes in req, res, and next as parameters
// In the function, get the token from the header
// If there is no token, return res.status(401).send({message:'Access denied'})
// If there is a token, verify the token using jsonwebtoken.verify()
// If the token is invalid, return res.status(400).send({message:'Invalid token'})
// If the token is valid, set req.user to the payload of the token
// Call next()
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).send({message:'Access denied'})
    try {
        const verified = jsonwebtoken.verify(token, process.env.JWT_TOKEN)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send({message:'Invalid token'})
    }
}
module.exports = verifyToken
