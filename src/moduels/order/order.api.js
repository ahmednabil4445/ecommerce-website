const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { createCashOrder, createSpecificOrder, getAllOrders, getSpecificOrder, createCheckOutSession } = require('./order.service')

const app = require('express').Router()

app.route('/:id').post(protectedRoutes, allowedTo('user'), createCashOrder)
app.route('/').get(protectedRoutes, allowedTo('user'), getSpecificOrder)
app.route('/getAllOrders').get(getAllOrders)
app.route('/checkOut/:id').post(protectedRoutes, allowedTo('user'), createCheckOutSession)



module.exports = app