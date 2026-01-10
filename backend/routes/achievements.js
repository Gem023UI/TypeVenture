import express from "express";
import { getUserAchievements, getAchievementByLesson } from "../controllers/achievements.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// GET - Get all achievements earned by a user
router.get("/user/:userId", verifyToken, getUserAchievements);

// GET - Get achievement configuration for a specific lesson
router.get("/lesson/:lessonId", verifyToken, getAchievementByLesson);

export default router;