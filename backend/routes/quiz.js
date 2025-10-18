import express from "express";
import { getQuizByLessonId } from "../controllers/quiz.js";

const router = express.Router();

// Debug middleware for this router
router.use((req, res, next) => {
  console.log("📝 Quiz route hit:", req.method, req.path);
  next();
});

// Test endpoint to verify route is working
router.get("/test", (req, res) => {
  console.log("✅ Test route working!");
  res.json({ 
    success: true,
    message: "Quiz route is working!",
    timestamp: new Date().toISOString()
  });
});

// GET all quizzes (for debugging)
router.get("/all", async (req, res) => {
  try {
    const Quiz = (await import("../models/quiz.js")).default;
    const quizzes = await Quiz.find({}).select('lessonNumber lessonId title');
    res.json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET quiz by lesson ID
router.get("/lesson/:lessonId", (req, res, next) => {
  console.log("🎯 Getting quiz for lesson:", req.params.lessonId);
  next();
}, getQuizByLessonId);

console.log("🚀 Quiz routes loaded");

export default router;