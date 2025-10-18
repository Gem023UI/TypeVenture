import express from "express";
import { optionalAuth } from "../middlewares/auth.js";
import { getTypographyByLessonId, getAllTypography } from "../controllers/typography.js";

const router = express.Router();

// Optional auth - works for both guests and logged-in users
router.get("/lesson/:lessonId", optionalAuth, getTypographyByLessonId);
router.get("/all", optionalAuth, getAllTypography);

export default router;