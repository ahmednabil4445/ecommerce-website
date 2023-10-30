const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is Unique'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    image: String
}, { timestamps: true })

categorySchema.post('init',(doc)=>{
    doc.image = process.env.BASE_URL + '/category/' + doc.image
})

module.exports = mongoose.model('category', categorySchema)