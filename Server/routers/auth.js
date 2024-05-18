const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register Endpoint
router.post("/register", async (req, res) => {
  const newUser = new User({
    firstName: req.body.first,
    lastName: req.body.last,
    profilePicUrl:req.body.profile,
    userName: req.body.username,
    emailId: req.body.emailid,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login Endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailid });

    if (!user) {
      return res.status(401).send("Wrong Credentials");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (hashedPassword !== req.body.password) {
      return res.status(401).json("Wrong Credentials");
    }

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      user._doc,
      process.env.ACCESS_TOKEN_SEC, 
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      user._doc,
      process.env.REFRESH_TOKEN_SEC, 
      {
        expiresIn: "3d",
      }
    );
    // console.log(accessToken);
    // res.cookie("a",accessToken+"");
    res.status(200).send({ ...others, accessToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
