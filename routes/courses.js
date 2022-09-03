const express = require('express')
const {getCourses} = require('../controllers/course')
const router = require('express').Router({mergeParams: true})

//  creating router

router.route('/').get(getCourses)

module.exports = router