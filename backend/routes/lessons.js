// routes/lessons.js
import express from "express";
import { getAllLessons, getLessonById } from "../controllers/lessons.js";

const router = express.Router();

// Fetch all lessons
router.get("/", getAllLessons);

// Fetch single lesson by ID
router.get("/:id", getLessonById);

export default router;