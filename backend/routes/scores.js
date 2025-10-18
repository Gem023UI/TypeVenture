import express from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { 
  submitScore, 
  getScoresByUserId, 
  getLeaderboard, 
  getLeaderboardWithUserDetails,
  submitScoreWithAchievement
} from "../controllers/scores.js";

const router = express.Router();

router.post("/", authenticateUser, submitScore);
router.post("/with-achievement", authenticateUser, submitScoreWithAchievement);
router.get("/user/:userId", authenticateUser, getScoresByUserId);

router.get("/leaderboard", getLeaderboard);
router.get("/leaderboard-details", getLeaderboardWithUserDetails);

export default router;