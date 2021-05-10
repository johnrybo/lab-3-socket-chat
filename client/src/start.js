import "./App.css";
import React, { useState, useContext } from "react";
import { ChatContext } from './context'
import { Link } from "react-router-dom";

function Start() {

  const { room, getUsername, joinRoom, setPassword, setRoom } = useContext(ChatContext)

  const [checked, setChecked] = useState(false);

  function askToCreateRoom() {
    joinRoom(room)
  }


  return (
    <div className="Start">
        <form>
            <input onChange={(event) => getUsername(event.target.value)}placeholder="Username"></input>
            <input onChange={(event) => setRoom(event.target.value)}placeholder="Room"></input>

            <label htmlFor="checkbox">Private room?</label>
            <input 
              id="checkbox" 
              type="checkbox" 
              name="Private room" 
              value="Private room" onChange={() => setChecked(!checked)}></input>

            {checked ? <input onChange={(event) => setPassword(event.target.value)}placeholder="Password"></input> : null}

            <Link to={`/${room.name}`}><button onClick={askToCreateRoom}>Create room</button></Link>
        </form>      
    </div>
  )
}

export default Start;