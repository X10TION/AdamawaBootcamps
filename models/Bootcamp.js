const mongoose = require('mongoose')

const BootCampSchema= new mongoose.Schema ({
    name: {
        type:String,
        require: [true, 'please Add a bootcamps'],
        unique: [true, 'Name is requireed'],
        trim: true,
        maxlength:[50, 'Name can not be more than 50 characters']
    },
    slug:String,
    description:{
        type:String,
        require: [true, 'please Add a Description'],
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
            require: true
        },
        coordinates:{
            type:[Number],
            require: true,
            index: '2dsphere'

        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country:String
    },
    carrers:{
        // array of string here
        type: [String],
        require: true,
        enum:[
            'Web Develoment',
            'Mobile Development',
            'UI/UX Design',
            'Data Science',
            'Power BI',
            'Machine Learning',
            'other'
        ]

    }
})