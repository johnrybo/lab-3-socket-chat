import React, { useContext } from "react";
import { ChatContext } from "./context";
import { Link } from "react-router-dom";

const Aside = () => {
  const { rooms, joinRoom } = useContext(ChatContext);

  // function askToJoinRoom() {
  //     joinRoom(room)   
  //     console.log(room)
  //   }

  return (
    <div>
      <Link to={"/"}>
        <button>Start</button>
      </Link>
      {rooms.length !== 0 ? rooms.map((room, index) => (
        <Link key={index} to={`/${room.name}`}>
          <button onClick={() => joinRoom(room.name)}>Join {room.name}</button>
        </Link>
      )) : null}
      <h1>Hej</h1>
    </div>
  );
};

export default Aside;
