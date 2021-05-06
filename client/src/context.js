import React, { useContext, useRef, useEffect, useState } from 'react'
import io from 'socket.io-client'

export const ChatContext = React.createContext()

export function useSocket() {
  return useContext(ChatContext)
}

export function ChatProvider({ roomId, children }) {

  const [socket, setSocket] = useState("")
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")


  const socketRef = useRef();

  useEffect(() => {
    
    socketRef.current = io.connect("/", {
      query: { roomId }
    });
    
    // const newSocket = io(
    //   'http://localhost:5000',
    //   { query: { roomId } }
    // )∏

    setSocket(socketRef)

    return () => socket.close()
  }, [roomId, socket])

  return (
    <ChatContext.Provider 
    value={
      socket,
      username, 
      room,
      setUsername, 
      setRoom
      }>
      {children}
    </ChatContext.Provider>
  )}
  


// import { Component, createContext } from "react";

// export const ChatContext = createContext({
//     getUsername: () => {},
//     getRoom: () => {}
// });

// class ChatProvider extends Component {
//   state = {
//     username: undefined,
//     room: undefined
//   };

//   getUsername = (username) => {
//       this.setState({ username })
//   }

  
//   getRoom = (room) => {
//     this.setState({ room })

//   }

//   render() {
//     return (
//       <ChatContext.Provider
//         value={{
//           ...this.state,
//           getUsername: this.getUsername,
//           getRoom: this.getRoom
//         }}
//       >
//         {this.props.children}
//       </ChatContext.Provider>
//     );
//   }
// }

// export default ChatProvider;