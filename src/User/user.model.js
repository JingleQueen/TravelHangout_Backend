import  Mongoose,{Schema } from "mongoose";

const schema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    phoneNumber:{
        type: Number,
        required:true
    },
    userId:{
        type: String,
        required: true
    }
})
const User = Mongoose.model('User', schema)
export default User;