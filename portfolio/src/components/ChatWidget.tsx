import { useState } from "react";
import { api } from "../api"; // axios instance pointing to your backend

interface Message {
  role: "user" | "ai";
  content: string;
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // ✅ Send JSON instead of FormData
      const res = await api.post("/chat", { question: userMessage });

      const reply = res.data.answer || "Sorry, I couldn't process that.";

      setMessages((prev) => [...prev, { role: "ai", content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-box">
          <div className="chat-header">💬 Ask about my resume</div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="ai">
                Hi! Ask me anything about Harsh's skills, experience, or projects.
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`message ${m.role}`}>
                {m.content}
              </div>
            ))}

            {loading && <div className="ai">Typing...</div>}
          </div>

          <div className="chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={loading}
            />
            <button onClick={send} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatWidget;