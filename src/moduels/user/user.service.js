// const userModel = require('../../../databases/models/user.model');
// const bcrypt = require('bcrypt');
// const { generateToken } = require('../../utils/generateToken');
// const { schemaSignin, schemaSingup } = require('./user.validation');
// // ******************************************

// // ******************************************
// module.exports.signup = async (req, res) => {
//     const { name, email, password, age, role } = req.body
//     const user = await userModel.findOne({ email });
//     if (user) {
//         res.json({ message: 'E-mail Aleardy Exist' })
//     } else {
//         bcrypt.hash(password, Number(process.env.ROUND), async function (err, hash) {
//             const users = await userModel.insertMany({ name, role, email, password: hash, age })
//             res.json({ message: "Success Signup", users })
//         })
//     }


// }

// module.exports.signin = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (user) {
//         const match = await bcrypt.compare(password, user.password)
//         if (match) {
//             // *****************************************************
//             let token = generateToken({ name: user.name, role: user.role, userId: user._id })
//             // let token = jwt.sign({ name: user.name, role: user.role, userId: user._id }, 'SKEY')
//             // *****************************************************
//             res.json({ message: "Success Signin", token })
//         } else {
//             res.json({ message: 'password in-correct' })
//         }

//     } else {
//         res.json({ message: 'E-mail Not Registered' })
//     }

// }


// *****************************************************************************************************************************
const userModel = require('../../../databases/models/user.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const ApiFeatuers = require('../../utils/ApiFeatuers')


module.exports.createUser = catchAsyncError(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) next(new AppError('E-mail Aleardy Exist', 409))
    let User = new userModel(req.body)
    await User.save();
    res.status(200).json({ message: 'Create User Success', User })
})


module.exports.getAllUsers = catchAsyncError(async (req, res) => {
    let apiFeatuers = new ApiFeatuers(userModel.find(), req.query).paginate().filter().serach().selectFields().sort()
    let Users = await apiFeatuers.mongooseQuery
    res.json({ message: 'this is All Users', page: apiFeatuers.page, Users })
})

module.exports.getUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let User = await userModel.findById(id)
    if (!User) {
        return next(new AppError(`User Not Found`, 404))
    }
    res.json({ message: 'Success', User })
})


module.exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let User = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!User) {
        return next(new AppError(`User Not Found`, 404))
    }
    res.json({ message: 'Updated User', User })
})

module.exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let User = await userModel.findByIdAndDelete(id);
    if (!User) {
        return next(new AppError(`User Not Found`, 404))
    }
    res.json({ message: 'Deleted User', User })
})


module.exports.changePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    req.body.passwordChangedAt =Date.now()
    let User = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!User) {
        return next(new AppError(`User Not Found`, 404))
    }
    res.json({ message: 'Password Changed Successfully' , User })
})