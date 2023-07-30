const mongoose=require("mongoose");

const PostSchema=new mongoose.Schema({
    title:{type:String,require:true},
    content:{type:String},
    tag:{type:Array},
    userName:{type:String,require:true},
    likeCount:{type:Number,default:0},
    commentCount:{type:Number,default:0},
    comments:[
        {
            Name:{
                type:String
            },
            comment:{
                type:String
            }
        }
    ]
    
    
})

module.exports=mongoose.model("Post",PostSchema);