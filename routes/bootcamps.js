const express = require('express')
const router = require('express').Router()
const {getBootCamps,
    singleBootCamps,
    createBootCamps,
    updateBootCamps,
    deleteBootCamps} = require('../controllers/bootcamps')
// INCLUDE OTHER RESOURCE ROTER 
const corseRouter = require('./courses')
router.use('/:bootcampId/courses', corseRouter)
    //  creating router
router.route('/')
.get(getBootCamps)
.post(createBootCamps)

router.route('/:id')
    .get(singleBootCamps)
    .put(updateBootCamps)
    .delete(deleteBootCamps)
  module.exports = router