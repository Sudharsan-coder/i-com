const User = require("../models/User");
const router = require("express").Router();

//followService
router.put("/:follower/:following", async (req, res) => {
  try {
    const followerId = req.params.follower;
    const followingId = req.params.following;
    if (!followerId || !followingId) return res.status(401).json("Wrong");
    else {
      await User.findByIdAndUpdate(
        { _id: followerId },
        { inc: { followingCount: 1 },
        $push:{followings:followingId} }
      );
      await User.findByIdAndUpdate(
        { _id: followingId },
        { inc: { followerCount: 1 },
         $push:{followers:followerId} }
      )
      const user=await User.find();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router;