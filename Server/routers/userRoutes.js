const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

//Update User password
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updataedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    req.statusCode(200).json(updataedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete User Account
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Your account is deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;