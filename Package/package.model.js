import  Mongoose, {Schema} from "mongoose";

const schema = new Schema({
    packageId:{
        type: String,
        require: true
    },
    packageTypeObjRef: {
        type: Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    packageTypeId: {
        type: String,
        required: true
    },
    packageTypeName: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    interest: {
        type: String
    },
    duration: {
        days: {
            type: Number,
        },
        nights: {
            type: Number,
        }
    },
    covers: [{ type: String }],
    description: {
        type: String
    },
    rating: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    destinationType: {
        type: String,
        enum: ['international', 'domestic'],
        default: 'domestic',
        required: true
    },
    destinationName: {
        type: String,
        required: true
    },
    region: {
        type: String,
        enum: ['east', 'west', 'north', 'south'],
        default: 'north',
        required: true
    }
})

const Packages = Mongoose.model('Packages', schema )

export default Packages;