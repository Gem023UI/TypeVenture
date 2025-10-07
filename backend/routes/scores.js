import express from "express";
import { submitScore, getScoresByUsername, getLeaderboard } from "../controllers/scores.js";

const router = express.Router();

// POST - Submit a new score
router.post("/", submitScore);

// GET - Get scores by username
router.get("/user/:username", getScoresByUsername);

// GET - Get leaderboard
router.get("/leaderboard", getLeaderboard);

export default router;