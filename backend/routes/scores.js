import express from "express";
import { 
  submitScore, 
  getScoresByUserId, 
  getLeaderboard, 
  getLeaderboardWithUserDetails,
  submitScoreWithAchievement // Import the new function
} from "../controllers/scores.js";

const router = express.Router();

// POST - Submit a new score (existing function - no achievement)
router.post("/", submitScore);

// POST - Submit a new score WITH achievement processing (NEW ROUTE)
router.post("/with-achievement", submitScoreWithAchievement);

// GET - Get scores by userId
router.get("/user/:userId", getScoresByUserId);

// GET - Get leaderboard
router.get("/leaderboard", getLeaderboard);

// GET - Get leaderboard with full user details
router.get("/leaderboard-details", getLeaderboardWithUserDetails);

export default router;