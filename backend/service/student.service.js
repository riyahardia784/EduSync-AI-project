const axios = require("axios");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// 🧹 Clean text
const cleanText = (text = "") =>
  text
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/["']/g, "")
    .replace(/\s+/g, " ")
    .trim();

// 🔹 Gemini API call
async function callGemini(prompt, apiKey) {
  const body = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

  try {
    const res = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, body, {
      headers: { "Content-Type": "application/json" },
      timeout: 60000,
    });
    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  } catch (err) {
    console.error("❌ Gemini API Error:", err.response?.data || err.message);
    return "⚠️ Error generating response.";
  }
}

// 🎓 Student Service class
class StudentService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async generateSummary(inputText) {
    const clean = cleanText(inputText);
    if (!clean) return "⚠️ No valid text provided.";
    const prompt = `
      Summarize the following lecture:
      - Use short paragraphs.
      - Add a small title.
      Text: ${clean}
    `;
    return await callGemini(prompt, this.apiKey);
  }

  async extractKeyPoints(inputText) {
    const clean = cleanText(inputText);
    if (!clean) return "⚠️ No valid text provided.";
    const prompt = `
      Extract key points from this lecture:
      - Use bullet points.
      - Focus on core ideas.
      Text: ${clean}
    `;
    return await callGemini(prompt, this.apiKey);
  }

  async askMentorBot(question) {
    if (!question) return "⚠️ Please enter a question.";
    const prompt = `
       in markdown nature
      You are EduSync MentorBot 🤖.
      Provide clear, practical, and encouraging guidance. and short
      Student question: "${question}"
    `;
    return await callGemini(prompt, this.apiKey);
  }
}

module.exports = StudentService;
