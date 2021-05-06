import React, { useEffect } from "react";
import io from "socket.io-client";
// import { ChatContext } from './context'
import { Link } from "react-router-dom";
import { useSocket } from './context'

function Start() {

const { socketRef, setUsername, setRoom, username, room } = useSocket()
// const socketRef = useRef();
const rooms = ['room1', 'room2']

  useEffect(() => {
    socketRef.current = io.connect("/");
    // socketRef.current.on("allRooms", listRooms);
  }, [socketRef]);

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

  return (
    <div className="Start">
        <form>
            <input onChange={(event) => setUsername(event.target.value)}placeholder="Username"></input>
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