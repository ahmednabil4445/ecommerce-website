const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('./category.service')
const app = require('express').Router()
const subcategoryRouter  = require('../subcategory/subcategory.api')
const { createCategorySchema, getCategorySchema } = require('./category.validation')
const { validationSchema } = require('../../middleware/validation')
const { uploadSingleImage } = require('../../middleware/fileUpload')
// ********** Merge Params ******************************
app.use('/:categoryId/subCategories' , subcategoryRouter)
//******************************************************** */
// **************************************************************************

// **************************************************************************
app.route('/').post(uploadSingleImage('image' , 'category'),validationSchema(createCategorySchema),createCategory).get(getAllCategories)
app.route('/:id').get(validationSchema(getCategorySchema),getCategory).delete(deleteCategory).put(uploadSingleImage('image' , 'category'),updateCategory)


module.exports = app