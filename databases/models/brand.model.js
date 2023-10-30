const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is requierd'],
        trim: true,
        required: true,
        minLength: [2, 'too short brand name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: String
}, { timestamps: true })
brandSchema.post('init',(doc)=>{
    doc.logo = process.env.BASE_URL + '/brand/' + doc.logo
})
module.exports = mongoose.model('brand', brandSchema)