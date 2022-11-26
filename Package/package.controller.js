import moment from 'moment';
import Packages from "./package.model";
import Collection from '../Collections/collection.model';
import mongoose from 'mongoose';

export const listPackage = async (req , res)=>{
    let packageList = await Packages.find();
    let data = packageList.map(item =>{
        return {
            // id:item.id,
            // name:item.name,
            // destination:item.destination,
            // region:item.region,
            // interest:item.interest
            name:item.name, 
            packageId:item.packageId,
            destination:item.destination, 
            region:item.region, 
            packageTypeName:item.packageTypeName,
            packageTypeFeaturedImage:item.packageTypeFeaturedImage,
            interest:item.interest,
            duration:item.duration,
            covers:item.covers,
            description:item.description,
            price:item.price,
            destinationType:item.destinationType,
            destinationName:item.destinationName,
        };
    })
    return res.send({status: true, data}).status(200)
}

export const addPackage = async(req, res)=>{
    try{
        // Fetching all required variable from the req.body
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

        // Fetching package type or collection by name
        const oldCollection = await Collection.findOne({collectionName: packageTypeName.toLowerCase()})

        // Assigning custom package id
        let packageId = `PACKAGE-${destination.toUpperCase()}-${moment().format('DDMMYYYYHHMMSS')}`;

        // For deciding the packageTypeId or new Collection
        let packageTypeId, newCollection;

        if(oldCollection) {
            packageTypeId = oldCollection.packageTypeId
        } else {
            packageTypeId = `PACKAGE-TYPE-${packageTypeName.toUpperCase()}-${moment().format('DDMMYYYYHHMMSS')}`;
            newCollection = new Collection({
                _id: new mongoose.Types.ObjectId(),
                packageTypeId,
                featuredImage: packageTypeFeaturedImage,
                collectionName: packageTypeName
            })
        }

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
            packageTypeName,
            packageTypeObjRef: oldCollection ? oldCollection._id : newCollection._id
        }
        
        const newPackage = new Packages(packages)
        let savedPackage = await newPackage.save();

        if(!oldCollection) {
            newCollection.packages.push(newPackage._id)
            await newCollection.save();
        } else {
            oldCollection.packages.push(newPackage._id);
            await oldCollection.save();
        }
        res.status(200).json({status: true, savedPackage})
    }catch(err){
        console.log(err)
        res.status(500).json({status: false, error: err.message})
    }
}


export const deletePackage = async(req, res) =>{
    try{
        const {packageId} = req.params;
        const deletePackages = await Packages.deleteOne({packageId});
        res.send({"status": true, "data":deletePackages});
    }
    catch{
        res.status(500).send("Internal server error")
    }
}