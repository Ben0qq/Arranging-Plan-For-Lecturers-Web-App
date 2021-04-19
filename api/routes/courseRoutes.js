const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const courseController = require('../controllers/courseController')

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route('/')
    .get(courseController.getAllCourses)

router
    .route('/:id')
    .get(courseController.getCourse);

module.exports = router;