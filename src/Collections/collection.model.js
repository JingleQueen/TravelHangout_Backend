import Mongoose, {Schema  } from "mongoose";

const schema = new Schema({
    featuredImage:{
        type:String,
        required: true
    },
    collectionName:{
        type:String,
        required:true,
        unique: true
    },
    packages:[{
        type: Schema.Types.ObjectId,
        ref: 'Packages',
    }],
    packageTypeId:{
        type:String,
    }
})

const Collection = Mongoose.model('Collection',schema )

export default Collection;