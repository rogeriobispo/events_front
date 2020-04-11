import React from 'react';
import Routes from './routes'
import Bus from "./utils/bus";
import { Flash } from "./container/message";

window.flash = (message, type = "success") =>
  Bus.emit("flash", { message, type });

function App() {
  return (
    <div className="App container">
      <Flash />
      <Routes />
    </div>
  );
}

export default App;
