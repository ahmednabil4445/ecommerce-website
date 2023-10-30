const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'product title is unique'],
        trim: true,
        required: [true, 'product title is required'],
        minLength: [2, 'too short product name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    price: {
        type: Number, 
        required: [true, 'product price required'],
        min: 0,

    },
    priceAfterDiscount: {
        type: Number, 
        min: 0,

    },
    ratingAvg: {
        type: Number, 
        min: [1, 'rating average must be greater than 1'],
        max: [5, 'rating average must be less than 5'],
    },
    ratingCount: {
        type: Number, 
        min:0,
        default: 0,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'product description required'],
        minLength: [5, 'too short product description'],
        maxLength: [300, 'too long product description']
    },
    quantity: {
        type: Number, 
        default: 0,
    },
    sold: {
        type: Number, 
        min:0,
        default: 0,
    },
    imgCover:String,
    images:[String],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: [true, 'product category required'],
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory',
        required: [true, 'product subCategory required'],
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'brand',
        required: [true, 'product brand required'],
    },
}, { timestamps: true , toJSON:{virtuals:true}, toObject:{virtuals:true}})

productSchema.post('init',(doc)=>{
    doc.imgCover = process.env.BASE_URL + '/product/' + doc.imgCover
    doc.images = doc.images.map(obj=>(process.env.BASE_URL + '/product/' + obj))
})

productSchema.virtual('allReviews',{
    ref:"review",
    localField:"_id",
    foreignField:"product"
})
productSchema.pre(/^find/, function () {
    this.populate('allReviews')
})

module.exports = mongoose.model('product', productSchema)