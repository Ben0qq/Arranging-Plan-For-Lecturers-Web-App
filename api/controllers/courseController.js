const Course = require('../models/courseModel');
const User = require('../models/userModel');
const base = require('./baseController');
const AppError = require('../utils/appError');

exports.getAllCourses= base.getAll(Course)
exports.getCourse= base.getOne(Course)

exports.getCoursesByLecturer = async (req, res, next) => {
    try{
        const lecturer = await User.findById(req.params.id)
        if(!lecturer){
            return next(new AppError(404, 'fail', 'No user (lecturer) found with that id'), req, res, next)
        }

        const coursesByLecturer = await Course.find({ lecturerId: lecturer._id })

        res.status(200).json({
             status: 'success',
             results: coursesByLecturer.length,
             data:{
                 coursesByLecturer
             }
        })

    } catch(err){
        next(err)
    }
}

exports.getCoursesByMissingLecturer = async (req, res, next) => {
    try{
        const coursesByMissingLecturer = await Course.find({ lecturerId: undefined })

        res.status(200).json({
             status: 'success',
             results: coursesByMissingLecturer.length,
             data:{
                coursesByMissingLecturer
             }
        })

    } catch(err){
        next(err)
    }
}

exports.getCoursesByKeeper = async (req, res, next) => {
    try{
        const keeper = await User.findById(req.params.id)
        if(!keeper){
            return next(new AppError(404, 'fail', 'No user (keeper) found with that id'), req, res, next)
        }

        const coursesByKeeper = await Course.find({ keeperId: keeper._id })

        res.status(200).json({
             status: 'success',
             results: coursesByKeeper.length,
             data:{
                 coursesByKeeper
             }
        })

    } catch(err){
        next(err)
    }
}

exports.addCourse=base.createOne(Course)

exports.updateCourse=base.updateOne(Course)

exports.deleteCourse=base.deleteOne(Course)
