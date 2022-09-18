  const Bootcamp = require('../models/Bootcamp')
  const asyncHandler =require('../middleware/asyncHandler')
  const ErrorResponse = require('../utils/errorResponse')
  const path = require('path')

  // @desc    get all bootcamps 
  // @rote    Get /api/v1/boostcamps
  // @access  Public
  exports.getBootCamps = asyncHandler(async (req, res, next) => {
          res.status(200).json(res.advanceResults)
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
          bootcamp.remove()
      res.status(200).json({
          name: "bootcamp Successfully terminated"
         })
  })

  // @desc   put new bootcamps 
  // @rote    put /api/v1/boostcamps/:id/photo
  // @access  Private
  exports.bootCampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp){
        return  next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
            )
    }
    if(!req.files){
        return  next(new ErrorResponse(`Please Upload files - `, 404))
    }
    // console.log(req.files.files)
    const file = req.files.files;

    //  make sure it is photo
    if(!file.mimetype.startsWith('image')){
        return next( new ErrorResponse('Please Uplaod an image file', 400))
    }
    if(file.size > process.env.MAX_FILE_SIZE){
        return next( new ErrorResponse(`Please Uplaod an image file ${process.env.MAX_FILE_SIZE}`, 400))
    }
    // creating cstomer file
    file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`
    
    file.mv(`${process.env.FILE_PLOAD_PATH}/${file.name}`, async err => {
        if(err){
            console.log(err)
            return next(
                new ErrorResponse(`Problem with file upload`,500))
        }
        await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name})
    })
    
   res.status(200).json({
    success: true,
    data: file.name
   })
})