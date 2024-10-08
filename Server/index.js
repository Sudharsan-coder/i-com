const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");
const path = require("path");
const { GridFSBucket } = require("mongodb");
const passport = require("passport");
const session = require("express-session")

dotenv.config();
const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET, // This is used to sign the session ID cookie.
    resave: false, // Prevents resaving session if it's not modified.
    saveUninitialized: false, // Doesn't save an empty session.
    cookie: { secure: false }, // For development, set to `false`. For production, set to `true` and use HTTPS.
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,               // Allow credentials (cookies) to be sent
  }));
app.use(express.json({ limit: "3mb" }));
const server = http.createServer(app);
let bucket;

//Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const followRoutes = require("./routes/followRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryPostRoutes = require("./routes/categoryPostRoutes");
const imageRoutes = require("./routes/imageRoutes");

//Services
const socketService = require("./services/socketService");
const oauthService = require('./services/oauthService')

//connect the DB
mongoose
  .connect(process.env.MONGO_URL || "")
  .then((conn) => {
    console.log("DB is connected");
    const db = conn.connection.db;
    bucket = new GridFSBucket(db, { bucketName: "photos" });
  })
  .catch((err) => {
    console.error(err);
  });

//Endpoint call
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/follow", followRoutes);
app.use("/user", userRoutes);
app.use("/categoryPost", categoryPostRoutes);
app.use("/image", imageRoutes);

// Service Call
socketService(server);
oauthService(app)


server.listen(5010, () => {
  console.log("Server is running");
});
