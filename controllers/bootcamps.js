const Bootcamp = require('../models/Bootcamp')
const asyncHandler =require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')

// @desc    get all bootcamps 
// @rote    Get /api/v1/boostcamps
// @access  Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
     let query
// //// copy request query
     const reqQuery = {...req.query}
    //  create qeury string
    // field to exclude
    const removeField = ['select','sort','page','limit']
    // loop over remove field and delete them from reqest qery
    removeField.forEach(param => delete reqQuery[param])
     console.log(reqQuery)
    let queryStr = JSON.stringify(reqQuery)
    //  create operator ($greater etc)
     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
       console.log(queryStr)
    //    findinding request
     query = Bootcamp.find(JSON.parse(queryStr))
    //  executing resourese
    // SELECT FIELDS 
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ')
        // console.log(fields)
        query = query.select(fields)
    }
    // ?sorting query
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        // console.log(sortBy)
        query.query.sort(sortBy)

    } else{
        query = query.sort('-createdAt')
    }

    // pagginations
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1)* limit
    const endIndex = page * limit
    const total = await Bootcamp.countDocuments()
    query = query.skip(startIndex).limit(limit)

        const bootcamps = await query;

        //  pagination result 
        const pagination = {}
        if(endIndex < total){
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if(startIndex > 0){
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            pagination,
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