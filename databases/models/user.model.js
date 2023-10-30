const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'user name is required'],
        minLength: [2, 'too short user name']
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'E-mail must be unique'],
        required: [true, 'E-mail required'],
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'MinLength 5 Characters']
    },
    phone: {
        type: String,
        required: [true, 'phone Number required'],
    },
    passwordChangedAt: Date,
    profilePic: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    wishList: [{ type: mongoose.SchemaTypes.ObjectId , ref:"product"} ],
    address: [{
        city:String,
        street:String,
        phone:String
    } ]

}, { timestamps: true })
// **************************************Hash Password **************************
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 7)
})
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 7)
})
//*******************************************************************************
module.exports = mongoose.model('user', userSchema)