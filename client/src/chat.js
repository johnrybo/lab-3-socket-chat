import "./App.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import { ChatContext } from './context'

const Chat = (props) => {
    const { username } = useContext(ChatContext)


  const { roomId } = props.match.params;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // https://dmitripavlutin.com/react-useref-guide/
  const socketRef = useRef();

  // https://dmitripavlutin.com/react-useeffect-explanation/
  useEffect(() => {
    //socketRef.current = io.connect("/");

    socketRef.current = io.connect("/", {
      query: { roomId }
    });

    // Uppdaterar statet "messages" med ett nytt message när någon skickat ett meddelande
    socketRef.current.on("message", (message) => {

      // https://www.techiediaries.com/react-usestate-hook-update-array/
      setMessages((oldMessages) => [...oldMessages, message]);
    });

    socketRef.current.emit("join-room", { name: 'John', room: "admin" })

  }, [roomId]);

  // Skickar det som skrivs i textfältet
  function sendMessage(e) {
    e.preventDefault();

    // Tömmer textfältet när man skickat ett meddelande
    setMessage("");
    
    socketRef.current.emit("send message", message);
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
              <div>{username}</div>
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