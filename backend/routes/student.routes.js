// src/routes/student.routes.js
const express = require("express");
const router = express.Router();

const studentController = require("../controller/student.controller");

// ✅ attach handlers properly
router.post("/summary", studentController.generateSummary);
router.post("/keypoints", studentController.extractKeyPoints);
router.post("/mentor", studentController.askMentorBot);

module.exports = router;
