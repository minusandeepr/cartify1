import { useState } from "react";
import { fetchMyOrders } from "../../api/chatbotApi";
import { chatbotResponses } from "./chatbotData";

export default function Chatbot() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you?" },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");

    // 🔹 Static responses
    if (chatbotResponses[userMsg]) {
      setMessages((m) => [
        ...m,
        { from: "bot", text: chatbotResponses[userMsg] },
      ]);
      return;
    }

    // 🔹 Orders logic
    // dynamic response: last order
if (userMsg.includes("last order")) {
  try {
    const orders = await fetchMyOrders();

    if (!orders || orders.length === 0) {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "📦 You have no orders yet." },
      ]);
      return;
    }

    const lastOrder = orders[0]; // assuming latest comes first

    setMessages((m) => [
      ...m,
      {
        from: "bot",
        text: `🧾 Your latest order total is ₹${lastOrder.totalAmount} (${lastOrder.status})`,
      },
    ]);
  } catch (err) {
    setMessages((m) => [
      ...m,
      {
        from: "bot",
        text: "⚠️ Unable to fetch your orders right now. Please try again later.",
      },
    ]);
  }
  return;
}

    // 🔹 Fallback
    setMessages((m) => [
      ...m,
      { from: "bot", text: "❓ Sorry, I didn’t understand that." },
    ]);
  };

  if (!open) return null;

  return (
    <div style={chatStyle}>
      <div style={headerStyle}>
        Chat Support
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      <div style={bodyStyle}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "user" ? "right" : "left",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                display: "inline-block",
                background: m.from === "user" ? "#9333ea" : "#eee",
                color: m.from === "user" ? "#fff" : "#000",
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
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

/* styles */
const chatStyle = {
  position: "fixed",
  right: 20,
  bottom: 20,
  width: 320,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 10px 25px rgba(0,0,0,.15)",
  overflow: "hidden",
  zIndex: 9999,
};

const headerStyle = {
  background: "#9333ea",
  color: "#fff",
  padding: 10,
  display: "flex",
  justifyContent: "space-between",
};

const bodyStyle = {
  padding: 10,
  height: 250,
  overflowY: "auto",
};

const inputStyle = {
  display: "flex",
  gap: 5,
  padding: 10,
  borderTop: "1px solid #ddd",
};
