import Mongoose, {Schema  } from "mongoose";

const schema = new Schema({
    featuredImage:{
        type:String,
        require: true
    },
    collectionName:{
        type:String,
        require:true
    },
    packages:{
        type:String,
        require:true
    },
    id:{
        type:String,
    }

})

const Collection = Mongoose.model('Collection',schema )

export default Collection;