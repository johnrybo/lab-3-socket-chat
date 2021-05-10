import { Component, createContext } from "react";

// import { io } from "socket.io-client";
import { socket } from "./socket";

export const ChatContext = createContext({
  getUsername: () => {},
  createRoom: () => {},
  handleNewMessage: () => {},
  sendMessage: () => {},
  setPassword: () => {},
  joinRoom: () => {},
  joinLockedRoom: () => {},
});

class ChatProvider extends Component {
  
  state = {
    username: undefined,
    password: undefined,
    room: {
      name: undefined,
      password: undefined,
    },
    rooms: [],
    messages: [],
  };

  componentDidMount() {
    socket.on("connect", () => console.log("CONNECTED"));
    // socket.on("rooms-list", this.updateRoomsList);
    // this.socket.on("message", () => console.log('MESSAGE'));
    socket.on("message", this.handleNewMessage);
   // socket.on("leave-room", this.updateRoomsList);
    socket.on("all-rooms", this.updateRoomsList);
    socket.on("disconnect", () => console.log('DISCONNECTED'));
  }

  updateRoomsList = (rooms) => {
    console.log(rooms);
    this.setState({ rooms });
  };

  getUsername = (username) => {
    this.setState({ username });
  };

  setRoom = (name) => {
    this.setState((prevState) => ({
      room: {
        ...prevState.room,
        name: name,
      },
    }));
  };

  setPassword = (password) => {
    this.setState((prevState) => ({
      room: {
        ...prevState.room,
        password: password,
      },
    }));
  };

  joinRoom = (room) => {
    this.setState({ room });
    console.log(room);
    socket.emit("join-room", { name: this.state.username, room });
    this.setState({ messages: [] });
    this.updateRoomsList(this.state.rooms);
  };

  joinLockedRoom = (room) => {
    const passwordPrompt = prompt("Lösen tack!");

    if (passwordPrompt === room.password) {
      this.joinRoom(room.name)
      console.log('korrekt')
    } else {
      prompt("fel lösen")
    }
  };

  // skicka med username också
  sendMessage = (message) => {
    socket.emit("send-message", {
      message,
      username: this.state.username,
      room: this.state.room.name,
    });
  };

  handleNewMessage = (message) => {
    console.log(message);
    this.setState({ messages: [...this.state.messages, message] });
    // this.socket.emit("message", message);
  };

  render() {
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getUsername: this.getUsername,
          handleNewMessage: this.handleNewMessage,
          sendMessage: this.sendMessage,
          setPassword: this.setPassword,
          setRoom: this.setRoom,
          joinRoom: this.joinRoom,
          joinLockedRoom: this.joinLockedRoom
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
