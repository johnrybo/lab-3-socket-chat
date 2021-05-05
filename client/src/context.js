import { Component, createContext } from "react";
import io from "socket.io-client";

export const ChatContext = createContext({
  getUsername: () => {},
  joinRoom: () => {},
  handleNewMessage: () => {}
});

class ChatProvider extends Component {
  socket = io.connect("http://localhost:3000", {
    transport: ["websocket"],
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });

  state = {
    username: undefined,
    room: undefined,
    rooms: [],
    messages: []
  };

  componentDidMount() {
    this.socket.on("connect", () => console.log("CONNECTED!"));
    this.socket.on("rooms-list", this.updateRoomsList);
    this.socket.on("message", () => console.log('MESSAGE'));
    this.socket.on("send-message", () => this.handleNewMessage);
    this.socket.on("disconnect", () => console.log('DISCONNECT'));
    // this.socket.on('rooms-list', this.updateRoomsList);
    // this.socket.on('rooms-list', this.updateRoomsList);
    // this.socket.on('rooms-list', this.updateRoomsList);
    // this.socket.on('rooms-list', this.updateRoomsList);
  }

  updateRoomsList(rooms) {
    this.setState({ rooms });
  };

  getUsername = (username) => {
    this.setState({ username });
  };

  joinRoom = (room) => {
    this.setState({ room });
    this.socket.emit("join-room", { name: this.state.username, room });
  };

  handleNewMessage = (message) => {

    // console.log('HEJ')
    this.setState({ messages: [...this.state.messages, message] });
    this.socket.emit("send-message", message);

  };

  render() {
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getUsername: this.getUsername,
          joinRoom: this.joinRoom,
          handleNewMessage: this.handleNewMessage,
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
