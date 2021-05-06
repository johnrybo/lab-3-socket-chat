import "./App.css";
import React, { useState, useContext } from "react";
import { ChatContext } from './context'

const Chat = (props) => {
  
  const { messages, sendMessage } = useContext(ChatContext)
  const [message, setMessage] = useState("");

  // Skickar det som skrivs i textfältet
  function sendMessage2(e) {
    e.preventDefault();

    // Tömmer textfältet när man skickat ett meddelande
    setMessage("");

    sendMessage(message)
    // socketRef.current.emit("send message", message);
  }

  // Sparar det som skrivs i textfältet i ett state när man skriver
  function handleChange(e) {
    setMessage(e.target.value);
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
      <form id="form" onSubmit={sendMessage2}>
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