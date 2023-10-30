const subCategoryModel = require('../../../databases/models/subcategory.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createSubCategory = catchAsyncError(async (req, res) => {
    const { name, categoryId } = req.body
    let subCategory = new subCategoryModel({ name, categoryId, slug: slugify(name) })
    await subCategory.save();
    res.status(200).json({ message: 'Create subCategory Success', subCategory })
})


module.exports.getAllSubCategories = catchAsyncError(async (req, res) => {
    let filter = {}
    if (req.params.categoryId) {
        filter = { categoryId: req.params.categoryId }
    }
    console.log(req.params);
    let subCategories = await subCategoryModel.find(filter)
    res.json({ message: 'this is All subCategories', subCategories })
})

module.exports.getSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let subCategory = await subCategoryModel.findById(id)
    if (!subCategory) {
        return next(new AppError(`subCategory Not Found`, 404))
    }
    res.json({ message: 'Success', subCategory })
})


module.exports.updateSubCategory = catchAsyncError(async (req, res, next) => {
    const { name, categoryId } = req.body
    const { id } = req.params
    let subCategory = await subCategoryModel.findByIdAndUpdate(id, { name, categoryId, slug: slugify(name) }, { new: true });
    if (!subCategory) {
        return next(new AppError(`subCategory Not Found`, 404))
    }
    res.json({ message: 'Updated subCategory', subCategory })
})

module.exports.deleteSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let subCategory = await subCategoryModel.findByIdAndDelete(id);
    if (!subCategory) {
        return next(new AppError(`subCategory Not Found`, 404))
    }
    res.json({ message: 'Deleted subCategory', subCategory })
})