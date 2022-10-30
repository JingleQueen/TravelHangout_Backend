import User from "../User/user.model";
import sendmail from "../utilities/sendmail";
import { validate } from "../utilities/validates";
import OTP from "./otp.model";


export const sendOtp = async(req, res) =>{
    const { body : {email = null, verifyEmail = false} = {} } = req || {};
    if(!email){
        return res
            .json({status :false, msg :" email address not found"})
            .status(403);
    }
    const otp = Math.floor(99999 + Math.random() * 900000);
    const isExist = await OTP.findOne({email});
    const isValid = validate(email, "email");

    if(isValid){
        if(isExist){
            await OTP.findOneAndUpdate({email}, {otp});
        }else{
            if(!verifyEmail){
                let otpData = {
                    email,
                    otp,
                };
                let newOtp = new OTP(otpData);
                await newOtp.save();
            } else{
                return res
                .json({ status: false, code: "004", msg: "You are not registered" })
                .status(200);
            }
        }
    }else{
        return res.status(403).json({ msg: "Invalid Character on email " });
    }

    const subject = "Verify your email";
    const text = `Your email verification code is ${otp}`;

    try{
        await sendmail(subject, text, email);
        return res.status(200).json({ status: true, msg: "OTP sent successfully" });
    }catch (e){
        return res.status(501).json({ status: false, msg: "OTP sending failed" });
    }
};


export const verifyOtp = async (req, res) => {
    const { body : {email = null, otp = null} = {} } = req ||{};
    if(!email || !otp){
        return res
        .status(403)
        .json({ status: false, msg: "Either email or otp missing" });
    }
    const isValid = validate(email, "email");
    if (!isValid) {
        return res
          .json({ status: false, code: "04", msg: "invalid email address" })
          .status(403);
      }
      const findEmail = await OTP.findOne({email})
      if(findEmail){
        if(findEmail.otp == otp){
            const currentDate = +new Date();
            const updatedAt = +new Date(findEmail.updatedAt);
            const msDifference = currentDate - updatedAt;
            const minutes = Math.floor(msDifference / 1000 / 60);

            if(minutes > 5){
                await OTP.findOneAndDelete({email});
                return res
                .json({
                    status: false,
                    code: "04",
                    msg: "OTP expired. Generate new one.",
                  })
                  .status(400);
            }
            const token = await generateToken(email);
            await User.findOneAndUpdate({email})
            await OTP.findOneAndDelete({email});

            return res
            .json({ status: true, code: "00", msg: "OTP verified", token })
            .status(200);
        }else{
            return res
             .json({ status: false, code: "01", msg: "OTP verification failed" })
             .status(200);
        }
      } else {
        return res
          .json({
            status: false,
            code: "03",
            msg: "email not found in database record",
          })
          .status(501);
      }



}

