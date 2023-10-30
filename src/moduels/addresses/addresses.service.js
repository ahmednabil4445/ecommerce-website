const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const userModel = require('../../../databases/models/user.model')

module.exports.addToAddresses = catchAsyncError(async (req, res, next) => {
    let Result = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { address: req.body } }, { new: true });
    if (!Result) {
        return next(new AppError(`Document Not Found`, 404))
    }
    res.json({ message: 'Added Addressess Success', Result: Result.address })
})
module.exports.removeFromAddresses = catchAsyncError(async (req, res, next) => {
    let Result = await userModel.findByIdAndUpdate(req.user._id, { $pull: { address: { _id: req.body.address } } }, { new: true });
    if (!Result) {
        return next(new AppError(`Document Not Found`, 404))
    }
    res.json({ message: 'Removed Addressess Success', Result: Result.address })
})

module.exports.getAllUserAdressess = catchAsyncError(async (req, res, next) => {
    let Result = await userModel.findOne({ _id: req.user._id }).populate('address');
    if (!Result) {
        return next(new AppError(`Document Not Found`, 404))
    }
    res.json({ message: 'This All User Addressess', Result: Result.address })
})