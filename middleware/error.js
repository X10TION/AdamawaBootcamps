const ErrorResponse = require('../utils/errorResponse')
const errorHandler = (err, req, res, next) =>{
   let error = { ...err}
   error.message = err.message
    console.log(err.stack.green)
    console.log(err.name)

    // mongoose bad object id
    if(err.name == 'CastError'){
        const message = `Resouces not found with id ${err.value}`
        error = new ErrorResponse(message, 404)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler 