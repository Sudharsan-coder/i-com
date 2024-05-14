const jwt=require("jsonwebtoken")

const TokenVerify=(req,res,next)=>{
    const authHeader=req.headers.token;
    // console.log(authHeader);
    if(authHeader)
    {
        const token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SEC,(err,user)=>{
            if(err)
                res.status(403).json("Token is not valid");
            req.user=user;
            next();
        })
    }
    else
        return res.status(401).json("You are not authenticated!")
}


module.exports=TokenVerify;