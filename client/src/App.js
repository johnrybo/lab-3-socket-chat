import "./App.css";
// import Start from "./start";
import Chat from "./chat";
import React from "react";
import Rooms from './rooms'

import ChatProvider from "./context";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={Start} /> */}
          <Route exact path="/" component={Rooms} />
          <Route exact path="/:roomName" component={Chat} />
        </Switch>
      </div>
    </ChatProvider>
  );
}

export default App;
