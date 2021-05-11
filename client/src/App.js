import "./App.css";
import Start from "./start";
import Chat from "./chat";
import Aside from "./aside";
import React from "react";

import ChatProvider from "./context";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Aside />
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/:roomName" component={Chat} />
        </Switch>
      </div>
    </ChatProvider>
  );
}

export default App;
