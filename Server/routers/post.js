const router=require("express").Router();
const Post=require('../models/Post');

//Add Post
router.post('/',async(req,res)=>{
    const newPost=new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(201).json(savedPost);
    }
    catch(err){
        res.status(500).json(err);
    }
})


//Get Post
router.get('/:username',async(req,res)=>{
    try{
        const posts=await Post.find({userName:req.params.username});
        res.status(200).json(posts);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//add comment
router.put("/:id",async(req,res)=>{
    try{
        await Post.findByIdAndUpdate({_id : req.params.id},{$push:{comments:{
            Name:req.body.username,
            comment:req.body.comment,
        }}});
        await Post.findByIdAndUpdate({_id : req.params.id},{$inc:{commentCount:1}})
        
        res.status(200).json("Upadated");
    }
    catch(err){
        res.status(500).json(err);
    }
})

//like Endpoint
router.put("/liked/:id",async(req,res)=>{
    try{
        await Post.findByIdAndUpdate({_id : req.params.id},{$inc:{likeCount:1}})
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router