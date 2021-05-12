const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const rooms = [];

// CONNECT
io.on("connection", (socket) => {
  // socket.removeAllListeners("send-message");
  // socket.removeAllListeners("join-room");

  console.log("Client was connected: ", socket.id);
  io.emit("client id", socket.id);

  // Listen for chat message
  socket.on("send-message", (messageObject) => {
    // Skickar meddelandet till alla inkl avsändaren
    io.in(messageObject.room).emit(
      "message",
      messageObject.username + ": " + messageObject.message
    );
  });

  // JOIN ROOM
  socket.on("join-room", (data) => {
    socket.leaveAll();

    // if the room does not exist, store it as a created room
    if (data.room.name) {
      let room = rooms.find((room) => room.name == data.room.name);

      if (!room) {
        rooms.push(data.room);
      }
    }

    // Return if no room was sent from the client
    if (!data.room) return;

    socket.join(data.room.name);
    io.emit("all-rooms", getAllRooms());

    // Tar bort tomma rum
    removeEmptyRooms();

    // Välkomnar den anslutna användaren
    socket
      .in(data.room.name)
      .emit("message", `Welcome to this chat, ${data.name}`);
    console.log("Welcome to this chat");

    // Skickar till alla förutom användaren som ansluter
    socket.to(data.room.name).emit("message", `${data.name} joined this chat!`);

    // DISCONNECT
    socket.on("disconnect", () => {
      console.log("User disconnected");

      socket
        .in(data.room.name)
        .emit("message", `${data.name} left this chat :(`);

      removeEmptyRooms();
    });
  });

  io.emit("all-rooms", getAllRooms());
});

function removeEmptyRooms() {
  for (const room of rooms) {
    if (io.sockets.adapter.rooms.get(room.name) === undefined) {
      let roomIndex = rooms.findIndex((room) => room.name == room.name);
      rooms.splice(roomIndex, 1);
      io.emit("all-rooms", getAllRooms());
    }
  }
}

function getAllRooms() {
  return rooms;
}

server.listen(3001, () => console.log("server is running on port 3001"));
