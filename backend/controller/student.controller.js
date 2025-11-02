const StudentService = require("../service/student.service");
const apiKey = process.env.API_KEY;
const studentService = new StudentService(apiKey);

const generateSummary = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  try {
    const summary = await studentService.generateSummary(text);
    res.json({ summary });
  } catch (err) {
    console.error("❌ Error generating summary:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};

const extractKeyPoints = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  try {
    const keyPoints = await studentService.extractKeyPoints(text);
    res.json({ keyPoints });
  } catch (err) {
    console.error("❌ Error extracting key points:", err);
    res.status(500).json({ error: "Failed to extract key points" });
  }
};

const askMentorBot = async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });
  try {
    const response = await studentService.askMentorBot(question);
    res.json({ response });
  } catch (err) {
    console.error("❌ Error in mentor bot:", err);
    res.status(500).json({ error: "Failed to get mentor response" });
  }
};

module.exports = {
  generateSummary,
  extractKeyPoints,
  askMentorBot,
};
