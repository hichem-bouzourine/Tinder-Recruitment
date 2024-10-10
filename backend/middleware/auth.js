const jwt = require('jsonwebtoken');

const authenticateToke = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader == null) {
        return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, res) => {
        console.log(err)
        if (err) {
            return res.sendStatus(403)
        }
        req.res = res
        next()
    })
}

module.exports = authenticateToke;
