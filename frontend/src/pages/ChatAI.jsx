import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

const QUICK_PROMPTS = [
  "Summarize my last meeting",
  "What are my action items?",
  "Help me write a meeting agenda",
  "What documents did I upload?",
];

function ChatAI() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm BusinessCopilot AI 🤖. I can help you with meeting summaries, document analysis, and business insights. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { message: msg });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />

        <div className="welcome">
          <h1>🤖 AI Assistant</h1>
          <p>Ask anything about your meetings, documents, and business tasks.</p>
        </div>

        {/* Quick Prompts */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              disabled={loading}
              style={{
                padding: "8px 16px",
                background: "rgba(79,70,229,0.1)",
                border: "1px solid rgba(79,70,229,0.2)",
                borderRadius: "20px",
                color: "#818cf8",
                fontSize: "13px",
                cursor: "pointer",
                transition: "0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(79,70,229,0.25)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(79,70,229,0.1)"}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.role === "user" ? "user-bubble" : "ai-bubble"}`}
              >
                <span className="bubble-label">
                  {msg.role === "user" ? "You" : "🤖 BusinessCopilot AI"}
                </span>
                <p>{msg.text}</p>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble ai-bubble">
                <span className="bubble-label">🤖 BusinessCopilot AI</span>
                <p className="typing">Thinking</p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-row">
            <input
              type="text"
              placeholder="Ask about your meetings, documents, or business tasks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              {loading ? "..." : "Send ➤"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatAI;
