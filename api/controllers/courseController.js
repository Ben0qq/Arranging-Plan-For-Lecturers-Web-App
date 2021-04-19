const Course = require('../models/courseModel');
const base = require('./baseController');

// get
exports.getAllCourses= base.getAll(Course)
exports.getCourse= base.getOne(Course)

// post

// patch

// delete
