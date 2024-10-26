const router = require("express").Router();
const Message = require("../models/Message");
const mongoose = require("mongoose");

router.get("/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const message = await Message.find({ roomId }).sort("createdAt");
    if (!message) {
      res.status(404).json({ message: "RoomId not Found." });
    }
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Some thing went wrong." });
  }
});

router.get("/pagination/:roomId", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const roomId = req.params.roomId;
    const totalCount = await Message.countDocuments({ roomId });
    const totalPages = Math.ceil(totalCount / pageSize);
    const messages = await Message.find({ roomId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    if (!messages) {
      res.status(404).json({ message: "RoomId not Found." });
    }
    const message = messages.reverse();
    res.status(200).json({ totalCount, totalPages, page, pageSize, message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Some thing went wrong." });
  }
});

router.get("/chats/:userId", async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    // Ensure the userId is a valid ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const totalConversations = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userObjectId }, { receiverId: userObjectId }],
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userObjectId] },
              "$receiverId",
              "$senderId",
            ],
          },
        },
      },
      {
        $count: "totalCount",
      },
    ]);

    const totalCount = totalConversations[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const chats = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userObjectId }, // When user is the sender
            { receiverId: userObjectId }, // When user is the receiver
          ],
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort messages by latest first
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userObjectId] }, // If user is the sender  { $cond: [ <boolean-expression>, <true-case>, <false-case> ] }  { $eq: [ <expression1>, <expression2> ] }
              "$receiverId", // Group by receiverId
              "$senderId", // Otherwise group by senderId
            ],
          },
          unSeen: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ["$isSeen", false] },
                    { $eq: ["$receiverId", userObjectId] },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          lastMessage: { $first: "$$ROOT" }, // Get the last message in each group
        },
      },
      {
        $lookup: {
          from: "users", // Lookup for the other user's details (sender or receiver)
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Unwind to deconstruct the array from the lookup
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          "userDetails._id": 1,
          "userDetails.userName": 1,
          "userDetails.profilePicUrl": 1,
          "userDetails.isOnline": 1,
          roomId: "$lastMessage.roomId",
          message: "$lastMessage.message", // Include last message
          createdAt: "$lastMessage.createdAt", // Include message timestamp
          unSeen: "$unSeen",
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort final result by the latest message
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);

    res.status(200).json({ totalCount, totalPages, page, pageSize, chats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
