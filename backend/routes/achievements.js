import express from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { getUserAchievements, getAchievementByLesson } from "../controllers/achievements.js";

const router = express.Router();

router.get("/user/:userId", authenticateUser, getUserAchievements);

router.get("/lesson/:lessonId", getAchievementByLesson);

export default router;