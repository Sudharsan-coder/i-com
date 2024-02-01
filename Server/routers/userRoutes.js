const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const TokenVerify = require("./verifyToken");

//Update User profile
router.put("/:id", async (req, res) => {
  if (req.body.password || req.body.hashedPassword) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.hashedPassword,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updataedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    const user =await User.find({_id:req.params.id})
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete User Account
router.delete("/delete",TokenVerify, async (req, res) => {
  try {
    await User.deleteOne({_id: req.user._id});
    res.status(200).json("Your account is deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Find specific User and searching users
router.get("/",async(req,res)=>{
const username=req.query.username;
const search=req.query.search;
  try{
  if(search){
    const Search=await User.find({ userName: { $regex: search, $options: "i" } });
    res.status(200).json(Search);
  }
  else if(username){
    const userdetails=await User.findOne({userName:username});
    const hashedPassword = CryptoJS.AES.decrypt(
        userdetails.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);
    const {password,...others}=userdetails._doc
    res.status(200).json({...others,hashedPassword});
  }
  else{
      const user=await User.find();
      res.status(200).json(user);
  }
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Get all Users
router.get("/all",async(req,res)=>{
    try{
    const userdetails=await User.find();
    res.status(200).json(userdetails);
    }
    catch(err){
      res.status(500).json(err);
    }
})
module.exports = router;