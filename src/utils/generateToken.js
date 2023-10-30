var jwt = require('jsonwebtoken');

module.exports.generateToken = (payLoad) => {
    let token = jwt.sign(payLoad, process.env.JWT_KEY)
    return token
}