import { Component, createContext } from "react";

export const ChatContext = createContext({
    getUsername: () => {},
    getRoom: () => {}
});

class ChatProvider extends Component {
  state = {
    username: undefined,
    room: undefined
  };

  getUsername = (username) => {
      this.setState({ username })
  }

  
  getRoom = (room) => {
    this.setState({ room })

  }

  render() {
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getUsername: this.getUsername,
          getRoom: this.getRoom
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
