const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {TokenVerify} = require("./verifyToken");

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
        expiresIn: "1d",
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
        expiresIn: "1d",
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
