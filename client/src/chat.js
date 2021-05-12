import "./App.css";
import Aside from "./aside";
import React, { useState, useContext, useEffect, useRef } from "react";
import { ChatContext } from "./context";

const Chat = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const el = useRef(null);

  useEffect(() => {
    el.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });

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
      <Aside />
      <div id="messages">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <div>{message}</div>
            </div>
          );
        })}
        <div ref={el} style={{ height: "0", padding: "0" }}></div>
      </div>
      <form id="form" onSubmit={prepareToSendMessage}>
        <input
          id="input"
          value={message}
          onChange={handleChange}
          placeholder="Say something..."
        />
        <button>SEND</button>
      </form>
    </div>
  );
};

export default Chat;
