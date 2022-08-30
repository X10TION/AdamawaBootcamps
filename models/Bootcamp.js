const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/goecoder')



const BootCampSchema= new mongoose.Schema ({
    name: {
        type:String,
        required: [true, 'please Add a bootcamps'],
        unique: [true, 'Name is requireed'],
        trim: true,
        maxlength:[50, 'Name can not be more than 50 characters']
    },
    slug:String,
    description:{
        type:String,
        required: [true, 'please Add a Description'],
        maxlength:[50, 'Name can not be more than 50 characters']
    },
    website:{
        type:String,
        match:[/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,"please use a valid URL with http or"],

    },
    phone:{
        type: String,
        maxlength:[20,"Phone number can not be longer than 20 characters"]
    },
    email:{
        type:String,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]\w+)*(\.\w{2,3})+$/, 'please add a valid email']
    },
    address:{
        type:String,
        required: [true, 'Please add address']
    },
    location:{
        // geojson point here
        type:{
            type:String,
            enum:['point'],
            // required: true
        },
        coordinates:{
            type:[Number],
            // required: true,
            index: '2dsphere'

        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country:String
    },
    careers:{
        // array of string here
        type: [String],
        required: true,
        enum:[
            'Web Develoment',
            'Mobile Development',
            'UI/UX Design',
            'Data Science',
            'Power BI',
            'Machine Learning',
            'other'
        ]
    },
    averageRating:{
        type: Number,
        min: [1, 'Rating must be atleast one'],
        max: [10, 'Rating must can not be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default:false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
         type:Boolean,
         default: false
    },
    crearedAt:{
        type: Date,
        default: Date.now
    }
})


// middleware 
BootCampSchema.pre('save', function(next){
    // console.log('slugify ran', this.name)
    this.slug = slugify(this.name, {lower: true})
    next()
})

//  GEOCODE CREATE LOCATION FIELE
BootCampSchema.pre('save', async function(next){
    // const locationGEO= await
     geocoder.on(this.address)
    this.location = {
        type: "point",
        coordinates:[locationGEO[0].longitude,locationGEO[0].latitude],
        formattedAddress: locationGEO[0].formattedAddress,
        street: locationGEO[0].streetName,
        city: locationGEO[0].city,
        state: locationGEO[0].stateCode,
        zipcode: locationGEO[0].zipcode,
        country: locationGEO[0].countryCode
    }
    // do not save addresss
    this.address = undefined
next()
})
module.exports = mongoose.model('Bootcamp', BootCampSchema)