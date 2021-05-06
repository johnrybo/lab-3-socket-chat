import "./App.css";

import React, { useRef, useEffect, useContext } from "react";
import io from "socket.io-client";
import { ChatContext } from './context'
import { Link } from "react-router-dom";

function Start() {

const { username, room, getUsername, getRoom } = useContext(ChatContext)
const socketRef = useRef();
const rooms = ['room1', 'room2']

  useEffect(() => {
    socketRef.current = io.connect("/");
    // socketRef.current.on("allRooms", listRooms);
  }, []);

//  function listRooms(rooms) {
//   if(rooms) {
//     return (
//         rooms.map((room, index) => (
//           <Link key={index} to={`/${room}`}><button>Join {room}</button></Link>
//       )) 
//       )
//     }
//   }

    function askToJoinRoom() {
        // e.preventDefault();
        console.log(username, room)
        socketRef.current.emit("join-room", { name: username, room: room })
      }

    /*  chatForm.addEventlistenter('submit', e => {
      e.preventDefault();

      const msg = e.target.elements.msg.value;
     }) 
     
     socket.emit("chatMessage", msg)*/

  return (
    <div className="Start">
        <form>
            <input onChange={(event) => getUsername(event.target.value)}placeholder="Username"></input>
            <input onChange={(event) => getRoom(event.target.value)}placeholder="Room"></input>
            <Link to={`/${room}`}><button onClick={askToJoinRoom}>Create room</button></Link>
        </form>
        {rooms.map((room, index) => (
          <Link key={index} to={`/${room}`}><button>Join {room}</button></Link>
          ))} 
    </div>
  )
}

export default Start;