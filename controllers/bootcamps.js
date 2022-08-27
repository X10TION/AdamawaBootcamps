const Bootcamp = require('../models/Bootcamp')


// @desc    get all bootcamps 
// @rote    Get /api/v1/boostcamps
// @access  Public
exports.getBootCamps = (req, res, next) => {
    res.status(400).json({
        name: "show all bootcamp "
       })
}

// @desc    get a sigle bootcamps 
// @rote    Get /api/v1/boostcamps/:id
// @access  Public
exports.singleBootCamps = (req, res, next) => {
    res.status(400).json({
        name: "signal bootcamp "
       })
}

// @desc   create new bootcamps 
// @rote    post /api/v1/boostcamps
// @access  Private
exports.createBootCamps = async (req, res, next) => {
    const bootcamp = await Bootcamp.creat(req.body);
    res.status(201).json({
        sucess: true,
        data: bootcamp
    })
}

// @desc   update new bootcamps 
// @rote    put /api/v1/boostcamps
// @access  Private
exports.updateBootCamps = (req, res, next) => {
    res.status(400).json({
        name: "update bootcamp "
       })
}


// @desc   delete new bootcamps 
// @rote    delet /api/v1/boostcamps/:id
// @access  Private
exports.deleteBootCamps = (req, res, next) => {
    res.status(400).json({
        name: "delete bootcamp "
       })
}