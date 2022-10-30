import User from "./user.model";
import { auth, generateToken, getToken } from "../auth/user.auth";
import {validate} from '../utilities/validates'
let bcrypt = require("bcryptjs");

export const register = async (req, res) =>{
    const userId = Date.now();
    const {
        body :{
            firstName = null,
            lastName = null,
            email = null,
            phoneNumber = null,
            password = null
        } = {},
    } = req || {};
    

    if (!email) {
        return res.status(403).send({ msg: "Email not found" });
      } 
      
const isExist = await User.findOne({email})
if(isExist){
    console.log(`User exist`)
    return res.send({Status:"false", code:"004", msg:"User already exist"});

}
bcrypt.hash(password, 10, async(err, hashedPass)=>{
    if(err){
        return res.json({error:err})
    }
    const user = new User({
        firstName,
        lastName,
        email,
        userId,
        phoneNumber,
        password: hashedPass
    })
    console.log("registation data", user)

    try{
        await user.save();
        console.log("registation successfull")
        return res.json({ status: true, code: "00", msg: "user added successfully" });
    } catch (e) {

        console.log("registation failed")
      return res.json({e});
    }
})
}

export const login = async (req, res) =>{
    const {body :{email = null, password = null } = {}} = req || null;
    if(!email || !password){
        return res.status(403).json({
            status: "false",
            code:"01",
            msg:"Username or password missing",
        });
    }
  //   const isValid = validate(email, "email");
  // if (!isValid) {
  //   return res.status(403).send({ msg: "Email address not valid " });
  // }
  const getUser = await User.findOne({ email });
  if (!getUser) {
    return res
      .status(200)
      .json({ status: false, code: "02", msg: "User not found!" });
  }

  if(await bcrypt.compare(password, getUser.password)){
    console.log("password matched")
    const token = await generateToken(email)
    console.log("Token Generated", token);
    if(!token){
        return res.json({Status:false, msg: "Authentication failed"}).status(501);
    }
    return res.status(200).json({
        status: true,
        code: "00",
        msg:"Login successful",
        accessToken:token,
    });
  } else {
    return res.status(200).json({status:false, code:"05", msg:"Invalid credential"});
  }
}

  export const  updatePassword = async (req, res) =>{
    const {body : {password = null} = {} } = req || {};
    if(!password) {
      return res
      .send({status: false, msg: "Password not found", code:"01"}).status(403);
    }

    const token = await getToken(req);
    if(!token){
      return res
      .status(403)
      .json({ status: false, msg: "Token is required for authentication" });
    }
    console.log("Token fetched from header", token);
    const { email = null } = await auth(token);
    if (!email) return res.status(501).json({ status: false, msg: "Authentication failed" });
    console.log("Token matched and verified", email);
    bcrypt.hash(password, 10, async(err, hashedPass) =>{
      if(err){
        return res.json({
          error:err,
        })
      }
      console.log("password hashed", hashedPass);
      try{
        await User.findOneAndUpdate({email}, {password:hashedPass});
        console.log("password updated")
        return res
        .status(200)
        .json({ status: true, code: "00", msg: "Password updated" });
    } catch (e) {
      return res.json({"status":false,"msg":"Password couldn't be updated"}).status(501);
    }
      
    });

  }
