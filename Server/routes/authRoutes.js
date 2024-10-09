const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {TokenVerify} = require("../middleware/authMiddleware");
const {sendMail} = require('../services/emailService')

//Register Endpoint
router.post("/register", async (req, res) => {
  const newUser = new User({
    firstName: req.body.first,
    lastName: req.body.last,
    userName: req.body.username,
    emailId: req.body.emailid,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    // console.log(savedUser);
    const accessToken = jwt.sign({_id:savedUser._id,isAdmin:savedUser.isAdmin}, process.env.ACCESS_TOKEN_SEC, {
      expiresIn: "1d",
    });
    
    const mailOptions = {
      to: req.body.emailid,
      subject: 'Thank you for registering at Nothing’s New!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            .header { background-color: #333333; padding: 20px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 24px; font-weight: normal; }
            .body-content { padding: 20px; text-align: center; }
            .body-content h2 { color: #333333; margin-top: 0; font-size: 22px; }
            .body-content p { color: #555555; font-size: 16px; line-height: 1.6; }
            .footer { background-color: #f4f4f4; padding: 15px; text-align: center; color: #888888; font-size: 12px; }
            .button { display: inline-block; background-color: #008cba; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 20px; font-size: 16px; }
            .button:hover { background-color: #0072a3;color:#ffffff }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Welcome to Nothing's New!</h1>
            </div>
            <div class="body-content">
              <h2>Thank you for joining our community!</h2>
              <p>Dear ${req.body.username},</p>
              <p>
                We are thrilled to have you as part of the Nothing's New community. By joining us, you've become part of an exciting platform to share and discover creative content, meet like-minded people, and stay updated with the latest trends.
              </p>
              <p>Don’t hesitate to dive right in, connect with fellow members, and start contributing your thoughts, posts, and ideas. If you have any questions, feel free to reach out to us.</p>
              <a href="https://nothingsnew.netlify.app" class="button">Explore Now</a>
            </div>
            <div class="footer">
              <p>Nothing's New Community | © 2024 All rights reserved</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    sendMail(mailOptions.to,mailOptions.subject,mailOptions.html)
    
    res.status(201).json({ ...savedUser, accessToken });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email already exists." });
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
    }
  }
});

//Login Endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailid });

    if (!user) {
      return res.status(401).send({ message: "Email is Not exists" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (hashedPassword !== req.body.password) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      { _id: user._doc._id ,isAdmin: user._doc.isAdmin},
      process.env.ACCESS_TOKEN_SEC,
      {
        expiresIn: "7d",
      }
    );
    const refreshToken = jwt.sign(user._doc, process.env.REFRESH_TOKEN_SEC, {
      expiresIn: "3d",
    });
    // console.log(accessToken);
    // res.cookie("a",accessToken+"");
    res.status(200).send({ ...others, accessToken });
  } catch (err) {
    if (err.code === 404) {
      res.status(404).json({ message: "Email not found" });
    } else {
      res.status(500).json(err.message);
    }
  }
});

//ValidateUser Endpoint
router.get("/validateUser", TokenVerify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const accessToken = jwt.sign(
      { _id: user._doc._id,isAdmin: user._doc.isAdmin },
      process.env.ACCESS_TOKEN_SEC,
      {
        expiresIn: "7d",
      }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json({ message: "Not Found" });
  }
});

//Change Password Endpoint
router.put("/changePassword", async (req, res) => {
  if (req.body.password || req.body.hashedPassword) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.updateOne(
      { emailId: req.body.email },
      {
        $set: {
          password: req.body.password,
        },
      },
      { upsert: true }
    );
    if (updatedUser.modifiedCount > 0) {
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found or password is the same" });
    }
  } catch (err) {
    
    res.status(500).json(err);
  }
});

router.post("/checkUserName",async (req,res)=>{
  try {
    const {userName} = req.body
    const user = await User.findOne({userName});
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    return res.status(200).json({ message: 'Username is available' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;
