const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader == null) {
        return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err)
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user;
        next()
    })
}

module.exports = authenticateToken;
