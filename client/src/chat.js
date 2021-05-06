import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from './context'

const Chat = (props) => {
  
  const { ioConnection, room, setRoom } = useContext(ChatContext)

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {

    setRoom(props.match.params)
    // Uppdaterar statet "messages" med ett nytt message när någon skickat ett meddelande
    ioConnection.on("message", (message) => {

    setMessages((oldMessages) => [...oldMessages, message]);
});  
});
    
  // Skickar det som skrivs i textfältet
  function sendMessage(e) {
    e.preventDefault();

    // Tömmer textfältet när man skickat ett meddelande
    setMessage("");
    
    ioConnection.emit("send message", message);
  }

  // Sparar det som skrivs i textfältet i ett state när man skriver
  function handleChange(e) {
    setMessage(e.target.value);
  }

  if(!ioConnection) {
      return <></>
  } 

  return (
    <div className="App">
      <div id="messages">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              {/* <div>{clientID}</div> */}
              <div>{message}</div>
            </div>
          );
        })}
      </div>
      <form id="form" onSubmit={sendMessage}>
        <input
          id="input"
          value={message}
          onChange={handleChange}
          placeholder="Say something..."
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Chat;

// https://www.youtube.com/watch?v=E4V6nbP_NoQ