import express from "express";
import { 
  getAllGames, 
  getGameById, 
  submitGameScore,
  getUserScores,
  getGameLeaderboard
} from "../controllers/games.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Get all active games (requires authentication and email verification)
router.get("/", verifyToken, getAllGames);

// Get single game by ID (requires authentication and email verification)
router.get("/:id", verifyToken, getGameById);

// Submit or update game score (requires authentication and email verification)
router.post("/score", verifyToken, submitGameScore);

// Get user's scores for all games
router.get("/user/scores", verifyToken, getUserScores);

// Get leaderboard for a specific game
router.get("/:gameId/leaderboard", verifyToken, getGameLeaderboard);

export default router;