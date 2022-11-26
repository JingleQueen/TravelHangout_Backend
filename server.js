import express from 'express';
import Mongoose from 'mongoose';
import cors from 'cors';
import apiRouter from '.';
import morgan from 'morgan';
import Packages from './Package/package.model';
const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

let dbUrl;
if (process.env.NODE_ENV === 'development') {
  dbUrl = 'mongodb://localhost:27017/travel-hangouts'
} else {
  dbUrl = "mongodb+srv://TravelHangout:bO55NJBnGVnDRPPn@cluster0.ec8stfm.mongodb.net/?retryWrites=true&w=majority"
}
const dbOption = { useNewUrlParser: true, useUnifiedTopology: true };

//connect database
Mongoose.connect(dbUrl, dbOption);
Mongoose.connection.on("connected", () => {
  console.log("Database connected successfully");
});
const port = 1999
app.listen(port, () => {
  console.log(`server running or port ${port}`)
})

app.get("/", (req, res) => {
  res.send("Welcome to Travel Hangout");
});
app.use('/api', apiRouter);


app.get('/search/:key', async (req, res) => {
  const { key } = req.params;
  const data = await Packages.find(
    {
      "$or": [
        {
          name: {$regex: req.params.key
        }
        }
      ]

}
)
res.send(data)
})