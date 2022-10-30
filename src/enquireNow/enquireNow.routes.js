import Express  from "express";
import { addEnquireData, listEnquireNow } from "./enquireNow.controller";

const enquireNowRouter = Express.Router();

enquireNowRouter
.get('/', listEnquireNow)
.post('/add', addEnquireData)

export default enquireNowRouter;