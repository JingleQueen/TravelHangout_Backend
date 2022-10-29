import Express  from "express";
import { listPackage, addPackage } from "./package.controller";

const packRouter = Express.Router();

packRouter
.get('/', listPackage)
.post('/add', addPackage)

export default packRouter;
