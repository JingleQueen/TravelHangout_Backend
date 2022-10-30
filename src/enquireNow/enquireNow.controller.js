import EnquireNow from "./enquireNow.model";

export const listEnquireNow = async(req, res) =>{
    let enquireNowList = await EnquireNow.find()
    let data = enquireNowList.map(item =>{
        return{
            id:item.id,
            name:item.name,
            phoneNumber:item.phoneNumber,
            email:item.email,
            data:item.data
        };
    })
    return res.send({status: true, data}).status(200)
}


export const addEnquireData = async(req, res) =>{
    try{
        let id = + new Date();
        let {body : {name = null, phoneNumber = null, email = null, data = null } } = req || null;
        const enquireData = {
            name,
            phoneNumber,
            email,
            data,
            id
        }
        const newenquireData = new EnquireNow(enquireData)
        const saveEnquire = await newenquireData.save();
        // const enquireList = await EnquireNow.find();
        // let enData = enquireList.map(item =>{
        //     return{
        //     name:item.name,
        //     phoneNumber:item.phoneNumber,
        //     email:item.email,
        //     data:item.data
        //     }
        // })
        res.status(200).json({status: true, saveEnquire})

    }catch(e){
        console.log(e)
    }
} 

