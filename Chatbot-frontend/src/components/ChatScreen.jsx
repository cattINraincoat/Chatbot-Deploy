import { useState,useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../css/ChatScreen.css";
import InputBlock from "./InputBlock";
import {Button,Typography} from "@mui/material"
import { useRef } from "react";
import { Avatar } from "@mui/material";
import BotIcon from "@mui/icons-material/SmartToy"; // Example bot icon
import UserIcon from "@mui/icons-material/Person"; // Example user ic
import ChatLoader from "./ChatLoader";
import { Checkbox, FormControlLabel } from "@mui/material";
import { baseURL, webhookURL } from "../config";
import axios from 'axios';
import {Tooltip} from "@mui/material"
import ReactMarkdown from 'react-markdown';




// import C
const buttonStyle = {
  padding: "0.4rem 1.2rem",
  backgroundColor: "white",
  color: "#333",
  borderRadius: "10px",
  border: "1px solid #ccc",
  boxShadow: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#eaeaea",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-1px)",
  },
  transition: "all 0.2s ease-in-out"
};





const ChatScreen = ({ messages, setMessages }) => {

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [isLoading,setIsLoading] = useState(false)

  const getBotResponse = async (input) => {
    try{
      const response = await axios.post("http://3.110.156.216/chat",
      {
        "message":input
      })
      if(response.status==200)
      {
        console.log("222222222222222",response.data.response)
        return response.data.response
      }
    }catch(error)
    {
      console.log(error)
    }

  }

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  
    let botReplyText = await getBotResponse(input);
    
    const botMessage = { sender: 'bot', text: botReplyText };
    setMessages(prev => [...prev, botMessage]);
  
    setIsLoading(false);
  };

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        type: "welcome"
      },
    ])
  },[]);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  
  return (
    <div className="chat-screen">
      <div className="chat-messages">
      {messages.map((msg, index) => (
      <div key={index}>
        <div className={`message-card ${msg.sender === "user" ? "user" : "bot"}`}>
          {msg.sender === "bot" && (
            <Avatar sx={{ bgcolor: "#3465E3", marginRight: "12px" }}>
              <BotIcon />
            </Avatar>
          )}
          <div className="message-content">
            
              {msg.type === "welcome" ? (
              <>
                <p className="message-text">
                  Welcome Shivang, What do you wanna talk about?!
                </p>
              </>
            ) : (
              <p className="message-text">
                {msg.text}
              </p>
          )}
           
          </div>


          {msg.sender === "user" && (
            <Avatar sx={{ bgcolor: "#3465E3", marginLeft: "12px" }}>
              <UserIcon />
            </Avatar>
          )}
        </div>
        <hr className="message-separator" />
      </div>
    ))}

    {isLoading && (
      <div className="message-card bot loader">
        <Avatar sx={{ bgcolor: "#3465E3", marginRight: "12px" }}>
          <BotIcon />
        </Avatar>
        <div className="message-content">
          <ChatLoader/>
        </div>
      </div>
)}

      <div ref={chatEndRef} />
      </div>
      <InputBlock input={input} setInput={setInput} onSend={handleSendMessage} />
    </div>
  );
};

export default ChatScreen;





