import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";
import SpeechRecorder from "./SpeechRecorder";
import { FaRobot } from "react-icons/fa";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const savedChats = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    setMessages(savedChats);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/query`, {
        user_query: input,
      });

      const botMessage = {
        role: "bot",
        content: response.data,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (response.data.type) {
        navigate("/result", { state: { result: response.data } });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch data from backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) handleSend();
  };

  const renderMessage = (msg, index) => {
    const isUser = msg.role === "user";
    return (
      <div
        key={index}
        className={`message ${isUser ? "user-message" : "bot-message"}`}
      >
        <div className="bubble">
          {isUser ? (
            <span>{msg.content}</span>
          ) : (
            <span>{JSON.stringify(msg.content)}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        
        <h2 className="chat-title">Stellar Query</h2>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => renderMessage(msg, index))}
        {loading && (
          <div className="typing-indicator">LLM is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me about stars, planets, or astronomy..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
        <SpeechRecorder
          onTranscript={(text) => setInput((prev) => prev + " " + text)}
          onRecordingChange={(status) => setIsRecording(status)} 
        />
      </div>
    </div>
  );
};

export default ChatBot;
