const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')

// @desc    get all bootcamps 
// @rote    Get /api/v1/boostcamps
// @access  Public
exports.getBootCamps = async (req, res, next) => {
    try{
        const bootcamps = await Bootcamp.find()
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
           })

    }catch(err){
        next(err)   
        // res.status(400).json({success: false})
    }
   
}

// @desc    get a sigle bootcamps 
// @rote    Get /api/v1/boostcamps/:id
// @access  Public
exports.singleBootCamps = async(req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp){
          return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({
            success: true,
            data: bootcamp
           })
    }catch(err){
        next(err)
        // next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
    }
    
}

// @desc   create new bootcamps 
// @rote    post /api/v1/boostcamps
// @access  Private
exports.createBootCamps = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            sucess: true,
            data: bootcamp
        })
    }catch(err){
        next(err)
    }

    
}

// @desc   update new bootcamps 
// @rote    put /api/v1/boostcamps
// @access  Private
exports.updateBootCamps = async (req, res, next) => {
    try{
        const updatebootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!updatebootcamp){
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
    }catch(err){
        next(err)
        // res.status(400).json({sucess : false})
    }
        
    res.status(200).json({
        name: "update bootcamp Successfully",
       
       })
}


// @desc   delete new bootcamps 
// @rote    delet /api/v1/boostcamps/:id
// @access  Private
exports.deleteBootCamps = async (req, res, next) => {
    try{
        const delbootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if(!delbootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
    }catch(err){
            next(err)
    }
    res.status(200).json({
        name: "bootcamp Successfully terminated",
        data: delbootcamp
       })
}