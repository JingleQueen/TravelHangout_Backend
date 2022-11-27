import Express  from "express";
import collectionRouter from "./Collections/collection.routes";
import contactUsRouter from "./contactUs/contactUs.routes";
import enquireNowRouter from "./enquireNow/enquireNow.routes";
import packRouter from "./Package/packages.routes";
import userRouter from "./User/user.routes";

const apiRouter = Express.Router();

apiRouter.use('/auth', userRouter)
apiRouter.use('/collection', collectionRouter)
apiRouter.use('/enquireNow', enquireNowRouter)
apiRouter.use('/packages', packRouter)
apiRouter.use('/contactUs', contactUsRouter)

export default apiRouter;