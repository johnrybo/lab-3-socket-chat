import { Component, createContext } from "react";

// import { io } from "socket.io-client";
import { socket } from "./socket";

export const ChatContext = createContext({
  getUsername: () => {},
  createRoom: () => {},
  handleNewMessage: () => {},
  sendMessage: () => {},
  setPassword: () => {},
  joinRoom: () => {}
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
    socket.on("rooms-list", this.updateRoomsList);
    // this.socket.on("message", () => console.log('MESSAGE'));
    socket.on("message", this.handleNewMessage);
    socket.on("disconnect", () => console.log("DISCONNECT"));
    socket.on("allRooms", this.updateRoomsList);
    // socket.on("leave-room", this.onLeaveRoom);
  }

  updateRoomsList = (room) => {

    if (this.state.rooms) {
      this.setState({ rooms: [...this.state.rooms, room] });
    }
    
  }

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
    socket.emit("join-room", { name: this.state.username, room });
    console.log(this.state.room)
    this.setState({ messages: [] });
  }

  createRoom = (room) => {
    this.setState({ room });
    socket.emit("create-room", { name: this.state.username, room });
    console.log(this.state.room);
    this.updateRoomsList(this.state.room);
    this.setState({ messages: [] });
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
          createRoom: this.createRoom,
          handleNewMessage: this.handleNewMessage,
          sendMessage: this.sendMessage,
          setPassword: this.setPassword,
          setRoom: this.setRoom,
          joinRoom: this.joinRoom
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
