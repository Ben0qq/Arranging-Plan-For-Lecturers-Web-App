const mongoose = require("mongoose"), Schema = mongoose.Schema
const userModel = require('./userModel')

const courseSchema = new mongoose.Schema({
    courseFullName: {
        type: String,
        required: [true, "Please fill full course name"]
    },
    courseShortName: {
        type: String
    },
    type:{
        type: String,
        lowercase: true,
        enum: ['lecture', 'exercises', 'lab', 'seminar', 'project'],
        required: [true, 'Please fill type of course']
    },
    dayOfCourse: {
        type: String,
        lowercase: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: [true, 'Please fill day of course']
    },
    parity: {
        type: String,
        lowercase: true,
        enum: ['tn', 'tp', 'all'],
        default: 'all'
    },
    startHour: {
        type: Number,
        min: 0,
        max: 23,
        required: [true, 'Please fill start hour of course']
    },
    startMinute: {
        type: Number,
        min: 0,
        max: 59,
        required: [true, 'Please fill start minute of course']
    },
    endHour: {
        type: Number,
        min: 0,
        max: 23,
        required: [true, 'Please fill end hour of course']
    },
    endMinute: {
        type: Number,
        min: 0,
        max: 59,
        required: [true, 'Please end minute of course']
    },
    lecturers: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    keeper: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    contenders: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    description: {
        type: String,
        required: false
    }
})

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;