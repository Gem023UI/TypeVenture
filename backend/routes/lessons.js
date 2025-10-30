// routes/lessons.js
import express from "express";
import { getAllLessons, getLessonById } from "../controllers/lessons.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Fetch all lessons
router.get("/", verifyToken, getAllLessons);

// Fetch single lesson by ID
router.get("/:id", verifyToken, getLessonById);

export default router;