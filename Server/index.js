const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");
const path = require("path");
const { GridFSBucket } = require("mongodb");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();
const app = express();
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL, // Your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
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
const messageRoutes = require("./routes/messageRoutes");

//Services
const { socketHandler } = require("./services/socketService");
const oauthService = require("./services/oauthService");

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
app.use("/message", messageRoutes),
  // Service Call
  socketHandler(server);
oauthService(app);

server.listen(5010, () => {
  console.log("Server is running");
});
