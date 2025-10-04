import React, { useState } from "react";
import Header from "./components/Header";
import ChatScreen from "./components/ChatScreen";
import InputBlock from "./components/InputBlock";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="app-container">
      <Header />
      <ChatScreen messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default App;
