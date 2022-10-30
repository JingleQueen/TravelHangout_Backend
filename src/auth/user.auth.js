import jwt from 'jsonwebtoken'
const key = "198y4924yiawuhkizuweraiugr73r8qi43griakrkgriagr438r3igfakifg"
export const auth = async(token = null)=>{
    if(!token){
        console.log(`Token required`)
    }
    else{
        try{
            const decoded = jwt.verify(token,key );
            return decoded;
        }
        catch(err){
            return {err:"Token expired"}
        }
    }
}; 

export const generateToken = async (email = null)=>{
    if(!email){
        console.log(`Email not found`);
        return;
    }
    const token = jwt.sign({email}, key, {
        expiresIn: "2h",
    });
    return token;
};

export const getToken = async(req) =>{
    if(!req.header || !req.headers["x-access-token"]){
        return;
    }
    const token = req.headers["x-access-token"];
    console.log(`token found`, token)
    return token
}