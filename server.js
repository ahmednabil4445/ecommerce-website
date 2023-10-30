const express = require('express')
const { dbConnection } = require('./databases/dbConnection')
require('dotenv').config()
var morgan = require('morgan')
const AppError = require('./src/utils/AppError')
const app = express()
const port = 3000
// ******************************************* Webhook **************************************
const { createOnlineOrder } = require('./src/moduels/order/order.service')
app.post('/webhook', express.raw({ type: 'application/json' }),createOnlineOrder);
// ******************************************************************************************
app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))
const cors = require('cors');
app.use(cors())
// *******************************************************************
app.use('/api/v1/categories', require('./src/moduels/category/category.api'))
app.use('/api/v1/subCategories', require('./src/moduels/subcategory/subcategory.api'))
app.use('/api/v1/brands', require('./src/moduels/brand/brand.api'))
app.use('/api/v1/Products', require('./src/moduels/product/product.api'))
app.use('/api/v1/users', require('./src/moduels/user/user.api'))
app.use('/api/v1/auth', require('./src/moduels/auth/auth.api'))
app.use('/api/v1/reviews', require('./src/moduels/review/review.api'))
app.use('/api/v1/wishList', require('./src/moduels/wishlist/wishlist.api'))
app.use('/api/v1/address', require('./src/moduels/addresses/addresses.api'))
app.use('/api/v1/coupons', require('./src/moduels/coupon/coupon.api'))
app.use('/api/v1/carts', require('./src/moduels/cart/cart.api'))
app.use('/api/v1/orders', require('./src/moduels/order/order.api'))
app.all('*', (req, res, next) => {
    // res.json({message:`Can't find this route : ${req.originalUrl}` })
    next(new AppError(`Can't find this route : ${req.originalUrl} on server`, 404))
})
// *******************************************************************

// ******************** global error handling middleware ************
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ Error: err.message, statusCode })
})
dbConnection()


app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
})

    