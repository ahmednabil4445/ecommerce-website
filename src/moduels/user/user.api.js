const app = require('express').Router()
const { createUser, getAllUsers, updateUser, deleteUser, getUser, changePassword } = require('./user.service')
app.route('/').post(createUser).get(getAllUsers)
app.route('/:id').get(getUser).delete(deleteUser).put(updateUser).patch(changePassword)
module.exports = app