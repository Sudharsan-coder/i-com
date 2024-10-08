const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { TokenVerify, verifyTokenAndAuthorization } = require("../middleware/authMiddleware");

// Get Top 10 Most Used Categories (Tags) in Last 7 Days
router.get("/topCategory", async (req, res) => {
  try {
    // Get the date 7 days ago
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    // Find posts in the last 7 days and aggregate tags
    const topTags = await Post.aggregate([
      {
        // Match posts created within the last 7 days
        $match: {
          createdAt: { $gte: last7Days },
        },
      },
      {
        // Unwind the tags array (if a post has multiple tags, it will create separate documents for each tag)
        $unwind: "$tags",
      },
      {
        // Group by tag and count occurrences
        $group: {
          _id: "$tags", // Group by tag name
          count: { $sum: 1 }, // Count how many times each tag is used
        },
      },
      {
        // Sort by count in descending order
        $sort: { count: -1 },
      },
      {
        // Limit the result to 10
        $limit: 15,
      },
    ]);

    // Send the top tags as response
    res.status(200).json(topTags);
  } catch (err) {
    res.status(500).send(err);
  }
});


// GET top 5 most liked posts
router.get("/topLikedPosts", async (req, res) => {
  try {
    const topLikedPosts = await Post.find({}, { _id: 1, title: 1 })
      .sort({ likes: -1 }) // Sort by likes in descending order
      .limit(5); // Limit the results to the top 5
    res.status(200).json(topLikedPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top liked posts", error });
  }
});

module.exports = router;
