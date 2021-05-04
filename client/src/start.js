import "./App.css";

import React, { useRef, useEffect, useContext } from "react";
import io from "socket.io-client";
import { ChatContext } from './context'
import { Link } from "react-router-dom";

function Start() {

const { username, room, getUsername, getRoom } = useContext(ChatContext)
const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");
  }, []);

    function askToJoinRoom(e) {
        e.preventDefault();
        console.log(username, room)
        socketRef.current.emit("join-room", { name: username, room: room })
      }

  return (
    <div className="App">
        <form onSubmit={askToJoinRoom}>
            <input onChange={(event) => getUsername(event.target.value)}placeholder="Username"></input>
            <input onChange={(event) => getRoom(event.target.value)}placeholder="Room"></input>
            <Link to={`/${room}`}><button>Join room</button></Link>
        </form>
    </div>
  );
}

export default Start;