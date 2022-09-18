const express = require('express')
const courses = require('../models/course')
const advanceResults = require('../middleware/advanceReseult')
const {getCourses, getCourse,addCourse, updateCourse,deleteCourse } = require('../controllers/course')
const router = require('express').Router({mergeParams: true})


//  creating router
router.route('/').get(advanceResults(courses,{
    path:'bootcamp',
    select:'name description'
} ),getCourses).post(addCourse)
router
.route('/:id')
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse)


module.exports = router