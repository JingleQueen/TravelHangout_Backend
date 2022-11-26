import Express  from "express";
import { listPackage, addPackage, deletePackage } from "./package.controller";

const packRouter = Express.Router();

packRouter
.get('/', listPackage)
.post('/add', addPackage)
.delete('/delete/:packageId', deletePackage)

export default packRouter;
