import  express  from 'express';
import  Mongoose  from 'mongoose';
import cors from 'cors';
import apiRouter from '.';
const app = express();
app.use(cors())
app.use(express.json());
const dbUrl = "mongodb+srv://TravelHangout:bO55NJBnGVnDRPPn@cluster0.ec8stfm.mongodb.net/?retryWrites=true&w=majority"
const dbOption = { useNewUrlParser: true, useUnifiedTopology: true };

//connect database
Mongoose.connect(dbUrl, dbOption);
Mongoose.connection.on("connected", () => {
  console.log("Database connected successfully");
});
const port = 1999
app.listen( port, () =>{
    console.log(`server running or port ${port}`)
})

app.get("/", (req, res) => {
    res.send("Welcome to Travel Hangout");
  });
app.use('/api', apiRouter);