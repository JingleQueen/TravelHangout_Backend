import  Express  from "express";
import { login, register, updatePassword } from "./user.controllar";
const userRouter = Express.Router();

userRouter
.post('/register', register)
.post('/login', login)
.post('/updatePass', updatePassword)

export default userRouter;