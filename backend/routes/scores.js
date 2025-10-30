import express from "express";
import { 
  submitScore, 
  getScoresByUserId, 
  getLeaderboard, 
  getLeaderboardWithUserDetails,
  submitScoreWithAchievement
} from "../controllers/scores.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// POST - Submit a new score (existing function - no achievement)
router.post("/", verifyToken, submitScore);

// POST - Submit a new score WITH achievement processing (NEW ROUTE)
router.post("/with-achievement", verifyToken, submitScoreWithAchievement);

// GET - Get scores by userId
router.get("/user/:userId", verifyToken, getScoresByUserId);

// GET - Get leaderboard
router.get("/leaderboard", verifyToken, getLeaderboard);

// GET - Get leaderboard with full user details
router.get("/leaderboard-details", verifyToken, getLeaderboardWithUserDetails);

export default router;