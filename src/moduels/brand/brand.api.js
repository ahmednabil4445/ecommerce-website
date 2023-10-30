const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')
const { validationSchema } = require('../../middleware/validation')
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { createBrand, getAllBrands, updateBrand, deleteBrand, getBrand } = require('./brand.service')
const { createBrandSchema } = require('./brand.validation')
app.route('/').post(protectedRoutes, allowedTo('user'),uploadSingleImage('logo' , 'brand'),validationSchema(createBrandSchema),createBrand).get(getAllBrands)
app.route('/:id').get(getBrand).delete(deleteBrand).put(updateBrand)
module.exports = app