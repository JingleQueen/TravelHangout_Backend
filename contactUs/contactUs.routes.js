import Express  from "express";
import { addContactUs, listContactUs } from "./contactUs.controller";

const contactUsRouter = Express.Router();

contactUsRouter
.get('/', listContactUs)
.post('/add', addContactUs)

export default contactUsRouter;