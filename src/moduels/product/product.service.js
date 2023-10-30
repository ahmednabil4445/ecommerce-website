const productModel = require('../../../databases/models/product.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const ApiFeatuers = require('../../utils/ApiFeatuers')

module.exports.createProduct = catchAsyncError(async (req, res) => {
    // const { title , price,priceAfterDiscount,ratingAvg,ratingCount,description,quantity,sold,category,subCategory,brand } = req.body
    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(obj => obj.filename)
    let Product = new productModel(req.body)
    await Product.save();
    res.status(200).json({ message: 'Create Product Success', Product })
})


module.exports.getAllProducts = catchAsyncError(async (req, res) => {
    let apiFeatuers = new ApiFeatuers(productModel.find(), req.query).paginate().filter().serach().selectFields().sort()
    let Products = await apiFeatuers.mongooseQuery
    res.json({ message: 'this is All Products', page: apiFeatuers.page, Products })
})

module.exports.getProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Product = await productModel.findById(id)
    if (!Product) {
        return next(new AppError(`Product Not Found`, 404))
    }
    res.json({ message: 'Success', Product })
})


module.exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    if (req.body.slug) req.body.slug = slugify(req.body.title)
    let Product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!Product) {
        return next(new AppError(`Product Not Found`, 404))
    }
    res.json({ message: 'Updated Product', Product })
})

module.exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Product = await productModel.findByIdAndDelete(id);
    if (!Product) {
        return next(new AppError(`Product Not Found`, 404))
    }
    res.json({ message: 'Deleted Product', Product })
})
