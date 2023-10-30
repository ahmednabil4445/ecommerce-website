const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    code: {
        type: String,
        trim: true,
        required: [true, 'coupon code required'],
        unique:true
    },
    discount: {
        type: Number,
        required: [true, 'coupon discount required'],
        // min:0
    },
    expires: {
        type: Date,
        required: [true, 'coupon Date required'],
    },

}, { timestamps: true })

module.exports = mongoose.model('coupon', couponSchema)