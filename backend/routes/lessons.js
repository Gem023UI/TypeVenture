// routes/lessons.js
import express from "express";
import {
  getAllLessons,
  getLessonById,
  markLessonComplete,
  submitQuizScore,
} from "../controllers/lessons.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Fetch all lessons
router.get("/", verifyToken, getAllLessons);

// Fetch single lesson by ID
router.get("/:id", verifyToken, getLessonById);

// Mark lesson as complete
router.post("/:lessonId/complete", verifyToken, markLessonComplete);

// Submit quiz score for a lesson
router.post("/quiz/score", verifyToken, submitQuizScore);

export default router;