import Express  from "express";
import userRouter from "./User/user.routes";

const apiRouter = Express.Router();

apiRouter.use('/auth', userRouter)

export default apiRouter;