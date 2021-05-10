import React, { useContext, useState } from "react";
import { ChatContext } from "./context";
import { Link } from "react-router-dom";
import LockIcon from '@material-ui/icons/Lock';

const Aside = () => {
  const { rooms, joinRoom, joinLockedRoom, getUsername } = useContext(ChatContext);

  // function askToJoinRoom() {
  //     joinRoom(room)   
  //     console.log(room)
  //   }

  const [changedUsername, setChangedUsername] = useState('');
  

  return (
    <div>
      <Link to={"/"}>

        <button>Start</button>
      </Link>
   
      <input onChange={(event) => setChangedUsername(event.target.value)}placeholder="Username"></input>
      <button onClick={() => getUsername(changedUsername)}>Change username</button>

      {rooms.map((room, index) => (
        !room.password ? 
          <Link key={index} to={`/${room.name}`}>
          <button onClick={() => joinRoom(room.name)}>Join {room.name}</button>
        </Link>
      :  <Link key={index} to={`/${room.name}`}>
      <button onClick={() => joinLockedRoom(room)}>Join {room.name} {<LockIcon/>}</button>
        </Link> 
      ))}
      <h1>Hej</h1>
    </div>
  );
};

export default Aside;
