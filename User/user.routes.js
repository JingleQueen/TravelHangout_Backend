import  Express  from "express";
import { sendOtp } from "../OTP/otp.controller";
import { login, register, updatePassword } from "./user.controllar";
const userRouter = Express.Router();

userRouter
.post('/register', register)
.post('/login', login)
.post('/updatePass', updatePassword)
.post('/sendOtp', sendOtp)

export default userRouter;