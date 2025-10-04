import React from "react";
import "../css/InputBlock.css";

const InputBlock = ({ input, setInput, onSend }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="input-box"
        placeholder="Type a message..."
      />
      <button onClick={onSend} className="send-button">
        Send
      </button>
    </div>
  );
};

export default InputBlock;
