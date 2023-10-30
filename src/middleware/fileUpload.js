const multer = require('multer')
const AppError = require('../utils/AppError')

let options = (foldername) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${foldername}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new AppError('Image Only', 400), false)
        }
    }
    return multer({ storage, fileFilter })
}
module.exports.uploadSingleImage = (fieldname, foldername) => options(foldername).single(fieldname)
module.exports.uploadMixOfImage = (arrayOfFields, foldername) => options(foldername).fields(arrayOfFields)