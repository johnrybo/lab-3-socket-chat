import "./App.css";
import Aside from "./aside";
import React, { useState, useContext, useEffect, useRef } from "react";
import { ChatContext } from "./context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#f50057",
    border: "none",
    padding: "0.5rem 1rem",
    margin: "0.25rem",
    borderRadius: "3px",
    outline: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
  form: {
    background: "#3f51b5",
    padding: "0.25rem",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    boxSizing: "border-box",
    backdropFilter: "blur(10px)",
  },
  input: {
    border: "none",
    padding: "0 1rem",
    flexGrow: 1,
    borderRadius: "2rem",
    margin: "0.25rem",
    fontSize: "1rem",
    "&:focus": {
      outline: "none",
    },
  },
}));

const Chat = () => {
  const classes = useStyles();
  const { messages, sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const el = useRef(null);
  const inputRef = useRef("")

  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth", inline: "nearest" });
    console.log(message)
  });

  // Skickar det som skrivs i textfältet
  function prepareToSendMessage(e) {
    e.preventDefault();

    // Tömmer textfältet när man skickat ett meddelande
    setMessage(inputRef.current.value)
    sendMessage(message);
    inputRef.current.value = "";
  }

  // Sparar det som skrivs i textfältet i ett state när man skriver
  // function handleChange(e) {
  //   setMessage(e.target.value);
  // }

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
      <form className={classes.form} onSubmit={prepareToSendMessage}>
        <input
          ref={inputRef}
          className={classes.input}
          defaultValue={message}
          // onChange={handleChange}
          placeholder="Say something..."
        />
        <button className={classes.button}>SEND</button>
      </form>
    </div>
  );
};

export default Chat;
