import "./App.css";
import React, { useState, useContext } from "react";
import { ChatContext } from "./context";

const Chat = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState("");

  // Skickar det som skrivs i textfältet
  function prepareToSendMessage(e) {
    e.preventDefault();

    // Tömmer textfältet när man skickat ett meddelande
    setMessage("");
    sendMessage(message);
  }

  // Sparar det som skrivs i textfältet i ett state när man skriver
  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="Chat">
      <div id="messages">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <div>{message}</div>
            </div>
          );
        })}
      </div>
      <form id="form" onSubmit={prepareToSendMessage}>
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
};

export default Chat;
