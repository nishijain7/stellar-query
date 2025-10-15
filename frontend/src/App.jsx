import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBot from "./ChatBot.jsx";
import ResultDisplay from "./ResultDisplay.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/result" element={<ResultDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;
