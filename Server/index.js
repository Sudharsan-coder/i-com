const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const http = require("http");
const path = require('path');

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json({limit:"3mb"}));
const server = http.createServer(app);

//Routers
const authRoute=require("./routers/auth");
const postRoute=require("./routers/post");
const followRoute=require("./routers/follow");
const userRoute=require("./routers/userRoutes");
const socketHandler = require("./routers/socket");

//connect the DB
mongoose
.connect(process.env.MONGO_URL||"")
.then(() => {
  console.log("DB is connected");
})
.catch((err) => {
  console.error(err)
});

//Endpoint call
app.use('/auth',authRoute);
app.use('/post',postRoute);
app.use('/follow',followRoute);
app.use('/user',userRoute);

app.use(express.static(path.join(__dirname, 'Client/build')));
// Catch-all route to serve the React app (BrowserRouter handles client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

socketHandler(server);
server.listen(5010, () => {
  console.log("Server is running");
});
