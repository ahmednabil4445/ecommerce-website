const app = require('express').Router()
const { uploadMixOfImage } = require('../../middleware/fileUpload')
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProduct } = require('./product.service')
let arrayFields = [{ name: "imgCover", maxCount: 1 }, { name: "images", maxCount: 10 }]
app.route('/').post(protectedRoutes, allowedTo('user'), uploadMixOfImage(arrayFields, 'product'), createProduct).get(getAllProducts)
app.route('/:id').get(getProduct).delete(deleteProduct).put(updateProduct)
module.exports = app