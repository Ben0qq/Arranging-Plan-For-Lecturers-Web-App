const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const courseController = require('../controllers/courseController')

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route('/')
    .get(courseController.getAllCourses)
    .post(courseController.addCourse)

router
    .route('/:id')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

router
    .route('/lecturers/missing')
    .get(courseController.getCoursesByMissingLecturer)

router
    .route('/lecturers/:id')
    .get(courseController.getCoursesByLecturer)

router
    .route('/keepers/:id')
    .get(courseController.getCoursesByKeeper)


module.exports = router;