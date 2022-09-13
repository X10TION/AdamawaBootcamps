const express = require('express')
const {getCourses, getCourse} = require('../controllers/course')
const router = require('express').Router({mergeParams: true})

//  creating router

router.route('/').get(getCourses)
router.route('/:id').get(getCourse)

module.exports = router