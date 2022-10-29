import moment from 'moment';
import Collection from "./collection.model";

export const listCollection = async (req, res) =>{
        let packageList = await Collection.find();
        let data = packageList.map(item =>{
            return {
                featuredImage: item.featuredImage,
                collectionName: item.collectionName,
                packages: item.packages,
                id: item.id
            };
    })
    return res.send({status: true, data}).status(200)
}


export const addCollection = async (req, res) =>{
    try{
        const collectionName = req.body.collectionName;
        const featuredImage = req.file.originalname;
        let id = `PACKAGE-TYPE-${collectionName.toUpperCase()}-${moment().format('DDMMYYYYHHMMSS')}`;
        const collection = {
            featuredImage: featuredImage,
            collectionName: collectionName,
            packageTypeId: id
        }
        console.log(collection)
        const newCollection = new Collection(collection)
        let savedCollection = await newCollection.save();
        console.log(savedCollection, "savedCollection")
        res.status(200).json({status: true, savedCollection})
    }catch(err){
        console.log(err);
        res.status(500).json({status: false, error: err.message})
    }
}

export const deleteCollection = async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteCollection = await Collection.findByIdAndDelete({id});
        res.send({status:true, "data": deleteCollection})
    } catch (error) {
        res.send(500).send("Internal server error")
        
    }
}