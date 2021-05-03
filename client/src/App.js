import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function App() {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      // console.log("here");
      receivedMessage(message);
    });
  }, []);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="App">
      <div id="messages">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <div>{message.body}</div>
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

export default App;
