import { Component, createContext } from "react";
// import { io } from "socket.io-client";
import { socket } from './socket';

export const ChatContext = createContext({
  getUsername: () => {},
  joinRoom: () => {},
  handleNewMessage: () => {},
  sendMessage: () => {}
});

class ChatProvider extends Component {
  
  state = {
    username: undefined,
    room: undefined,
    rooms: [],
    messages: []
  };

  componentDidMount() {
    socket.on("connect", () => console.log('CONNECTED'));
    socket.on("rooms-list", this.updateRoomsList);
    // this.socket.on("message", () => console.log('MESSAGE'));
    socket.on("message", this.handleNewMessage);
    socket.on("disconnect", () => console.log('DISCONNECT'));
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
    socket.emit("join-room", { name: this.state.username, room });
  };

  // skicka med username också
  sendMessage = (message) => {
    socket.emit("send-message", { message, room: this.state.room });
  }

  handleNewMessage = (message) => {
    console.log(message)
    this.setState({ messages: [...this.state.messages, message] });
    // this.socket.emit("message", message);
  };


  //////////////////////////////////////////////////////////////////////////////
  /* 
  socketRef.current.on("message", (message) => {

    // https://www.techiediaries.com/react-usestate-hook-update-array/
    setMessages((oldMessages) => [...oldMessages, message]);
  });

}, [roomId]);

  function sendMessage(e) {
    e.preventDefault();

    // Tömmer textfältet när man skickat ett meddelande
    setMessage("");
    
    socketRef.current.emit("send message", message);
  } */
  
  //////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getUsername: this.getUsername,
          joinRoom: this.joinRoom,
          handleNewMessage: this.handleNewMessage,
          sendMessage: this.sendMessage
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
