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
        query = Course.find()
    }
    const courses = await query
    res.status(200).json({
        sucess: true,
        count: courses.length,
        data:courses
    })
 
})
