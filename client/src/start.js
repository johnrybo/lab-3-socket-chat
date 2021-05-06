import "./App.css";

import React, { useContext } from "react";
import { ChatContext } from './context'
import { Link } from "react-router-dom";

function Start() {

const { username, room, getUsername, setRoom, ioConnection } = useContext(ChatContext)
const rooms = ['room1', 'room2']

//   function listRooms(rooms) {

//   if(ioConnection) {
//     if(rooms) {
//         //     return (
//         //         rooms.map((room, index) => (
//         //           <Link key={index} to={`/${room}`}><button>Join {room}</button></Link>
//         //       )) 
//         //       )
//         //     }
//         //   }
// } 
  

    function askToJoinRoom() {
        console.log(username, room)
        ioConnection.emit("join-room", { name: username, room: room })
      }

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