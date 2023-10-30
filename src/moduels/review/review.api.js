const app = require('express').Router()
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { createReview, getAllReviews, updateReview, deleteReview, getReview } = require('./review.service')
app.route('/').post(protectedRoutes, allowedTo('user'),createReview).get(getAllReviews)
app.route('/:id').get(getReview).delete(protectedRoutes,deleteReview).put(protectedRoutes,updateReview)
module.exports = app