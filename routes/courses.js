const express = require('express')
const {getCourses, getCourse,addCourse, updateCourse,deleteCourse } = require('../controllers/course')
const router = require('express').Router({mergeParams: true})


//  creating router
router.route('/').get(getCourses).post(addCourse)
router
.route('/:id')
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse)


module.exports = router