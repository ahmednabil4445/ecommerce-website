const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { deleteCoupon, createCoupon, getAllCoupons, getCoupon, updateCoupon } = require('./coupon.service')

const app = require('express').Router()

app.route('/').post(protectedRoutes, allowedTo('user'), createCoupon).get(getAllCoupons)
app.route('/:id').get(getCoupon).delete(deleteCoupon).put(updateCoupon)


module.exports = app