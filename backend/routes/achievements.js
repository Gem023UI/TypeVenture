import express from "express";
import { getUserAchievements, getAchievementByLesson } from "../controllers/achievements.js";

const router = express.Router();

// GET - Get all achievements earned by a user
router.get("/user/:userId", getUserAchievements);

// GET - Get achievement configuration for a specific lesson
router.get("/lesson/:lessonId", getAchievementByLesson);

export default router;