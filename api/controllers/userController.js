  
const User = require('../models/userModel');
const base = require('./baseController');

exports.getAllUsers = base.getAll(User)
exports.getUser = base.getOne(User)

// No password update!
exports.updateUser = base.updateOne(User)
exports.deleteUser = base.deleteOne(User)