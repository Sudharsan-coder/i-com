const router = require("express").Router();
const Post = require("../models/Post");

//Add Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Users Post
router.get("/PostFind/:username", async (req, res) => {
  try {
    const posts = await Post.find({ userName: req.params.username });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add comment
router.put("/AddComment/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            Name: req.body.username,
            comment: req.body.comment,
          },
        },
      }
    );
    await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { commentCount: 1 } }
    );

    res.status(200).json("Upadated");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Like Endpoint
router.put("/liked/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { likeCount: 1 } }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

//Search Endpoint
router.get("/searching", async (req, res) => {
  const qsearch = req.query.search;
  try {
    let Searched;
    if (qsearch)
      Searched = await Post.find({
        tag: { $in: [qsearch] },
      });
    else Searched = await Post.find();
    // const Searched=await Post.find();
    res.status(200).json(Searched);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;