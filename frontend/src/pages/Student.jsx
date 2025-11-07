import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";



function Student() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [keypoints, setKeypoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMentor, setShowMentor] = useState(false);

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  const BASE_URL = import.meta.env.VITEBASE_URL || "http://localhost:4000";

  const handleSummary = async () => {
    if (!text.trim()) return alert("Please enter some lecture text!");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/student/summary`, { text });
      setSummary(res.data.summary || "No summary generated.");
    } catch (err) {
      console.error(err);
      alert("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPoints = async () => {
    if (!text.trim()) return alert("Please enter some lecture text!");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/student/keypoints`, { text });
      setKeypoints(res.data.keyPoints || "No key points generated.");
    } catch (err) {
      console.error(err);
      alert("Error generating key points");
    } finally {
      setLoading(false);
    }
  };

  const handleMentorBot = async () => {
    if (!question.trim()) return alert("Enter your question first!");
    const newUserMsg = { sender: "user", text: question };
    setMessages((prev) => [...prev, newUserMsg]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/student/mentor`, { question });
      const botMsg = { sender: "bot", text: res.data.response || "No response received." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("❌ Mentor Bot Error:", err);
      const errorMsg = { sender: "bot", text: "⚠️ Error connecting with mentor bot." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white flex relative overflow-hidden">
      {/* ===== MAIN SCROLLABLE CONTENT ===== */}
      <div
        className={`transition-all duration-500 ${
          showMentor ? "w-[70%]" : "w-full"
        } flex flex-col overflow-y-auto min-h-screen`}
      >
        <Header />

        <div className="flex flex-col items-center mt-10 pb-20">
          <textarea
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-[80%] bg-transparent border border-purple-800 rounded-lg p-4 text-white focus:outline-none"
            placeholder="Paste your lecture text here..."
          />

          <div className="flex gap-6 mt-6">
            <button
              onClick={handleSummary}
              className="card px-6 py-2 rounded-full text-lg font-semibold hover:bg-purple-800"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Summary"}
            </button>

            <button
              onClick={handleKeyPoints}
              className="card px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? "Extracting..." : "Extract Key Points"}
            </button>

            <button
              onClick={() => setShowMentor(!showMentor)}
              className="card px-6 py-2 rounded-full text-lg font-semibold hover:bg-green-800"
            >
              {showMentor ? "Close Mentor Bot" : "Ask Mentor Bot"}
            </button>
          </div>
        </div>

        {(summary || keypoints) && (
          <div className="w-[80%] mx-auto mt-10 bg-zinc-900 p-5 rounded-lg min-h-[300px] mb-20">
            {summary && (
              <>
                <h2 className="text-2xl font-bold mb-3 text-purple-400">📄 Summary</h2>
                <p className="whitespace-pre-line leading-relaxed">{summary}</p>
              </>
            )}

            {keypoints && (
              <>
                <h2 className="text-2xl font-bold mb-3 text-blue-400">🗝️ Key Points</h2>
                <p className="whitespace-pre-line leading-relaxed">{keypoints}</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* ===== FIXED CHATBOT PANEL ===== */}
      {showMentor && (
        <div className="fixed right-0 top-0 w-[30%] h-screen bg-zinc-900 border-l border-purple-900 p-4 flex flex-col shadow-xl transition-all duration-500">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">🤖 Mentor Bot</h2>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto bg-zinc-800 p-3 rounded-lg text-sm space-y-3 mb-16">
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-2 rounded-lg ${
                      msg.sender === "user"
                        ? "card text-white rounded-br-none"
                        : "bg-zinc-600 text-gray-100 rounded-bl-none"
                    }`}
                  >
                     {msg.text} 
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-4">
                Ask me anything about your studies!
              </p>
            )}
          </div>

          {/* Fixed Input */}
          <div className="absolute bottom-4 left-0 w-full px-4 flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 bg-transparent border border-purpule-900 rounded-lg p-2 text-white focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleMentorBot()}
            />
            <button
              onClick={handleMentorBot}
              className="card px-4 rounded-lg"
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
