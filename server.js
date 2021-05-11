const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const rooms = [];

io.on("connection", (socket) => {
  console.log("Client was connected: ", socket.id);

  socket.emit("client id", socket.id);
  socket.emit("all-rooms", getAllRooms());

  // Listen for chat message
  socket.on("send-message", (messageObject) => {
    // Skickar meddelandet till alla inkl avsändaren
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

    console.log(
      "clients in room after connect: " +
        io.sockets.adapter.rooms.get(data.room.name).size
    );
    socket.removeAllListeners("message");

    // Välkomnar den anslutna användaren
    socket
      .in(data.room.name)
      .emit("message", `Welcome to this chat, ${data.name}`);
    console.log("Welcome to this chat");

    // Skickar till alla förutom användaren som ansluter
    socket.to(data.room.name).emit("message", `${data.name} joined this chat!`);

    socket.on("disconnect", () => {
      console.log("User disconnected");

      if (io.sockets.adapter.rooms.get(data.room.name) === undefined) {
        let roomIndex = rooms.findIndex((room) => room.name == data.room.name);
        rooms.splice(roomIndex, 1);
        socket.emit("all-rooms", getAllRooms());
      } else {
        console.log(io.sockets.adapter.rooms.get(data.room.name).size);
      }
    });
  });
});

function getAllRooms() {
  return rooms;
}

server.listen(3001, () => console.log("server is running on port 3001"));
