import "./App.css";
import Start from './start'
import Chat from './chat'
import React from "react";

import { ChatProvider } from './context';

import { Route, Switch } from "react-router-dom";

function App() {

  return (
    <ChatProvider>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Start}/>
        <Route exact path="/:roomId" component={Chat}/>
      </Switch>
    </div>
    </ChatProvider>
  );
}

export default App;