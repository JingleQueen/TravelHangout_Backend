import  Mongoose, {Schema} from "mongoose";

const schema = new Schema({
    id:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    data: {
        type: String
    }
})

const EnquireNow = Mongoose.model('enquireNow', schema )

export default EnquireNow;