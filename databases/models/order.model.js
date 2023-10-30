const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItems: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'product' },
            quantity:  Number,
            price: Number
        }
    ],
    totalOrderPrice: Number,
    shippingAddress:{
        city:String,
        street:String,
        phone:String
    },
    paymentMethod:{
        type:String,
        enum:['cash' , 'card'],
        default:"cash"
       
    },
    isPaid:{
        type:Boolean,
        default:false
       
    },
    paidAt:{
        type:Boolean,
        default:false
       
    },
    isDeliverd:{
        type:Boolean,
        default:false
       
    },
    deliveredAt:Date
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)