const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const {
  TokenVerify,
  verifyTokenAndAuthorization,
} = require("../middleware/authMiddleware");
const { sendMail } = require("../services/emailService");

//Add Post
router.post("/create", TokenVerify, async (req, res) => {
  const userId = req.user._id;
  const body = { ...req.body, user: userId };
  const newPost = new Post(body);

  try {
    // Save the new post
    let post = await newPost.save();

    // Populate the 'user' field with the necessary fields
    post = await Post.findById(post._id).populate(
      "user",
      "_id userName profilePicUrl firstName lastName userBio isOnline"
    );

    // Add the post id to the user's collection using updateOne
    await User.updateOne({ _id: userId }, { $push: { posts: post._id } });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get Specific User Posts
router.get("/user/:userId/posts", async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    let posts, totalCount, totalPages, postIds;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User notfound" });
    }
    switch (type) {
      case "myPost":
        postIds = user.posts;
        break;
      case "savedPost":
        postIds = user.savedPost;
        break;
      case "commentedPost":
        postIds = user.commented;
        break;
      case "likedPost":
        postIds = user.liked;
        break;
      default:
        return res.status(400).json({ message: "Invalid post type" });
        
    }
    totalCount = postIds.length;
    totalPages = Math.ceil(totalCount / pageSize);
    posts = await Post.find({ _id: { $in: postIds } })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate(
        "user",
        " _id userName profilePicUrl userBio firstName lastName isOnline"
      );
    res.status(200).json({ totalCount, totalPages, page, pageSize, posts });
  } catch (error) {
    // console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Error fetching user posts" });
  }
});

//Edit Post Endpoint
router.put(
  "/editPost/:userId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const { postId } = req.query;
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, {
        $set: req.body,
      });
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Some thing went wrong. Please try again" });
    }
  }
);

//Save Post Endpoint
router.post(
  "/savePost/:userId/:postId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    try {
      const post = await Post.findById(postId);
      if (post.savedUser.includes(userId)) {
        return res.status(400).json({ message: "Post already saved" });
      }
      post.savedUser.push(userId);
      await post.save();
      const savePost = await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { savedPost: postId },
      });
      res.status(200).json({ message: "Post saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Some thing went wrong. Please try again" });
    }
  }
);

//UnSave Post Endpoint
router.post(
  "/unsavePost/:userId/:postId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    try {
      const post = await Post.findById(postId);
      if (!post.savedUser.includes(userId)) {
        return res.status(400).json({ message: "Post not liked" });
      }
      post.savedUser = post.savedUser.filter(
        (savedId) => savedId.toString() !== userId
      );
      await post.save();
      await User.updateOne(
        { _id: userId },
        {
          $pull: {
            savedPost: postId,
          },
        }
      );
      res.json({ message: "Post unsaved successfully" });
    } catch (error) {
      console.error("Error unsaved post:", error);
      res.status(500).json({ error: "Error unsaved post" });
    }
  }
);

//Get All Post(Main page) && Search Post Endpoint && Tag Post Endpoint
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
        .populate(
          "user",
          " _id userName profilePicUrl userBio firstName lastName isOnline"
        )
        .sort({ $natural: -1 });
    } else if (tag) {
      totalCount = await Post.countDocuments({
        tags: { $in: [tag] },
      });
      totalPages = Math.ceil(totalCount / pageSize);
      posts = await Post.find({
        tags: { $in: [tag] },
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate(
          "user",
          "_id userName profilePicUrl userBio firstName lastName isOnline"
        )
        .sort({ $natural: -1 });
    } else if (search && tag) {
      totalCount = await Post.countDocuments({
        title: { $regex: search, $options: "i" },
        tags: { $in: [tag] },
      });
      totalPages = Math.ceil(totalCount / pageSize);
      posts = await Post.find({
        title: { $regex: search, $options: "i" },
        tags: { $in: [tag] },
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate(
          "user",
          "_id userName profilePicUrl userBio firstName lastName isOnline"
        )
        .sort({ $natural: -1 });
    } else {
      totalCount = await Post.countDocuments();
      totalPages = Math.ceil(totalCount / pageSize);
      posts = await Post.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ $natural: -1 })
        .populate(
          "user",
          "_id userName profilePicUrl userBio firstName lastName isOnline"
        );
    }

    res.status(200).json({ totalCount, totalPages, page, pageSize, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Following Users Post and Following Tags Endpoint
router.get("/followingPost", TokenVerify, async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const user = await User.findById(userId).populate("followings");
    const followingIds = user.followings.map((following) => following._id);
    const totalCount = await Post.countDocuments({
      user: { $in: followingIds },
    });
    const totalPages = Math.ceil(totalCount / pageSize);
    const posts = await Post.find({ user: { $in: followingIds } })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ $natural: -1 })
      .populate(
        "user",
        "_id userName profilePicUrl userBio firstName lastName isOnline"
      );
    res.status(200).json({ totalCount, totalPages, page, pageSize, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//Get Particular Post Endpoint
router.get("/:postid", async (req, res) => {
  const postid = req.params.postid;
  try {
    const postdetails = await Post.findById(postid).populate(
      "user",
      "_id userName profilePicUrl userBio firstName lastName isOnline"
    );
    res.status(200).send(postdetails);
  } catch (err) {}
});

// Add comment
router.post("/:postId/comment", TokenVerify, async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
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
      user: userId,
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
  } catch (err) {
    // console.error("Error adding comment:", error);
    res.json(err);
  }
});

// Post Replay Comment Endpoint
router.post(
  "/:postId/comments/:commentId/replies",
  TokenVerify,
  async (req, res) => {
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
    const post = await Post.findById(postId)
      .populate({
        path: "comments.user",
        select: "_id userName profilePicUrl",
      })
      .sort({ createdAt: -1 });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = post.comments;
    const totalCount = comments.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedComments = comments.slice(startIndex, endIndex);
    res.status(200).json({
      comments: paginatedComments,
      totalCount,
      totalPages,
      page,
      pageSize,
    });
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

    res.status(200).json({
      replies: paginatedReplies,
      totalCount,
      totalPages,
      page,
      pageSize,
    });
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
    const post = await Post.findOne({ _id: postId });
    console.log(post, post.user, userId);
    if (post.user == userId) {
      await Post.deleteOne({ _id: postId });
      await User.updateOne(
        { _id: userId },
        {
          $pull: {
            posts: postId,
          },
        }
      );
      res.status(200).json({ message: "Post Deleted successfully" });
    } else res.status(500).json({ message: "Your not authorizated user" });
  } catch (err) {
    res.status(500).json({ message: "Some went wrong. Please try again." });
  }
});

// Report the Post Endpoint
router.post("/reportPost", async (req, res) => {
  const { message, postUrl } = req.body;

  try {
    await sendMail(
      "pradeepkumar24rk@gmail.com",
      "Report Post Notification",
      `<h5>Post URL: ${postUrl}</h5><p>New report received with the following message:</p><p>${message}</p>`
    );
    res.status(200).json({ message: "Report successfully sent!" });
  } catch (err) {
    console.error("Error while sending email:", err);
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
});

module.exports = router;
