import express from "express";
import { optionalAuth } from "../middlewares/auth.js";
import { getQuizByLessonId } from "../controllers/quiz.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("🔍 Quiz route hit:", req.method, req.path);
  next();
});

router.get("/test", (req, res) => {
  console.log("✅ Test route working!");
  res.json({ 
    success: true,
    message: "Quiz route is working!",
    timestamp: new Date().toISOString()
  });
});

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

router.get("/lesson/:lessonId", optionalAuth, (req, res, next) => {
  console.log("🎯 Getting quiz for lesson:", req.params.lessonId);
  console.log("🔐 User authenticated:", req.user ? "Yes" : "No (Guest)");
  next();
}, getQuizByLessonId);

console.log("🚀 Quiz routes loaded");

export default router;