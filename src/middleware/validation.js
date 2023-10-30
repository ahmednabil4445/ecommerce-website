module.exports.validationSchema = (schema) => {
    return (req, res, next) => {
        let inputs = {...req.params , ...req.body , ...req.query}
        let { error } = schema.validate(inputs, { abortEarly: false })
        if (!error) {
            next()
         } else {
            res.json(error.details[0].message)
        }

    }
}