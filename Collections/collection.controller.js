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
        let id = + new Date();
        let {body : {featuredImage = null, collectionName = null, packages } } = req || null;
        const collection = {
            featuredImage,
            collectionName,
            packages,
            id
        }
        const newCollection = new Collection(collection)
        let savedCollection = await newCollection.save();
        console.log(savedCollection, "savedCollection")
        // let collectionList = await Collection.find();
        // let data = collectionList.map(item =>{
        //     return{
        //         featuredImage: item.featuredImage,
        //         collectionName: item.collectionName,
        //         packages: item.packages,
        //         id: item.id
        //     };
        // })
        res.status(200).json({status: true, savedCollection})
    }catch(e){
        console.log(e);
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