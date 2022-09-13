const Course = require('../models/course')
const asyncHandler =require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')


// @desc    get all bootcamps 
// @rote    Get /api/v1/courses
// @rote    Get /api/v1/bootcamp/:id/courses
// @access  Public
exports.getCourses = asyncHandler(async(req, res, next) =>{
    let query
    if(req.params.bootcampId){
        query = Course.find({bootcamp: req.params.bootcampId})
    }else{
        query = Course.find().populate({
            path:'bootcamp',
            select:'name description'
        })
    }
    const courses = await query
    res.status(200).json({
        sucess: true,
        count: courses.length,
        data:courses
    })
 
})

// get single courser
exports.getCourse = asyncHandler(async(req, res, next) =>{
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: "name description"
    })
    if(!course){
        return next(new ErrorResponse(`no course with these id of ${req.params.id}`))
    }
    const courses = await query
    res.status(200).json({
        sucess: true,
        data:course
    })
 
})
