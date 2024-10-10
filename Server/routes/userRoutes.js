const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  TokenVerify,
  verifyTokenAndAuthorization,
} = require("../middleware/authMiddleware");
const otpGenerator = require("otp-generator");
const mongoose = require("mongoose");
const { sendMail } = require("../services/emailService");
const {connectedUsers} = require('../services/socketService')
//Update User profile
router.put(
  "/updateProfile/:userId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    if (req.body.password || req.body.hashedPassword) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.hashedPassword,
        process.env.PASS_SEC
      ).toString();
    }
    try {
      const updataedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: req.body,
        },
        { upsert: true }
      );
      const user = await User.find({ _id: req.user._id });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Your profile is not updated" });
    }
  }
);

//delete User Account
router.delete(
  "/delete/:userId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await User.deleteOne({ _id: req.user._id });
      res.status(200).json("Your account is deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//Find specific User and searching users
router.get("/", async (req, res) => {
  const id = req.query.id;
  const search = req.query.search;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    let totalCount, totalPages, users;
    if (search) {
      totalCount = await User.countDocuments({
        userName: { $regex: search, $options: "i" },
      });
      totalPages = Math.ceil(totalCount / pageSize);
      users = await User.find({
        userName: { $regex: search, $options: "i" },
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      res.status(200).json({ totalCount, totalPages, page, pageSize, users });
    } else if (id) {
      const userDetails = await User.findById(id);
      if (!userDetails) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, googleId, ...otherDetails } = userDetails._doc;
      if (
        googleId &&
        googleId.length !== 0 &&
        (!password || password.length === 0)
      ) {
        return res.status(200).json({ ...otherDetails });
      }
      if (password) {
        try {
          const hashedPassword = CryptoJS.AES.decrypt(
            password,
            process.env.PASS_SEC
          ).toString(CryptoJS.enc.Utf8);

          return res.status(200).json({ ...otherDetails, hashedPassword });
        } catch (error) {
          console.error("Error decrypting password:", error);
          return res.status(500).json({ message: "Error decrypting password" });
        }
      } else {
        return res.status(200).json({ ...otherDetails });
      }
    } else {
      totalCount = await User.countDocuments();
      totalPages = Math.ceil(totalCount / pageSize);
      users = await User.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      res.status(200).json({ totalCount, totalPages, page, pageSize, users });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all Users
router.get("/all", async (req, res) => {
  try {
    const userdetails = await User.find();
    res.status(200).json(userdetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const ifUserAvailable = await User.findOne({ emailId: email });
    if (!ifUserAvailable) {
      return res
        .status(404)
        .json({
          message: "User not founded. Please entere the registered Email id.",
        });
    }
    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });

    // Send OTP to the user's email
    const to = email;
    const subject = "OTP Verification";
    const html = `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #4CAF50;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password for the account associated with this email address (${email}). If you didn't make this request, you can safely ignore this email.</p>
      <p>To reset your password, please use the following OTP (One-Time Password):</p>
      <h3 style="color: #4CAF50;">${otp}</h3>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you continue to have trouble, feel free to contact our support team for help.</p>
      <p>Best regards,<br/>The icom Team</p>
    </div>`;
    sendMail(to, subject, html);

    // Save OTP in MongoDB
    await User.updateOne({ emailId: email }, { $set: { otp: otp } });
    const user = await User.findOne({ emailId: email });
    console.log(user);
    res.json({ message: "OTP sent successfully", email, otp });
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ message: "Some thing went wrong. Please try again" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, enteredOTP } = req.body;

  // Retrieve stored OTP from MongoDB
  const user = await User.findOne({ emailId: email });
  const storedOTP = user ? user.otp : "";
  // console.log(user);
  // Verify OTP
  if (enteredOTP === storedOTP) {
    res.json({ message: "OTP verification successful" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

//Get Following User Endpoint
router.get("/following", async (req, res) => {
  const userId = req.query.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const user = await User.findById(userId).populate("followings");
    const followingIds = user.followings.map((following) => following._id);
    const totalCount = user.followings.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    const followUsers = await User.find(
      { _id: { $in: followingIds } },
      { userName: 1, profilePicUrl: 1 }
    )
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ $natural: -1 });

    res
      .status(200)
      .json({ totalCount, totalPages, page, pageSize, followUsers });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Not found" });
  }
});

//Get Follower User Endpoint
router.get("/follower", async (req, res) => {
  const userId = req.query.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const user = await User.findById(userId).populate("followers");
    const followerIds = user.followers.map((follower) => follower._id);
    const totalCount = user.followers.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    const followUsers = await User.find(
      { _id: { $in: followerIds } },
      { userName: 1, profilePicUrl: 1 }
    )
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ $natural: -1 });

    res
      .status(200)
      .json({ totalCount, totalPages, page, pageSize, followUsers });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Not found" });
  }
});

router.get('/:userId/status',(req,res)=>{
  const userId = req.params.userId;
  const isOnline = connectedUsers.has(userId);
  res.json({ isOnline });
})

module.exports = router;
