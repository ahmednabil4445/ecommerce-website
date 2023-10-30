const reviewModel = require('../../../databases/models/review.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createReview = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user._id;
    let isReview = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    if (isReview) return next(new AppError(`You Created A Review Before`, 409))
    let Review = new reviewModel(req.body)
    await Review.save();
    res.status(200).json({ message: 'Create Review Success', Review })
})


module.exports.getAllReviews = catchAsyncError(async (req, res) => {
    let Reviews = await reviewModel.find({})
    res.json({ message: 'this is All Reviews', Reviews })
})

module.exports.getReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Review = await reviewModel.findById(id)
    if (!Review) {
        return next(new AppError(`Review Not Found`, 404))
    }
    res.json({ message: 'Success', Review })
})


module.exports.updateReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Review = await reviewModel.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });
    if (!Review) {
        return next(new AppError(`Review Not Found OR Not Authorized`, 404))
    }
    res.json({ message: 'Updated Review', Review })
})

module.exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Review = await reviewModel.findByIdAndDelete(id);
    if (!Review) {
        return next(new AppError(`Review Not Found`, 404))
    }
    res.json({ message: 'Deleted Review', Review })
})