const Joi = require('joi');
module.exports.createBrandSchema = Joi.object({
    name: Joi.string().min(3).max(80).required(),
})