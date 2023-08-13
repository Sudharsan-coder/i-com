const User = require("../models/User");
const router = require("express").Router();

//followService
router.put("/", async (req, res) => {
  try {
    const followerName = req.query.follower;
    const followingName = req.query.following;
    if (!followerName || !followingName) return res.status(401).json("Wrong");
    else {
     const follower= await User.findOneAndUpdate(
        { userName: followerName },
        { $inc: { followingsCount: 1 },
        $push:{followings:followingName} }
      );
    const following=  await User.findOneAndUpdate(
        { userName: followingName },
        { $inc: { followersCount: 1 },
         $push:{followers:followerName} }
      )
      const user=await User.find({userName:followerName});
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router;