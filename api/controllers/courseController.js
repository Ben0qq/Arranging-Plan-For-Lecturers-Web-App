const Course = require('../models/courseModel');
const User = require('../models/userModel');
const base = require('./baseController');
const AppError = require('../utils/appError');
const { populate } = require('../models/userModel');

exports.getAllCourses = async (req, res, next) => {
    try{
        const doc = await Course.find().populate('keeper').populate('lecturers')
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                doc
            }
        })
    } catch (err){
        next(err)
    }
}

exports.getCourse = async (req, res, next) => {
    try{
        const id = req.params.id
        const doc = await Course.findById(id).populate('keeper').populate('lecturers')
        if(!doc){
            return next(new AppError(404, 'fail', 'No document found with that id'),
            req,
            res,
            next)
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        })

    } catch (err){
        next(err)
    }
}

exports.getCoursesByLecturer = async (req, res, next) => {
    try{
        const lecturer = await User.findById(req.params.id)
        if(!lecturer){
            return next(new AppError(404, 'fail', 'No user (lecturer) found with that id'), req, res, next)
        }

        const coursesByLecturer = await Course.find({ lecturerId: lecturer._id }).populate('keeper').populate('lecturers')

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
        const coursesByMissingLecturer = await Course.find({ lecturerId: undefined }).populate('keeper').populate('lecturers')

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

        const coursesByKeeper = await Course.find({ keeperId: keeper._id }).populate('keeper').populate('lecturers')

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
