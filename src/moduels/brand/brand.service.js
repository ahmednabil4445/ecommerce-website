const brandModel = require('../../../databases/models/brand.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')


module.exports.createBrand = catchAsyncError(async (req, res) => {
    req.body.slug =  slugify( req.body.name)
    req.body.logo = req.file.filename
    let Brand  = new brandModel(req.body)
    await Brand.save();
    res.status(200).json({ message: 'Create Brand Success', Brand })
})


module.exports.getAllBrands = catchAsyncError(async (req, res) => {
    let Brands = await brandModel.find({})
    res.json({ message: 'this is All Brands', Brands })
})

module.exports.getBrand = catchAsyncError(async (req, res , next) => {
    const { id } = req.params
    let Brand = await brandModel.findById(id)
    if (!Brand) {
        return next(new AppError(`Brand Not Found`  , 404)) 
    }
    res.json({ message: 'Success', Brand })
})


module.exports.updateBrand = catchAsyncError(async (req, res , next) => {
    const { name } = req.body
    const { id } = req.params
    let Brand = await brandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    if (!Brand) {
        return next(new AppError(`Brand Not Found`  , 404)) 
    }
    res.json({ message: 'Updated Brand', Brand })
})

module.exports.deleteBrand = catchAsyncError(async (req, res , next) => {
    const { id } = req.params
    let Brand = await brandModel.findByIdAndDelete(id);
    if (!Brand) {
        return next(new AppError(`Brand Not Found`  , 404)) 
    }
    res.json({ message: 'Deleted Brand', Brand })
})