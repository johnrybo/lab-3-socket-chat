const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", socket => {

    console.log("Client was connected: ", socket.id);

    // Välkomnar den anslutna användaren
    socket.emit("welcome-message", "Welcome");
  
    // Skickar till alla förutom användaren som ansluter
    socket.broadcast.emit("user-connected", socket.id);
  
    // Körs när en client lämnar
    socket.on("disconnect", () => {
      io.emit("message", "A user has left the chat");
      console.log("user disconnected");
    });
    // Listen for chat message
    socket.on("send message", message => {
        // Skickar meddelandet till alla inkl avsändaren
        io.emit("message", message)
    })
})

server.listen(4000, () => console.log("server is running on port 4000"));