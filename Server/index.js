const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors=require('cors');
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());


//Routers
const authRoute=require("./routers/auth");
const postRoute=require("./routers/post");
const followRoute=require("./routers/follow");

//connect the DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.error(err)
  });


//Endpoint call
app.use('/auth',authRoute);
app.use('/post',postRoute);
app.use('./follow',followRoute);


app.listen(5010, () => {
  console.log("Server is running");
});
