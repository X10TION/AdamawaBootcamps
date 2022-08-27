const mongoose = require('mongoose')
//  configuring the database here
const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    
    console.log(`MongoDB Connected ${conn.connection.host }`.cyan.bold.underline )
}
module.exports = connectDB