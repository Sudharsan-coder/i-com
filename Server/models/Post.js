const mongoose=require("mongoose");

const PostSchema=new mongoose.Schema({
    title:{type:String,require:true},
    content:{type:String},
    tag:{type:Array},
    userName:{type:String,require:true},
    profilePicUrl:{type:String,default:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",require:true},
    likeCount:{type:Number,default:0},
    commentCount:{type:Number,default:0},
    bannerPic:{type:String},
    comments:[
        {
            Name:{
                type:String
            },
            pic:{
                type:String ,default:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            },
            comment:{
                type:String
            }
        }
    ]
    
    
})

module.exports=mongoose.model("Post",PostSchema);