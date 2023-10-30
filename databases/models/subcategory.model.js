const mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is requierd'],
        trim: true,
        required: true,
        minLength: [2, 'too short subCategory name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
}, { timestamps: true })

module.exports = mongoose.model('subCategory', subCategorySchema)