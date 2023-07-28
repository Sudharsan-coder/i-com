const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema(
    {
        userName:{ type:String, required:true,unique:true},
        password:{type:String,required:true},
        isAdmin:{
            type:Boolean,
            default:false,
        },
        userBio:{type:String},
        profilePicUrl:{type:[String]}, //array of urls for multiple images
        followersCount:{type:Number,default:0},
        followingCount:{type:Number,default:0},
    }
)

module.exports= mongoose.model("User",UserSchema);