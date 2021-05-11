import { Component, createContext } from "react";
import { socket } from "./socket";
import { withRouter } from "react-router-dom";

export const ChatContext = createContext({
  getUsername: () => {},
  createRoom: () => {},
  handleNewMessage: () => {},
  sendMessage: () => {},
  setPassword: () => {},
  setRoom: () => {},
  joinRoom: () => {},
  joinLockedRoom: () => {},
  resetRoom: () => {},
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
    socket.on("message", this.handleNewMessage);
    socket.on("all-rooms", this.updateRoomsList);
    socket.on("disconnect", () => console.log("DISCONNECTED"));
  }

  updateRoomsList = (rooms) => {
    console.log(rooms);
    this.setState({ rooms });
  };

  getUsername = (username) => {
    this.setState({ username });
  };

  // Kanske fixa till denna
  resetRoom = (room) => {
    this.setState({ room });
  };

  setRoom = (name) => {
    this.setState({ room: { ...this.state.room, name } });
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
    this.props.history.push("/" + room.name);
  };

  joinLockedRoom = (room) => {
    const passwordPrompt = prompt("Lösen tack!");

    if (passwordPrompt === room.password) {
      console.log("Korrekt");
      this.joinRoom(room);
    } else {
      alert("Fel lösen");
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
          joinLockedRoom: this.joinLockedRoom,
          resetRoom: this.resetRoom,
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default withRouter(ChatProvider);
