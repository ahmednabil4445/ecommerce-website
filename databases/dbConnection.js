
const mongoose = require('mongoose')

module.exports.dbConnection = () => {
    mongoose.connect(process.env.DB_CONNECTION).then(() => {
        console.log('DB Connected');
    })
}