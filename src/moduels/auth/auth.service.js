const userModel = require('../../../databases/models/user.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const ApiFeatuers = require('../../utils/ApiFeatuers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


module.exports.signup = async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) next(new AppError('E-mail Aleardy Exist', 409))
    let User = new userModel(req.body)
    await User.save();
    res.status(200).json({ message: 'Signup Success', User })
}

module.exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            // *****************************************************
            // let token = generateToken({ name: user.name, role: user.role, userId: user._id })
            let token = jwt.sign({ name: user.name, role: user.role, userId: user._id }, 'SKEY')
            // *****************************************************
            res.json({ message: "Success Signin", token })
        } else {
            res.json({ message: 'password in-correct' })
        }

    } else {
        res.json({ message: 'E-mail Not Registered' })
    }

}


module.exports.protectedRoutes = async (req, res, next) => {
    let { token } = req.headers;

    if (!token) return next(new AppError('Token Not Provided', 401))
    let decoded = await jwt.verify(token, 'SKEY');

    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError('In-valid Token', 401))

    if (user.passwordChangedAt) {
        let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (changePasswordDate > decoded.iat) return next(new AppError('In-valid Token', 401))
    }
    req.user = user
    next()
}



module.exports.allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('Your are not autherized this route , You are ' + req.user.role, 401))
        next()
    })
}