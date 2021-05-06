const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
// const cors = require('cors')

const io = new Server(server);

const rooms = [];
// app.use(cors());

io.on("connection", socket => {

    // const { roomId } = socket.handshake.query;
    // socket.join(roomId)
    // console.log(roomId)
    // rooms.push(roomId)
    // console.log(rooms)

    // io.to(socket.id).emit("allRooms", getAllRooms);

    console.log("Client was connected: ", socket.id);

    socket.emit("client id", socket.id);

    // Välkomnar den anslutna användaren
    socket.emit("message", `Welcome to this chat, ${socket.id}`);
    console.log("Welcome to this chat")
  
    // Skickar till alla förutom användaren som ansluter
    socket.broadcast.emit("message", `${socket.id} joined this chat!`);

    // Körs när en client lämnar
    // socket.on("disconnect", () => {
    //   io.in(roomId).emit("message", `${socket.id} just left`);
    //   console.log("user disconnected");
    // });

    // Listen for chat message
    socket.on("send-message", messageObject => {
        // Skickar meddelandet till alla inkl avsändaren
        // console.log(socket.id)
        io.in(messageObject.room).emit("message", socket.id + ': ' + messageObject.message)
    })
    
    // Join room
    socket.on('join-room', (data) => {
      
      socket.join(data.room)
      rooms.push(data.room)
      console.log('data.room = ' + data.room)
      console.log(rooms)

      console.log("Rooms: ", io.sockets.adapter.rooms)

      //socket.to(data.room).emit('joined-room', `a user just joined ${socket.id}`)

      // i join room
  })

  // i connection
})

// emit on "join-room", "connection", "disconnected"
function getAllRooms() {
  // io.sockets.adapter.rooms
  return ["room 1", "room 2"];
}

server.listen(3001, () => console.log("server is running on port 3001"));