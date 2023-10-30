const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItems: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'product' },
            quantity: { type: Number, default: 1 },
            price: Number
        }
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number
}, { timestamps: true })

module.exports = mongoose.model('cart', cartSchema)