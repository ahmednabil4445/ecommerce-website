const app = require('express').Router()
const { signup, signin } = require('./auth.service')
app.route('/signup').post(signup)
app.route('/signin').post(signin)
module.exports = app