import express from "express";
import { getTypographyByLessonId, getAllTypography } from "../controllers/typography.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// GET - Get typography challenges by lesson ID
router.get("/lesson/:lessonId", verifyToken, getTypographyByLessonId);

// GET - Get all typography challenges
router.get("/all", verifyToken, getAllTypography);

export default router;