import Express  from "express";
import collectionRouter from "./Collections/collection.routes";
import userRouter from "./User/user.routes";

const apiRouter = Express.Router();

apiRouter.use('/auth', userRouter)
apiRouter.use('/collection', collectionRouter)

export default apiRouter;