const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
const fileUpload = require('express-fileupload')
//  router files
const bootcamp = require('./routes/bootcamps')
const courses = require('./routes/courses')
// loading the env file
dotenv.config({ path: './config/config.env'})
//  connection to the DATABASE
connectDB()
const app = express()
// body parser
app.use(express.json())
 // dev middleware
if(process.env.NODE_ENV === 'develoment'){
    app.use(morgan('dev'))
}
//  file uploaad 
app.use(fileUpload())

// mount the router
app.use('/api/v1/bootcamp', bootcamp)
app.use('/api/v1/courses', courses )

app.use(errorHandler)

const PORT = process.env.PORT || 500
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.bold))

// Handle Unhandle promise rejection
process.on('unhandleRejection', (err, promise) => {
    console.log(`Error: ${err.message.red.bold}`)
    // close the server
    server.close(() => process.exit(1))
})