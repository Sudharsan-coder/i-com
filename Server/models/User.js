const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  userName: { type: String, unique: true },
  emailId: { type: String, require: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userBio: { type: String },
  location: { type: String },
  DOB: { type: String },
  skills: { type: Array },
  profilePicUrl: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  commented: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  savedPost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  followingHashTags: {
    type: [String],
    default: [],
  },
  otp: { type: String },
  isOnline: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
