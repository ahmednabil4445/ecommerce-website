const app = require('express').Router()
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { addToWishList, removeFromWishList, getAllUserWishList } = require('./wishlist.service')
app.route('/').patch(protectedRoutes, allowedTo('user'),addToWishList)
app.route('/').delete(protectedRoutes, allowedTo('user'),removeFromWishList)
app.route('/').get(protectedRoutes, allowedTo('user'),getAllUserWishList)
module.exports = app