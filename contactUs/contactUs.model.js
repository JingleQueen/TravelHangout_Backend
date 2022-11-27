import  Mongoose, { Schema } from "mongoose";
const schema = new Schema({
    id:{
        type:String
    },
    fullName:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    description:{
        type: String,
    }
})

const ContactUs = Mongoose.model('contactUs', schema)

export default ContactUs;