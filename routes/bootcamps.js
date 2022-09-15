const express = require('express')
const router = require('express').Router()
const {getBootCamps,
    singleBootCamps,
    createBootCamps,
    updateBootCamps,
    deleteBootCamps,
    bootCampPhotoUpload} = require('../controllers/bootcamps')
// INCLUDE OTHER RESOURCE ROTER 
const courseRouter = require('./courses')
router.use('/:bootcampId/courses', courseRouter)
    //  creating router
router.route('/')
.get(getBootCamps)
.post(createBootCamps)

router.route('/:id/photo').put(bootCampPhotoUpload)

router.route('/:id')
    .get(singleBootCamps)
    .put(updateBootCamps)
    .delete(deleteBootCamps)
  module.exports = router