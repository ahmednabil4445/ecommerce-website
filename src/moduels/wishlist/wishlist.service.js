const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const userModel = require('../../../databases/models/user.model')

module.exports.addToWishList = catchAsyncError(async (req, res, next) => {
    const { product } = req.body
    let Result = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: product } }, { new: true });
    if (!Result) {
        return next(new AppError(`Document Not Found`, 404))
    }
    res.json({ message: 'Added To WishList', Result: Result.wishList })
})
module.exports.removeFromWishList = catchAsyncError(async (req, res, next) => {
    const { product } = req.body
    let Result = await userModel.findByIdAndUpdate(req.user._id, { $pull: { wishList: product } }, { new: true });
    if (!Result) {
        return next(new AppError(`Document Not Found`, 404))
    }
    res.json({ message: 'Success Removed From WishList', Result: Result.wishList })
})

module.exports.getAllUserWishList = catchAsyncError(async (req, res, next) => {
    let Result = await userModel.findOne({ _id: req.user._id }).populate('wishList');
    if (!Result) {
        return next(new AppError(`Document Not Found`, 404))
    }
    res.json({ message: 'This All User WishList', Result: Result.wishList })
})