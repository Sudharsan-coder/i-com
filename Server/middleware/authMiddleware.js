const jwt = require("jsonwebtoken");

const TokenVerify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SEC, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Token is expired. Please login again." });
        } else {
          return res
            .status(403)
            .json({ message: "Token is not valid. Please login." });
        }
      }
      req.user = user;
      next();
    });
  } else return res.status(401).json({ message: "You are not authenticated!" });
};

const verifyTokenAndAuthorization=(req,res,next)=>{
  TokenVerify(req,res,()=>{                                             //Verifying the token then-get id === id value of params then move to api  
  // console.log(req.user._id+" "+req.params._id);
  
      if(req.user._id === req.params.userId || req.user.isAdmin)
      {
          next();
      }
      else{
          res.status(403).json({message:"You are not allowed to do that!"});
      }
  })
}

const verifyTokenAndAdmin=(req,res,next)=>{
  TokenVerify(req,res,()=>{
      if(req.user.isAdmin)
      {
          next();
      }
      else{
          res.status(403).json({message:"You are not allowed to do that!"});
      }
  })
}

module.exports = {TokenVerify,verifyTokenAndAdmin,verifyTokenAndAuthorization};
