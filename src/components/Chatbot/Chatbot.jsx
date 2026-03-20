import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function Chatbot() {
  const token = localStorage.getItem("token"); 

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
      auth: {
        token: token || null, // ✅ send JWT
      },
    });

    socketRef.current.on("bot-message", (msg) => {
      setMessages((prev) => [...prev, { from: "bot", text: msg }]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    socketRef.current.emit("user-message", input.toLowerCase());
    setInput("");
  };
   if (!isOpen) {
    return (
      <button style={openButtonStyle} onClick={() => setIsOpen(true)}>
        💬 Chat
      </button>
    );
  }


  return (
    <div style={chatStyle}>
      <div style={headerStyle}>
        <span>Chat Support</span>
        <button style={closeBtnStyle} onClick={() => setIsOpen(false)}>
          ✕
        </button>
      </div>

      <div style={bodyStyle}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{ textAlign: m.from === "user" ? "right" : "left" }}
          >
            <span
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                display: "inline-block",
                background: m.from === "user" ? "#4f46e5" : "#eee",
                color: m.from === "user" ? "#fff" : "#000",
                marginBottom: 6,
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div style={inputStyle}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type..."
          style={{ flex: 1 }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

/* 💅 styles */
const chatStyle = {
  position: "fixed",
  right: 20,
  bottom: 20,
  width: 320,
  height: 420,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  zIndex: 9999,
};

const headerStyle = {
  padding: "10px 12px",
  background: "#4f46e5",
  color: "#fff",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeBtnStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: 18,
  cursor: "pointer",
};

const bodyStyle = {
  flex: 1,
  padding: 10,
  overflowY: "auto",
};

const inputStyle = {
  display: "flex",
  gap: 6,
  padding: 10,
  borderTop: "1px solid #ddd",
};

const openButtonStyle = {
  position: "fixed",
  right: 20,
  bottom: 20,
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  padding: "12px 16px",
  borderRadius: 30,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  zIndex: 9999,
};