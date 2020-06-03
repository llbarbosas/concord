const { JWT_SECRET = 'secret' } = process.env

const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' })
    }

    const [, token] = authHeader.split(" ")

    return promisify(jwt.verify)(token, JWT_SECRET)
        .then(user => {
            req.user = user
            next()
        })
        .catch(error => res.status(401).json({ error: 'Invalid token' }))
}