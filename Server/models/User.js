const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema(
    {
        firstName:{type:String,require:true},
        lastName:{type:String,require:true},
        userName:{ type:String, required:true,unique:true},
        emailId:{type:String,require:true,unique:true},
        password:{type:String,required:true},   
        isAdmin:{
            type:Boolean,
            default:false,
        },
        userBio:{type:String},
        profilePicUrl:{type:[String]}, //array of urls for multiple images
        followersCount:{type:Number,default:0},
        followers:{type:Array},
        followingCount:{type:Number,default:0},
        followings:{type:Array},
    }
)

module.exports= mongoose.model("User",UserSchema);