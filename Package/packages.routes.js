import Express  from "express";
import { listPackage } from "./package.controller";

const packRouter = Express.Router();

packRouter
.get('/', listPackage)

export default packRouter;
