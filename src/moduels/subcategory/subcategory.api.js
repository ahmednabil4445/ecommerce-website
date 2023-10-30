const { createSubCategory, getAllSubCategories, updateSubCategory, deleteSubCategory, getSubCategory } = require('./subcategory.service')
const app = require('express').Router({mergeParams:true})
// app.post('/',createCategory)
app.route('/').post(createSubCategory).get(getAllSubCategories)
app.route('/:id').get(getSubCategory).delete(deleteSubCategory).put(updateSubCategory)

module.exports = app