import moment from 'moment';
import Packages from "./package.model";
import Collection from '../Collections/collection.model';
import mongoose from 'mongoose';

export const listPackage = async (req , res)=>{
    let packageList = await Packages.find();
    let data = packageList.map(item =>{
        return {
            id:item.id,
            name:item.name,
            destination:item.destination,
            region:item.region,
            interest:item.interest
        };
    })
    return res.send({status: true, data}).status(200)
}

export const addPackage = async(req, res)=>{
    try{
        let {
            name, 
            destination, 
            region, 
            packageTypeName,
            packageTypeFeaturedImage,
            interest,
            duration,
            covers,
            description,
            price,
            destinationType,
            destinationName,
        } = req.body
        let packageId = `PACKAGE-${destination.toUpperCase()}-${moment().format('DDMMYYYYHHMMSS')}`;
        let packageTypeId = `PACKAGE-TYPE-${packageTypeName.toUpperCase()}-${moment().format('DDMMYYYYHHMMSS')}`;
        const packages = {
            packageId,
            packageTypeId,
            name,
            destination,
            region,
            interest,
            duration,
            covers,
            description,
            price,
            destinationType,
            destinationName,
            packageTypeName
        }
        const newCollection = new Collection({
            _id: new mongoose.Types.ObjectId(),
            packageTypeId,
            featuredImage: packageTypeFeaturedImage,
            collectionName: packageTypeName
        })
        const newPackage = new Packages({...packages, packageTypeObjRef: newCollection._id})
        newCollection.packages.push(newPackage._id)
        let savedPackage = await newPackage.save();
        let savedCollection = await newCollection.save();
        res.status(200).json({status: true, savedPackage})
    }catch(err){
        console.log(err)
        res.status(500).json({status: false, error: err.message})
    }
}


export const deletePackage = async(req, res) =>{
    try{
        const {id} = req.params;
        const deletePackages = await Packages.deleteOne({id});
        req.send({"status": true, "data":deletePackages});
    }
    catch{
        req.status(500).send("Internal server error")
    }
}