const mongoose = require("mongoose"), Schema = mongoose.Schema

const courseSchema = new mongoose.Schema({
    courseFullName: {
        type: String,
        required: [true, "Please fill full course name"]
    },
    courseShortName: {
        type: String
    },
    dayOfCourse: {
        type: String,
        lowercase: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: [true, 'Please fill day of course']
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
    guardian: {
       id: {
           type: Schema.Types.ObjectId, 
           ref: 'userSchema'
        }
    },
    lecturer: {
        id: {
            type: Schema.Types.ObjectId, 
            ref: 'userSchema'
         }
     },
    description: {
        type: String,
        required: false
    }
})

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;