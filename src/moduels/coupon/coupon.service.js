const couponModel = require('../../../databases/models/coupon.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
// **********************************************************************
var QRCode = require('qrcode')

// **********************************************************************

module.exports.createCoupon = catchAsyncError(async (req, res) => {
    let Coupon = new couponModel(req.body)
    await Coupon.save();
    res.status(200).json({ message: 'Create Coupon Success', Coupon })
})


module.exports.getAllCoupons = catchAsyncError(async (req, res) => {
    let Coupons = await couponModel.find({})
    res.json({ message: 'this is All Coupons', Coupons })
})

module.exports.getCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Coupon = await couponModel.findById(id)
    let URL =await QRCode.toDataURL(Coupon.code)
    if (!Coupon) {
        return next(new AppError(`Coupon Not Found`, 404))
    }
    res.json({ message: 'Success', Coupon ,URL })
})


module.exports.updateCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Coupon = await couponModel.findByIdAndUpdate(id,req.body, { new: true });
    if (!Coupon) {
        return next(new AppError(`Coupon Not Found`, 404))
    }
    res.json({ message: 'Updated Coupon', Coupon })
})

module.exports.deleteCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Coupon = await couponModel.findByIdAndDelete(id);
    if (!Coupon) {
        return next(new AppError(`Coupon Not Found`, 404))
    }
    res.json({ message: 'Deleted Coupon', Coupon })
})