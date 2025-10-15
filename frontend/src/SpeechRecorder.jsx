import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const SpeechRecorder = ({ onTranscript, onRecordingChange }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      console.log("Recording started");
      setListening(true);
      if (onRecordingChange) onRecordingChange(true);
    };

    recognition.onend = () => {
      console.log("Recording stopped");
      setListening(false);
      if (onRecordingChange) onRecordingChange(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onTranscript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setListening(false);
      if (onRecordingChange) onRecordingChange(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscript, onRecordingChange]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (!listening) {
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
      setListening(false); 
      if (onRecordingChange) onRecordingChange(false);
    }
  };

  return (
    <button
      onClick={toggleRecording}
      className={`record-btn ${listening ? "recording" : "idle"}`}
      aria-label={listening ? "Stop recording" : "Start recording"}
    >
      <FaMicrophone size={34} /> 
    </button>
  );
};

export default SpeechRecorder;
