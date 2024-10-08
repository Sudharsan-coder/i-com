const { Server } = require("socket.io");

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
    console.log(`${socket.id} user connected`  );
    socket.on("joinRoom", ({ userId1, userId2 }) => {
      const roomId = [userId1, userId2].sort().join("_");
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });
    socket.on("privateMessage", (messageData) => {
      const {userId1,userId2} = messageData
      const roomId = [userId1, userId2].sort().join("_");
      io.to(roomId).emit("new_message", messageData);
      console.log(messageData);
      
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = socketHandler;
