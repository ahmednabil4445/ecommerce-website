const cartModel = require('../../../databases/models/cart.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const productModel = require('../../../databases/models/product.model')
const couponModel = require('../../../databases/models/coupon.model')

// **********************************************************************

function calcTotalPrice(cart) {
    let totalPrice = 0
    cart.cartItems.forEach(element => {
        totalPrice += element.quantity * element.price;
    });
    cart.totalPrice = totalPrice
}
module.exports.addProductToCart = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new AppError('product not found', 401))
    req.body.price = product.price
    let isCartExist = await cartModel.findOne({ user: req.user._id })
    if (!isCartExist) {
        let result = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        })
        calcTotalPrice(result)
        await result.save();
        return res.status(200).json({ message: 'Added Cart Success', result })
    }
    let item = isCartExist.cartItems.find((elm) => elm.product == req.body.product)
    if (item) {
        item.quantity += 1
    } else {
        isCartExist.cartItems.push(req.body)
    }

    calcTotalPrice(isCartExist)
    if (isCartExist.discount) {
        isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100
    }
    await isCartExist.save();
    res.status(200).json({ message: 'Success', cart: isCartExist })

})

module.exports.removeProductFromCart = catchAsyncError(async (req, res, next) => {
    let Result = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true });
    if (!Result) {
        return next(new AppError(`Item Not Found`, 404))
    }
    calcTotalPrice(Result)
    if (Result.discount) {
        Result.totalPriceAfterDiscount = Result.totalPrice - (Result.totalPrice * Result.discount) / 100
    }
    res.json({ message: 'Removed Item Success', cart: Result })
})

module.exports.updateQuantity = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)
    if (!product) return next(new AppError('product not found', 401))

    let isCartExist = await cartModel.findOne({ user: req.user._id })

    let item = isCartExist.cartItems.find((elm) => elm.product == req.params.id)
    if (item) {
        item.quantity = req.body.quantity
    }
    calcTotalPrice(isCartExist)
    if (isCartExist.discount) {
        isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100
    }

    await isCartExist.save();
    res.status(200).json({ message: 'Updated Success', cart: isCartExist })

})


module.exports.applyCoupon = catchAsyncError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() } })
    console.log(coupon);
    let cart = await cartModel.findOne({ user: req.user._id })
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.discount = coupon.discount
    await cart.save()
    res.status(201).json({ message: ' Success', cart })

})

module.exports.getLoggedCartUser = catchAsyncError(async (req, res, next) => {


    let cartItems = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')
    res.status(200).json({ message: 'Success', cart: cartItems })

})


// module.exports.getAllCoupons = catchAsyncError(async (req, res) => {
//     let Coupons = await couponModel.find({})
//     res.json({ message: 'this is All Coupons', Coupons })
// })

// module.exports.getCoupon = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params
//     let Coupon = await couponModel.findById(id)
//     let URL =await QRCode.toDataURL(Coupon.code)
//     if (!Coupon) {
//         return next(new AppError(`Coupon Not Found`, 404))
//     }
//     res.json({ message: 'Success', Coupon ,URL })
// })


// module.exports.updateCoupon = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params
//     let Coupon = await couponModel.findByIdAndUpdate(id,req.body, { new: true });
//     if (!Coupon) {
//         return next(new AppError(`Coupon Not Found`, 404))
//     }
//     res.json({ message: 'Updated Coupon', Coupon })
// })

// module.exports.deleteCoupon = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params
//     let Coupon = await couponModel.findByIdAndDelete(id);
//     if (!Coupon) {
//         return next(new AppError(`Coupon Not Found`, 404))
//     }
//     res.json({ message: 'Deleted Coupon', Coupon })
// })