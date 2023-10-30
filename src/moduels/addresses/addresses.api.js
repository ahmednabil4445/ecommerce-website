const app = require('express').Router()
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { addToAddresses, removeFromAddresses, getAllUserAdressess } = require('./addresses.service')
app.route('/').patch(protectedRoutes, allowedTo('user'),addToAddresses)
app.route('/').delete(protectedRoutes, allowedTo('user'),removeFromAddresses)
app.route('/').get(protectedRoutes, allowedTo('user'),getAllUserAdressess)
module.exports = app