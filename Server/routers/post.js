const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

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

//Get Specific User Posts
router.get("/UserPostFind", async (req, res) => {
  try {
    const posts = await Post.find({ userName: req.query.username });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all post(Main page) && Search post Endpoint
router.get("/AllPost", async (req, res) => {
  const tag = req.query.tag;
  const search = req.query.search;
  try {
    let Searched;
    if(search)
      Searched = await Post.find({title: {$regex: search, $options: 'i'} })  
    else if (tag)
      Searched = await Post.find({
        tag: { $in: [tag] },
      });
    else Searched = await Post.find().sort({ $natural: -1 });
    res.status(200).json(Searched);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/AllPost/:userId", async(req,res) => {
  const userId = req.params.userId;
  console.log(userId);
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize)|| 10;   
  try {
    // const user = await User.findById(userId)
    // .populate('followers');
    const totalCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalCount/pageSize);
    const post = await Post.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({totalCount,totalPages,page,pageSize,post});
  } catch (err) {
    res.status(500).json(err);
  }
})

//Particular Post
router.get("/", async (req, res) => {
  const postid = req.query.postid;
  try {
    const postdetails = await Post.findById(postid);
    res.status(200).send(postdetails);
  } catch (err) {}
});

//Add comment
router.put("/AddComment", async (req, res) => {
  try {
    const comment = await Post.findByIdAndUpdate(
      { _id: req.query.postid },
      {
        $push: {
          comments: {
            Name: req.body.username,
            comment: req.body.comments,
            pic: req.body.profile,
          },
        },
      }
    );
    await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { commentCount: 1 } }
    );

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Like Endpoint
router.put("/liked", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: req.query.postid },
      { $inc: { likeCount: 1 } }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/unliked", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: req.query.postid },
      { $inc: { likeCount: -1 } }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
