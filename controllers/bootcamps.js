const Bootcamp = require('../models/Bootcamp')
const asyncHandler =require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')

// @desc    get all bootcamps 
// @rote    Get /api/v1/boostcamps
// @access  Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
     let query
     let queryStr = JSON.stringify(req.query)
     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
       console.log(queryStr)
     query = Bootcamp.find(JSON.parse(queryStr))

        const bootcamps = await query;

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
           })
})

// @desc    get a sigle bootcamps 
// @rote    Get /api/v1/boostcamps/:id
// @access  Public
exports.singleBootCamps = asyncHandler(async(req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp){
          return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({
            success: true,
            data: bootcamp
           })
    
})

// @desc   create new bootcamps 
// @rote    post /api/v1/boostcamps
// @access  Private
exports.createBootCamps = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            sucess: true,
            data: bootcamp
        })
})

// @desc   update new bootcamps 
// @rote    put /api/v1/boostcamps
// @access  Private
exports.updateBootCamps = asyncHandler(async (req, res, next) => {
        const updatebootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!updatebootcamp){
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }  
    res.status(200).json({
        name: "update bootcamp Successfully",
       
       })
})


// @desc   delete new bootcamps 
// @rote    delet /api/v1/boostcamps/:id
// @access  Private
exports.deleteBootCamps = asyncHandler(async (req, res, next) => {
        const delbootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if(!delbootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
    res.status(200).json({
        name: "bootcamp Successfully terminated"
       })
})