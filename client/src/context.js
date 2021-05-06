import { Component, createContext } from "react";
import io from "socket.io-client";


export const ChatContext = createContext({
    getUsername: () => {},
    setRoom: () => {},
    // ioConnection
});

class ChatProvider extends Component {
  state = {
    username: undefined,
    room: undefined,
    ioConnection: undefined
  };

  
  componentDidMount() {
      // ioConnection = io.connect("/");
      this.setState({ioConnection: io.connect("/", {
        query: this.state.room 
      })}, () => {console.log("connected")})
  }

  getUsername = (username) => {
      this.setState({ username })
  }

  
  setRoom = (room) => {
    this.setState({ room })

  }

  render() {
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getUsername: this.getUsername,
          setRoom: this.setRoom
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
