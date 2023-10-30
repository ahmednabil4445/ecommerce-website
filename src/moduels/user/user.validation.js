const Joi = require('joi');
module.exports.schemaSingup = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    repassword: Joi.ref('password')
})
module.exports.schemaSignin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
})
