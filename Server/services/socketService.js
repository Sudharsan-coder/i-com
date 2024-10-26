const { Server } = require("socket.io");
const User = require("../models/User");
const Message = require("../models/Message");
const connectedUsers = new Map();

const socketHandler = (server) => {
  const io = new Server(server, {
    //creating the server in socket
    cors: {
      //it helps to solve the error in connection and operation.
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`${socket.id} user connected`);

    socket.on("user_connected", async (userId) => {
      console.log(`${userId} is now online`);
      connectedUsers.set(userId, socket.id);
      try {
        const res = await User.findByIdAndUpdate(userId, {
          $set: { isOnline: true },
        });
      } catch (err) {
        console.log(err);
      }
      // Broadcast to others that this user is online
      io.emit("user_status", { userId, isOnline: true });
    });

    socket.on("joinRoom", ({ senderId, receiverId }) => {
      const roomId = [senderId, receiverId].sort().join("_");
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    
    });

    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId)
        io.to(receiverSocketId).emit("userTyping", {
          senderId,
          istyping: true,
        });
    });

    socket.on("stopTyping", ({ senderId, receiverId }) => {
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId)
        io.to(receiverSocketId).emit("userStopTyping", {
          senderId,
          istyping: false,
        });
    });

    socket.on("privateMessage", async (messageData) => {
      try {
        const { senderId, receiverId, message } = messageData;
        const roomId = [senderId, receiverId].sort().join("_");
        // console.log(messageData);
        const messageModel = new Message({
          senderId,
          receiverId,
          roomId,
          message,
        });
        await messageModel.save();
        io.to(roomId).emit("new_message", messageData);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("markAsSeen", async ({ senderId, messages }) => {
      const senderSocketId = connectedUsers.get(senderId);
      if (senderSocketId)
        io.to(senderSocketId).emit("messageSeen", { messages });
      try {
        await Message.updateMany(
          { _id: { $in: messages.map((msg) => msg._id) } },
          { $set: { isSeen: true } }
        );
      } catch (err) {
        console.log(err);
      }
    });
    
    socket.on("leaveRoom",({ senderId, receiverId })=>{
      const roomId = [senderId, receiverId].sort().join("_");
      socket.leave(roomId);
      console.log(`User leave room: ${roomId}`);
    })

    socket.on("disconnect", async () => {
      const userId = [...connectedUsers].find(
        ([key, value]) => value === socket.id
      )?.[0];
      if (userId) {
        connectedUsers.delete(userId);
        console.log(`${userId} is now offline`);
        try {
          await User.findByIdAndUpdate(userId, { $set: { isOnline: false } });
        } catch (err) {
          console.log(err);
        }
        // Broadcast to others that this user is offline
        io.emit("user_status", { userId, isOnline: false });
      }
    });
  });
};

module.exports = { socketHandler, connectedUsers };
