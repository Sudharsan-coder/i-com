const User = require("../models/User");
const router = require("express").Router();
const {TokenVerify} = require("../middleware/authMiddleware");

//followService
router.put("/",TokenVerify, async (req, res) => {
  try {
    const followerId = req.user._id;
    const followingId = req.query.userid;
    if (!followerId || !followingId) return res.status(401).json("Wrong");
    else {
      await User.findByIdAndUpdate(followerId, {
        $addToSet: { followings: followingId },
      });
      const follower = await User.findByIdAndUpdate(followingId, {
        $addToSet: { followers: followerId },
      });
      const user = await User.find({ _id: followerId });
      res.status(200).json({user,message:`Your started following ${follower.userName}`});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;