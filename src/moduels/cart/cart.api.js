const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { addProductToCart, removeProductFromCart, updateQuantity, applyCoupon, getLoggedCartUser } = require('./cart.service')

const app = require('express').Router()

app.route('/').post(protectedRoutes, allowedTo('user'), addProductToCart)
app.route('/applyCoupon').post(protectedRoutes, allowedTo('user'), applyCoupon)
// app.route('/').post(protectedRoutes, allowedTo('user'), addProductToCart).get(getAllCoupons)
app.route('/:id').delete(protectedRoutes,removeProductFromCart)
app.route('/:id').patch(protectedRoutes,updateQuantity)
app.route('/').get(protectedRoutes,getLoggedCartUser)


module.exports = app