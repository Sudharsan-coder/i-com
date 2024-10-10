const {passport} = require("../config/oauthConfig");
const jwt = require("jsonwebtoken");
const {TokenVerify} = require("../middleware/authMiddleware");
const User = require("../models/User");

const initializeOAuth = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: [ "email","profile"] })
    //The scope parameter specifies what information you're asking permission to access from the user's Google account
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failure",
    }),
    (req, res) => {
      const token = jwt.sign(req.user, process.env.ACCESS_TOKEN_SEC, {
        expiresIn: "1d",
      });
      res.redirect(`${process.env.CLIENT_BASE_URL}/auth/google/success?token=${token}`);
    }
  );
  
  // Step 3: Success Route to Send User Data
  app.get("/auth/google/success",TokenVerify, async(req, res) => {
    try {
      const accessToken = jwt.sign({_id:req.user._doc._id}, process.env.ACCESS_TOKEN_SEC, {
        expiresIn: "1d",
      });
      res.status(200).json({...req.user,accessToken});
      if(!req.user) 
      res.status(404).json({message:"User Not Found. Please login."})
    } catch (err) {
      res.status(500).json({ message: "Some went wrong. Please try again." });
    }
  });
  
  app.get("/auth/google/failure",(req,res)=>{
    res.redirect(`${process.env.CLIENT_BASE_URL}/sign_up`)
  });
  
  app.get('/auth/google/logout', (req, res) => {
    // Handle Google OAuth logout
    req.logout((err) => {
      if (err) {
        console.log("Logout Error:", err);
        return res.status(500).json({ message: "Failed to log out" });
      }
      // Destroy the session and clear cookies
      req.session.destroy((err) => {
        if (err) {
          console.log("Session Destroy Error:", err);
          return res.status(500).json({ message: "Failed to destroy session" });
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.status(200).json({ message: "Successfully logged out" });
      });
    });
  });
  
};

module.exports = initializeOAuth;
