const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

// const cors = require('cors')

const io = new Server(server);

const rooms = [];
// app.use(cors());

io.on("connection", (socket) => {
  console.log("Client was connected: ", socket.id);

  socket.emit("client id", socket.id);
  socket.emit("all-rooms", getAllRooms());

  // Körs när en client lämnar
  // socket.on("disconnect", () => {
  //   io.in(roomId).emit("message", `${socket.id} just left`);
  //   console.log("user disconnected");
  // });

  // Listen for chat message
  socket.on("send-message", (messageObject) => {
    // Skickar meddelandet till alla inkl avsändaren
    // console.log(socket.id)
    io.in(messageObject.room).emit(
      "message",
      messageObject.username + ": " + messageObject.message
    );
  });

  // Join room
  socket.on("join-room", (data) => {
    // leaveall...
    socket.leaveAll();
    socket.emit("all-rooms", getAllRooms());

    // if the room does not exist, store it as a created room

    if (data.room.name) {
      let room = rooms.find((room) => room.name == data.room.name);

      if (!room) {
        rooms.push(data.room);
      }
    }

    // Return if no room was sent from the client
    if (!data.room) return;

    socket.join(data.room.name),
      () => {
        socket.emit("all-rooms", getAllRooms());
      };

    // Välkomnar den anslutna användaren
    socket
      .in(data.room.name)
      .emit("message", `Welcome to this chat, ${data.name}`);
    console.log("Welcome to this chat");

    // Skickar till alla förutom användaren som ansluter
    socket.broadcast
      .in(data.room.name)
      .emit("message", `${data.name} joined this chat!`);

    socket.on("disconnect", () => {
      console.log("User disconnected");

  
    });
  });
});

// emit on "join-room", "connection", "disconnected"
function getAllRooms() {
  // io.sockets.adapter.rooms
  return rooms;
}

server.listen(3001, () => console.log("server is running on port 3001"));
