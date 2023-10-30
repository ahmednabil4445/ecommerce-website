var jwt = require('jsonwebtoken');
module.exports.userAuth = async (req, res , next) => {
    const token  = req.header('token')
    jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
        if (err) {
            res.json({ message: 'Token Not Provided', err })
        } else {
            req.userId = decoded.userId
            next()
        }
    })
}