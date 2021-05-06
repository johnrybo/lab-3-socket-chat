const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const rooms = [];

io.on("connection", socket => {

    const { roomId } = socket.handshake.query;
    socket.join(roomId)
    // rooms.push(roomId)
    // console.log(rooms)

    // io.to(socket.id).emit("allRooms", getAllRooms);

    console.log("Client was connected: ", socket.id);

    socket.emit("client id", socket.id);

    // Välkomnar den anslutna användaren
    socket.emit("welcome-message", `Welcome to this chat, ${socket.id}`);
    console.log("Welcome to this chat")
  
    // Skickar till alla förutom användaren som ansluter
    socket.broadcast.emit("joined message", `${socket.id} joined this chat!`);

    // Körs när en client lämnar
    socket.on("disconnect", () => {
      io.in(roomId).emit("message", `${socket.id} just left`);
      console.log("user disconnected");
    });

    // Listen for chat message
    socket.on("send message", message => {
        // Skickar meddelandet till alla inkl avsändaren
        io.in(roomId).emit("message", socket.id + ': ' + message)
        console.log(socket.id)
    })
    
    // Join room
    socket.on('join-room', (data) => {
      
      socket.join(data.room)
      rooms.push(data.room)
      console.log(rooms)

      console.log("Rooms: ", io.sockets.adapter.rooms)

      //socket.to(data.room).emit('joined-room', `a user just joined ${socket.id}`)

      
  })
})

// function getAllRooms() {
//   return rooms;
// }

server.listen(4000, () => console.log("server is running on port 4000"));