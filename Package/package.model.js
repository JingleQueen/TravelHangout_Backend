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
    destination: {
        type: String,
        require: true
    },
    region:{
        type: String,
        require: true
    },
    interest: {
        type: String
    }
})

const Packages = Mongoose.model('Packages', schema )

export default Packages;