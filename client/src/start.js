import "./App.css";
import React, { useState, useContext } from "react";
import { ChatContext } from './context'
import { Link } from "react-router-dom";

function Start() {

  const { rooms, getUsername, joinRoom } = useContext(ChatContext)
  const [room, setRoom] = useState("");

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
    console.log(room)
    joinRoom(room)
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
            <input onChange={(event) => setRoom(event.target.value)}placeholder="Room"></input>
            <Link to={`/${room}`}><button onClick={askToJoinRoom}>Create room</button></Link>
        </form>
        {rooms.map((room, index) => (
          <Link key={index} to={`/${room}`}><button>Join {room}</button></Link>
          ))} 
    </div>
  )
}

export default Start;