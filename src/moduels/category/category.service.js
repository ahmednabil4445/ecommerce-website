const categoryModel = require('../../../databases/models/category.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createCategory = catchAsyncError(async (req, res) => {
    req.body.slug =  slugify( req.body.name)
    req.body.image = req.file.filename
    let category = new categoryModel(req.body)
    await category.save();
    res.status(200).json({ message: 'Create Category Success', category })
})


module.exports.getAllCategories = catchAsyncError(async (req, res) => {
    let categories = await categoryModel.find({})
    res.json({ message: 'this is All Categories', categories })
})

module.exports.getCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let category = await categoryModel.findById(id)
    if (!category) {
        return next(new AppError(`Category Not Found`, 404))
    }
    res.json({ message: 'Success', category })
})


module.exports.updateCategory = catchAsyncError(async (req, res, next) => {
    req.body.slug =  slugify( req.body.name)
    req.body.image = req.file.filename
    const { id } = req.params
    let category = await categoryModel.findByIdAndUpdate(id,req.body, { new: true });
    if (!category) {
        return next(new AppError(`Category Not Found`, 404))
    }
    res.json({ message: 'Updated Category', category })
})

module.exports.deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
        return next(new AppError(`Category Not Found`, 404))
    }
    res.json({ message: 'Deleted category', category })
})