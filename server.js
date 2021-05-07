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
  // io.to(socket.id).emit("allRooms", getAllRooms());

  console.log("Client was connected: ", socket.id);

  socket.emit("client id", socket.id);

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

  // Create room
  socket.on("create-room", (data) => {
    socket.leaveAll();
    socket.join(data.room.name),
      () => {
        io.emit("allRooms", getAllRooms());
      };

    rooms.push(data.room);
    console.log(rooms);

    console.log("data.room = " + data.room.name + " " + data.room.password);
    console.log("Rooms: ", io.sockets.adapter.rooms);

    // Välkomnar den anslutna användaren
    socket
      .in(data.room.name)
      .emit("message", `Welcome to this chat, ${data.name}`);
    console.log("Welcome to this chat");

    // Skickar till alla förutom användaren som ansluter
    socket.broadcast
      .in(data.room.name)
      .emit("message", `${data.name} joined this chat!`);

    //socket.to(data.room).emit('joined-room', `a user just joined ${socket.id}`)

    // i join room
  });

  // Join room
  socket.on("join-room", (data) => {
    // leaveall...
    socket.leaveAll();

    // let roomIndex = rooms.findIndex((room) => {
    //   return room.name == data.room.name;
    // });

    if (data.room) {
      socket.join(data.room.name),
        () => {
          io.emit("allRooms", getAllRooms());
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
    }
  });

  // i connection
});

// emit on "join-room", "connection", "disconnected"
function getAllRooms() {
  // io.sockets.adapter.rooms
  return rooms;
}

server.listen(3001, () => console.log("server is running on port 3001"));
