import express from "express";
import { submitScore, getScoresByUserId, getLeaderboard } from "../controllers/scores.js";

const router = express.Router();

// POST - Submit a new score
router.post("/", submitScore);

// GET - Get scores by userId
router.get("/user/:userId", getScoresByUserId);

// GET - Get leaderboard
router.get("/leaderboard", getLeaderboard);

export default router;