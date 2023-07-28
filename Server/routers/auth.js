const User=require('../models/User');
const router=require('express').Router();
const CryptoJS=require("crypto-js")

//Register Endpoint
router.post('/register',async (req,res)=>{
    const newUser = new User({
        userName:req.body.username,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    });
    
    try{
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
})


//Login Endpoint
router.post('/login', async (req,res) => {
    try{
        const user=await User.findOne({userName:req.body.username});
        
        {!user && res.status(401).json("Wrong Credentials")}
        
        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        
        {hashedPassword!==req.body.password && res.status(401).json("Wrong Credentials")}
        
        const{password,...others}=user._doc
        res.status(200).json(others);
        
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports=router