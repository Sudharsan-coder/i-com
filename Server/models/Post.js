const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema],
});

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bannerPic: { type: String },
    comments: [commentSchema],
    savedUser:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },]
  },
  {
    timestamps: true,
  }
);
PostSchema.index({ tags: 1 });
PostSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Post", PostSchema);
