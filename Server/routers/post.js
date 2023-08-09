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
router.get('/AllPost',async(req,res)=>{
  const qsearch = req.query.search;
  try{
    let Searched;
    if (qsearch)
      Searched = await Post.find({
        tag: { $in: [qsearch] },
      });
    else 
    Searched=await Post.find().sort({$natural:-1});
      res.status(200).json(Searched)
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Particular Post
router.get("/",async(req,res)=>{
  const postid=req.query.postid;
  try{
  const postdetails=await Post.findById(postid);
  res.status(200).send(postdetails);
  }
  catch(err){

  }
})

//Add comment
router.put("/AddComment", async (req, res) => {
  try {
    const comment=await Post.findByIdAndUpdate(
      { _id: req.query.postid },
      {
        $push: {
          comments: {
            Name: req.body.username,
            comment: req.body.comments,
            pic:req.body.profile,
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