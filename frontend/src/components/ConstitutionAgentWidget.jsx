import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import api from "../api/axiosConfig";

// Small local knowledge base used ONLY when the backend cannot be reached at all
// (e.g. backend not deployed yet, or running with no network). Keeps the widget
// useful out of the box, the same way SmartApply Agent never leaves a user stuck.
const localFallback = [
  { keys: ["right", "article 21", "article 19", "article 14", "freedom"], reply: "Fundamental Rights (Articles 12-35) protect citizens from unfair state action, covering equality, freedom, life and liberty, and constitutional remedies." },
  { keys: ["duty", "duties", "51a"], reply: "Fundamental Duties (Article 51A) ask citizens to respect the Constitution, protect public property and the environment, and promote harmony." },
  { keys: ["dpsp", "directive"], reply: "Directive Principles (Articles 36-51) guide the government towards social and economic welfare, even though they are not directly enforceable in court." },
  { keys: ["judiciary", "court", "writ"], reply: "The Judiciary interprets the Constitution and protects rights through writs under Article 32 and Article 226." },
  { keys: ["preamble"], reply: "The Preamble sets out India's vision as a Sovereign, Socialist, Secular, Democratic Republic built on Justice, Liberty, Equality and Fraternity." },
];

function getLocalReply(question) {
  const q = question.toLowerCase();
  const match = localFallback.find((entry) => entry.keys.some((k) => q.includes(k)));
  return match
    ? match.reply
    : "I couldn't reach the live backend, so here's a quick offline tip: try the Constitution Explorer or Tutor page for a curated answer on this topic.";
}

export default function ConstitutionAgentWidget() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "agent", text: "Namaste! Ask me about Rights, Duties, DPSP, Judiciary or the Preamble.", live: null },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const send = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;
    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/ask", { question, context: location.pathname });
      const answer = res.data?.answer || "No answer returned.";
      const aiApiUsed = Boolean(res.data?.aiApiUsed);
      setMessages((prev) => [...prev, { from: "agent", text: answer, live: aiApiUsed }]);
    } catch {
      setMessages((prev) => [...prev, { from: "agent", text: getLocalReply(question), live: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-widget">
      {open && (
        <div className="agent-panel">
          <header>
            <span><Sparkles size={16} /> Constitution Agent</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </header>
          <div className="agent-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`agent-bubble ${m.from}`}>
                {m.text}
                {m.from === "agent" && m.live !== null && (
                  <span className={`agent-status ${m.live ? "live" : "offline"}`}>
                    {m.live ? "● Live AI" : "○ Offline Tutor"}
                  </span>
                )}
              </div>
            ))}
            {loading && <div className="agent-bubble agent typing">Thinking…</div>}
          </div>
          <form className="agent-input" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the Constitution..."
            />
            <button type="submit" aria-label="Send"><Send size={16} /></button>
          </form>
        </div>
      )}
      <button className="agent-fab" onClick={() => setOpen((v) => !v)} aria-label="Toggle Constitution Agent">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
