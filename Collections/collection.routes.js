import  Express  from "express";
import { addCollection, deleteCollection, listCollection } from "./collection.controller";
import multer from 'multer';

const upload = multer({ dest: './upload'})
const type = upload.single('featuredImage')

const collectionRouter = Express.Router();

collectionRouter
.get('/list', listCollection)
.post('/add', type, addCollection)
.delete('/delete/:id', deleteCollection)

export default collectionRouter;