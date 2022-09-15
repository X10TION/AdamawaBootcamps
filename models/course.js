const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required:[true, 'Please add a course title']
    },
    description:{
        type:String,
        required:[true, 'Please add a description']
    },
    weeks:{
        type:String,
        required:[true, 'Please numbers of weeks']
    },
    tuition:{
        type:Number,
        required:[true, 'Please add a tuition cost']
    },
    minimumSkill:{
        type:String,
        required:[true, 'Please add a minimun skil'],
        enum:['Beginner', 'Intermediate', 'Advance']
    },
    schoolershipAvailable:{
        type:Boolean,
       default: false
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }
})

CourseSchema.statics.getAverageCost = async function(bootcampId){
        console.log("Calculating the avarege cost -----".blue)
        const obj = await this.aggregate([
            {
                $match: { bootcamp: bootcampId}
            },
            {
                $group: {
                    _id: '$bootcamp',
                    averageCost: { $avg: '$tuition' }
                }
            }
        ])
        try{
            await this.model('bootcamp').findByIdAndUpdate(bootcampId, {
                averageCost: Math.ceil(obj[0].averageCost / 10) * 10
            })
        }catch(err){
            console.log(err)
        }

}
//  CALL GETAverageCost after save
CourseSchema.post('save', function(){
       this.constructor.getAverageCost(this.bootcamp)
})

//  CALL GETAverageCost before remove
CourseSchema.post('remove', function(){
    this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema)