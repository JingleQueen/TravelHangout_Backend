import Mongoose, {Schema} from "mongoose";

const schema = new Schema({
    email:{
        type:String,
        required: true
    },
    otp:{
        type:Number,
        required:true
    }
})

const OTP = Mongoose.model('OTP', schema)

export default OTP;