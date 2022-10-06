import  Express  from "express";
import { addCollection, deleteCollection, listCollection } from "./collection.controller";

const collectionRouter = Express.Router();

collectionRouter
.get('/list', listCollection)
.post('/add', addCollection)
.delete('/delete/:id', deleteCollection)

export default collectionRouter;