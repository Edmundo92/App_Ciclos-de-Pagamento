const jwt = require('jsonwebtoken') 
const env = require('../.env')

module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token ||
            req.headers['authorization']
        if (!token) {//se o token n existir
            return res.status(403).send({ errors: ['No token provided.'] })
        }
        //caso exista eu verifico se é válido
        jwt.verify(token, env.authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                })
            } else {
                //decodifica o token
                //req.decoded = decoded
                next()
            }
        })
    }
}