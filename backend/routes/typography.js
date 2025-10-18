import express from "express";
import { getTypographyByLessonId, getAllTypography } from "../controllers/typography.js";

const router = express.Router();

// GET - Get typography challenges by lesson ID
router.get("/lesson/:lessonId", getTypographyByLessonId);

// GET - Get all typography challenges
router.get("/all", getAllTypography);

export default router;