import express from "express";
import { submitScore, getScoresByUserId, getLeaderboard, getLeaderboardWithUserDetails } from "../controllers/scores.js";

const router = express.Router();

// POST - Submit a new score
router.post("/", submitScore);

// GET - Get scores by userId
router.get("/user/:userId", getScoresByUserId);

// GET - Get leaderboard
router.get("/leaderboard", getLeaderboard);

// GET - Get leaderboard with full user details
router.get("/leaderboard-details", getLeaderboardWithUserDetails);

export default router;