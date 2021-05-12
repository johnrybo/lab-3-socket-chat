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
  onJoinLockedRoomResponse: () => {},
});

class ChatProvider extends Component {
  state = {
    username: "guest",
    room: {
      name: "",
      password: "",
    },
    rooms: [],
    messages: [],
  };

  componentDidMount() {
    socket.on("connect", () => console.log("CONNECTED"));
    socket.on("message", this.handleNewMessage);
    socket.on("all-rooms", this.updateRoomsList);
    socket.on("disconnect", () => console.log("DISCONNECTED"));
    socket.on("join-locked-room-response", this.onJoinLockedRoomResponse);
  }

  updateRoomsList = (rooms) => {
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
    socket.emit("join-room", { name: this.state.username, room });
  };

  joinLockedRoom = (room, passwordPrompt) => {
    // const passwordPrompt = prompt("Password please!");
    socket.emit("join-room", {
      name: this.state.username,
      room,
      passwordPrompt,
    });
  };

  onJoinLockedRoomResponse = ({ success, room } ) => {

    if (success) {
      console.log('success')
      this.setState({ room });
      this.setState({ messages: [] });
      console.log(this.state.rooms);
      this.props.history.push("/" + room.name);
    } else {
      alert("Wrong password!");
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
          onJoinLockedRoomResponse: this.onJoinLockedRoomResponse,
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default withRouter(ChatProvider);
