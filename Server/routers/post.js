const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const TokenVerify = require("./verifyToken");

//Add Post
router.post("/create", TokenVerify, async (req, res) => {
  const newPost = new Post(req.body);
  console.log(req.user);
  const userId = req.user._id;

  try {
    await newPost.save(); // Save the new post

    // Add the post id to the user's collection using updateOne
    await User.updateOne({ _id: userId }, { $push: { posts: newPost._id } });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Specific User Posts
router.get("/user/:userId/posts", async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "userName profilePicUrl");

    res.json({ posts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Error fetching user posts" });
  }
});

//Get all post(Main page) && Search post Endpoint
router.get("/", async (req, res) => {
  const tag = req.query.tag;
  const search = req.query.search;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    let posts, totalCount, totalPages;
    if (search) {
      totalCount = await Post.countDocuments({
        title: { $regex: search, $options: "i" },
      });
      totalPages = Math.ceil(totalCount / pageSize);
      posts = await Post.find({ title: { $regex: search, $options: "i" } })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("user", "userName profilePicUrl")
        .sort({ $natural: -1 });
    } else if (tag) {
      totalCount = await Post.countDocuments({
        tag: { $in: [tag] },
      });
      totalPages = Math.ceil(totalCount / pageSize);
      posts = await Post.find({
        tag: { $in: [tag] },
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("user", "userName profilePicUrl")
        .sort({ $natural: -1 });
    } else {
      totalCount = await Post.countDocuments();
      totalPages = Math.ceil(totalCount / pageSize);
      posts = await Post.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ $natural: -1 })
        .populate("user", "userName profilePicUrl");
    }

    res.status(200).json({totalCount, totalPages, page, pageSize, posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Following Post Endpoint
router.get("/followingPost", TokenVerify, async (req, res) => {
  const userId = req.user._id;
  const userid2 = "65aca91a243715df848816b7";
  console.log(userid2);
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const user = await User.findById(userId).populate("followings");
    console.log(user);

    const followingIds = user.followings.map((following) =>
      following._id
    );
    // const followingIds = [userId,userId2];
    console.log(followingIds);

    const totalCount = await Post.countDocuments({
      user: { $in: followingIds },
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    const posts = await Post.find({ user: { $in: followingIds } });
    // .skip((page - 1) * pageSize)
    // .limit(pageSize)
    // .sort({ createdAt: -1 })
    // .populate("user", "userName profilePicUrl");

    res.status(200).json({ totalCount, totalPages, page, pageSize, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get Particular Post Endpoint
router.get("/:postid", async (req, res) => {
  const postid = req.params.postid;
  try {
    const postdetails = await Post.findById(postid);
    res.status(200).send(postdetails);
  } catch (err) {}
});

// Add comment
router.post("/:postId/comment", TokenVerify, async (req, res) => {
  const { postId } = req.params;
  const { user, text } = req.body;
  const userId = req.user._id;
  // console.log(req.user);

  try {
    // Find the post based on the postId
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Create a new comment
    const newComment = {
      user,
      text,
    };

    // Add the comment to the post's comments array
    post.comments.push(newComment);

    // Save the post with the new comment
    await post.save();
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          commented: post._id,
        },
      }
    );

    res.status(201).json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Error adding comment" });
  }
});

// Post Replay Comment Endpoint
router.post("/:postId/comments/:commentId/replies", TokenVerify, async (req, res) => {
    const { postId, commentId } = req.params;
    const { user, text } = req.body;
    const userId = req.user._id;

    try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const reply = {
        user,
        text,
      };

      comment.replies.push(reply);
      await post.save();
      await User.updateOne(
        { _id: userId },
        {
          $push: {
            commented: post._id,
          },
        }
      );

      res.json({ post });
    } catch (error) {
      console.error("Error adding reply comment:", error);
      res.status(500).json({ error: "Error adding reply comment" });
    }
  }
);

// Get Comment Endpoint
router.get("/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const post = await Post.findById(postId).populate({
      path: "comments.user",
      select: "userName profilePicUrl",
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = post.comments;
    const totalCount = comments.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedComments = comments.slice(startIndex, endIndex);
    res.status(200).json({ comments: paginatedComments,totalCount, totalPages, page, pageSize });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Replay Comment Endpoint
router.get("/:postId/comments/:commentId/replies", async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.find((c) => c._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const totalCount = comment.replies.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedReplies = comment.replies.slice(startIndex, endIndex);

    res.status(200).json({ replies: paginatedReplies,totalCount, totalPages, page, pageSize });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Post Like Endpoint
router.post("/like/:postId", TokenVerify, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id; // Assuming you store user information in req.user after authentication

  try {
    const post = await Post.findById(postId);

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post already liked" });
    }

    post.likes.push(userId);
    await post.save();
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          liked: post._id,
        },
      }
    );

    res.json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Error liking post" });
  }
});

router.post("/unlike/:postId", TokenVerify, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id; // Assuming you store user information in req.user after authentication

  try {
    const post = await Post.findById(postId);

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post not liked" });
    }

    post.likes = post.likes.filter((likeId) => likeId.toString() !== userId);
    await post.save();
    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          liked: post._id,
        },
      }
    );

    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ error: "Error unliking post" });
  }
});

// Deleting the Post EndPoint
router.delete("/delete/:postid", TokenVerify, async (req, res) => {
  const postId = req.params.postid;
  const userId = req.user._id;
  try {
    await Post.deleteOne({ _id: postId });
    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          posts: postId,
        },
      }
    );
    res.status(200).send("Deleted successfully");
  } catch (err) {
    res.status(500).send("Not deleted");
  }
});

module.exports = router;
