import ContactUs from "./contactUs.model";
export const listContactUs = async(req, res) =>{
    let contactUsList = await ContactUs.find()
    let data = contactUsList.map(item =>{
        return{
            id:item.id,
            fullName:item.name,
            phoneNumber:item.phoneNumber,
            description:item.description
        };
    })
    return res.send({status: true, data}).status(200)
}


export const addContactUs = async(req, res) =>{
    try{
        let id = + new Date();
        let {body : {fullName = null, phoneNumber = null, description = null } } = req || null;
        const contactUsData = {
            fullName,
            phoneNumber,
            description,
            id
        }
        const newContactUsData = new ContactUs(contactUsData)
        const saveContact = await newContactUsData.save();
        const contactList = await ContactUs.find();
        let cnData = contactList.map(item =>{
            return{
            fullName:item.fullName,
            phoneNumber:item.phoneNumber,
            description:item.description,
            id:item.id
            }
        })
        res.status(200).json({status: true, saveContact})

    }catch(e){
        console.log(e)
    }
} 

