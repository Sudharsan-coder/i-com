const router = require("express").Router();
const Message = require("../models/Message");

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

module.exports = router;
