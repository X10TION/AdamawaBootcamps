const express = require('express')
const router = require('express').Router()
const {getBootCamps,
    singleBootCamps,
    createBootCamps,
    updateBootCamps,
    deleteBootCamps} = require('../controllers/bootcamps')
//  creating router
router.route('/')
.get(getBootCamps)
.post(createBootCamps)

router.route('/:id')
    .get(singleBootCamps)
    .put(updateBootCamps)
    .delete(deleteBootCamps)
  module.exports = router