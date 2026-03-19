import React, { useState, useEffect, useRef } from "react";
import "./FontBot.css";

/* ─────────────────────────────────────────
   FONTBOT — Your Personal Typography Bot
   Uses Grok AI (xAI) API
   Replace GROK_API_KEY with your actual key,
   or inject via environment variable.
───────────────────────────────────────── */

const GROK_API_KEY = import.meta.env?.VITE_GROK_API_KEY || "";
const GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const GROK_MODEL    = "grok-3-mini"; // or "grok-2-1212" depending on your access tier

/* ─────────────────────────────────────────
   SYSTEM PROMPT
   Strictly restricts FontBot to typography
───────────────────────────────────────── */
const SYSTEM_PROMPT = `You are FontBot — a friendly, expert typography bot inside TypeVenture, a typography learning game.

Your ONLY purpose is to help users with questions and topics related to typography and type design. This includes:
- Typefaces and font families (serif, sans-serif, slab, display, script, monospace)
- Font history and typographers (Garamond, Bodoni, Helvetica, Gill Sans, etc.)
- Typographic principles: kerning, tracking, leading, hierarchy, measure, rhythm, baseline grids
- Font pairing and combination theory
- Readability and legibility
- Typography in branding, UX, and graphic design
- Variable fonts, OpenType features, web fonts
- Type anatomy (x-height, ascender, descender, counter, bowl, terminal, etc.)
- Color and contrast in typography
- Typographic scales, grid systems, and layout
- Famous typographers and design movements (Bauhaus, Swiss Style, etc.)

If a user asks about anything unrelated to typography or type design — such as general knowledge, coding, recipes, news, personal advice, or any other topic — politely decline and redirect them to typography. Use this exact format for off-topic responses:

"I'm FontBot, your dedicated typography expert! I can only help with typography-related questions. Try asking me about font pairings, kerning, type history, or readability — I'd love to help! 🎨"

Keep responses concise, educational, and friendly. Use examples when helpful. You may use light emoji to keep the tone warm. Format longer answers with clear structure but avoid excessive markdown — this is a chat interface.`;

/* ─────────────────────────────────────────
   SUGGESTED QUESTIONS
───────────────────────────────────────── */
const SUGGESTIONS = [
  "What's the difference between kerning and tracking?",
  "How do I pair serif and sans-serif fonts?",
  "Why does leading matter for readability?",
  "What makes a typeface feel luxurious?",
  "Explain x-height and why it matters",
  "What is the 'Rule of Two' in typography?",
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const FontBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey there! 👋 I'm **FontBot**, your personal typography expert inside TypeVenture.\n\nAsk me anything about typefaces, font pairings, kerning, leading, type history, readability — anything typography! What would you like to explore? 🎨",
    },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const messagesEndRef         = useRef(null);
  const inputRef               = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const trimmed = text?.trim() || input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    // Build messages for API — exclude the initial assistant greeting to save tokens
    const apiMessages = newMessages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      if (!GROK_API_KEY) {
        throw new Error("GROK_API_KEY is not configured. Add VITE_GROK_API_KEY to your .env file.");
      }

      const response = await fetch(GROK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROK_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...apiMessages,
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.";

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("FontBot error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! 🧹 Ask me anything about typography — I'm here to help! 🎨",
      },
    ]);
    setError("");
  };

  // Simple markdown-ish renderer for bold and line breaks
  const renderContent = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split("\n").map((line, j) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < part.split("\n").length - 1 && <br />}
        </span>
      ));
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fb-backdrop" onClick={onClose}>
      <div className="fb-modal" onClick={e => e.stopPropagation()}>

        {/* ── HEADER ── */}
        <div className="fb-header">
          <div className="fb-header-left">
            <div className="fb-avatar">🤖</div>
            <div>
              <h2 className="fb-title">FontBot</h2>
              <p className="fb-status">
                <span className="fb-status-dot" />
                Your Personal Typography Bot
              </p>
            </div>
          </div>
          <div className="fb-header-actions">
            <button className="fb-clear-btn" onClick={handleClear} title="Clear chat">
              🗑
            </button>
            <button className="fb-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* ── MESSAGES ── */}
        <div className="fb-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`fb-msg ${msg.role === "user" ? "fb-user" : "fb-bot"}`}>
              {msg.role === "assistant" && (
                <div className="fb-msg-avatar">🤖</div>
              )}
              <div className="fb-bubble">
                {renderContent(msg.content)}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="fb-msg fb-bot">
              <div className="fb-msg-avatar">🤖</div>
              <div className="fb-bubble fb-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="fb-error">
              ⚠️ {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── SUGGESTIONS (shown only when only intro message exists) ── */}
        {messages.length === 1 && (
          <div className="fb-suggestions">
            <p className="fb-suggestions-label">Try asking:</p>
            <div className="fb-suggestions-grid">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="fb-suggestion-btn"
                  onClick={() => sendMessage(s)}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── INPUT ── */}
        <div className="fb-input-area">
          <div className="fb-input-row">
            <textarea
              ref={inputRef}
              className="fb-input"
              placeholder="Ask about typography, fonts, kerning, pairings…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <button
              className="fb-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              title="Send (Enter)"
            >
              {loading ? (
                <span className="fb-send-spinner" />
              ) : (
                "↑"
              )}
            </button>
          </div>
          <p className="fb-input-hint">
            Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line · FontBot only answers typography questions
          </p>
        </div>

      </div>
    </div>
  );
};

export default FontBot;