import Packages from "./package.model";

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
        let id = + new Date()
        let {body : {name = null, destination = null, region = null, interest = null } } = req ||  null;
        const packages = {
            name,
            destination,
            region,
            interest
        }
        const newPackage = new Packages(packages)
        let savedPackage = await newPackage.save();
        let packageList = await Packages.find()
        let data = packageList.map(item =>{
            return {
                name:item.name,
                destination:item.destination,
                region:item.region,
                interest:item.interest
            };
        })
        res.status(200).json({status: true, data})
    }catch(e){
        console.log(e)
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