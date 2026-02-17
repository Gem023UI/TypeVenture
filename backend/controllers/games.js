import Game from "../models/games.js";
import GameScore from "../models/gameScore.js";
import User from "../models/user.js";

// Achievement thresholds
const ACHIEVEMENT_THRESHOLDS = {
  gold: 97,
  silver: 94,
  bronze: 90
};

// Achievement image URLs (placeholder - to be updated with Cloudinary links)
const ACHIEVEMENT_URLS = {
  gold: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305621/gold_medal_w7xagi.png",
  silver: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305631/silver_medal_nfb50c.png",
  bronze: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305618/bronze_medal_olw8ds.png",
  none: ""
};

// Calculate achievement based on score
const calculateAchievement = (score) => {
  if (score >= ACHIEVEMENT_THRESHOLDS.gold) return "gold";
  if (score >= ACHIEVEMENT_THRESHOLDS.silver) return "silver";
  if (score >= ACHIEVEMENT_THRESHOLDS.bronze) return "bronze";
  return "none";
};

// GET all active games
export const getAllGames = async (req, res) => {
  try {
    console.log("🎮 Fetching all games...");
    console.log("User from token:", req.user);
    
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (!user.isVerified) {
      return res.status(403).json({ 
        error: "Email verification required",
        message: "Please verify your email to access games",
        isVerified: false
      });
    }
    
    const games = await Game.find({ isActive: true }).sort({ difficulty: 1, createdAt: -1 });
    console.log(`✅ Found ${games.length} active games`);
    
    res.status(200).json(games);
  } catch (error) {
    console.error("❌ Error fetching games:", error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

// GET a single game by ID
export const getGameById = async (req, res) => {
  try {
    console.log(`🎮 Fetching game with ID: ${req.params.id}`);
    
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (!user.isVerified) {
      return res.status(403).json({ 
        error: "Email verification required",
        message: "Please verify your email to play this game",
        isVerified: false
      });
    }
    
    const game = await Game.findById(req.params.id);
    if (!game) {
      console.log("❌ Game not found");
      return res.status(404).json({ error: "Game not found" });
    }
    
    console.log(`✅ Found game: ${game.title}`);
    res.status(200).json(game);
  } catch (error) {
    console.error("❌ Error fetching game:", error);
    res.status(500).json({ error: "Failed to fetch game" });
  }
};

// POST or UPDATE game score
export const submitGameScore = async (req, res) => {
  try {
    const { gameId, score } = req.body;
    const userId = req.user.id;

    console.log(`🎯 Submitting score for game ${gameId}, user ${userId}`);

    // Validate inputs
    if (!gameId || score === undefined || score === null) {
      return res.status(400).json({ error: "Game ID and score are required" });
    }

    if (score < 0 || score > 100) {
      return res.status(400).json({ error: "Score must be between 0 and 100" });
    }

    // Verify user exists and is verified
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ 
        error: "Email verification required",
        message: "Please verify your email to submit scores",
        isVerified: false
      });
    }

    // Verify game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Calculate achievement
    const achievement = calculateAchievement(score);
    const achievementUrl = ACHIEVEMENT_URLS[achievement];

    // Check if user already has a score for this game
    let gameScore = await GameScore.findOne({ userId, gameId });

    let isNewHighScore = false;

    if (gameScore) {
      // Update existing score if new score is higher
      if (score > gameScore.score) {
        console.log(`📈 Updating score from ${gameScore.score} to ${score}`);
        
        gameScore.score = score;
        gameScore.achievement = achievement;
        gameScore.achievementUrl = achievementUrl;
        gameScore.attempts += 1;
        gameScore.completedAt = new Date();
        
        await gameScore.save();
        isNewHighScore = true;
      } else {
        // Score is not higher, just increment attempts
        console.log(`📊 Score ${score} not higher than existing ${gameScore.score}`);
        
        gameScore.attempts += 1;
        await gameScore.save();
      }
    } else {
      // Create new score entry
      console.log(`🆕 Creating new score entry`);
      
      gameScore = new GameScore({
        gameId,
        gameTitle: game.title,
        userId,
        username: user.username,
        score,
        achievement,
        achievementUrl,
        attempts: 1
      });

      await gameScore.save();
      isNewHighScore = true;
    }

    // Check if user is in top 3 (only if new high score)
    if (isNewHighScore) {
      await checkAndNotifyTopPlayers(gameId, userId, score, user);
    }

    return res.status(gameScore.attempts === 1 ? 201 : 200).json({
      message: isNewHighScore ? "Score updated successfully! New high score!" : "Score recorded, but not a new high score",
      gameScore,
      isNewHighScore
    });
  } catch (error) {
    console.error("❌ Error submitting game score:", error);
    res.status(500).json({ error: "Failed to submit game score" });
  }
};

// GET user's scores for all games
export const getUserScores = async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log(`📊 Fetching scores for user ${userId}`);
    
    const scores = await GameScore.find({ userId })
      .populate('gameId', 'title difficulty')
      .sort({ score: -1, completedAt: -1 });
    
    console.log(`✅ Found ${scores.length} scores`);
    
    res.status(200).json(scores);
  } catch (error) {
    console.error("❌ Error fetching user scores:", error);
    res.status(500).json({ error: "Failed to fetch user scores" });
  }
};

// GET leaderboard for a specific game
export const getGameLeaderboard = async (req, res) => {
  try {
    const { gameId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    console.log(`🏆 Fetching leaderboard for game ${gameId}`);
    
    // Get all scores for this game and populate userId with user details
    const allScores = await GameScore.find({ gameId })
      .populate('userId', '_id username email profilePicture')
      .select('userId username score achievement completedAt')
      .lean();
    
    // Filter out any scores where user was deleted
    const validScores = allScores.filter(score => score.userId);
    
    // Sort by score descending, then by completedAt ascending (older first for ties)
    const sortedScores = validScores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Higher score first
      }
      // For same score, most recent should be lower in ranking
      return new Date(b.completedAt) - new Date(a.completedAt);
    });
    
    // Limit results
    const leaderboard = sortedScores.slice(0, limit);
    
    console.log(`✅ Found ${leaderboard.length} leaderboard entries`);
    
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

// Helper function to check and notify top players
const checkAndNotifyTopPlayers = async (gameId, userId, newScore, user) => {
  try {
    // Get all scores for this game sorted by score (descending) and date (ascending for ties)
    const allScores = await GameScore.find({ gameId })
      .sort({ score: -1, completedAt: 1 })
      .populate('userId', 'email username');

    // Get unique top 3 scores
    const uniqueScores = [...new Set(allScores.map(s => s.score))]
      .sort((a, b) => b - a)
      .slice(0, 3);

    // Check if the new score is in top 3
    if (uniqueScores.includes(newScore)) {
      const rank = uniqueScores.indexOf(newScore) + 1;
      
      // Import and send notification email
      const { sendTopPlayerNotification } = await import("../utils/emailVerify.js");
      const Game = (await import("../models/games.js")).default;
      const game = await Game.findById(gameId);
      
      await sendTopPlayerNotification(
        user.email,
        user.username,
        game.title,
        rank,
        newScore
      );
      
      console.log(`🏆 Top ${rank} notification sent to ${user.username}`);
    }
  } catch (error) {
    console.error("❌ Error checking top players:", error);
    // Don't throw error - notification failure shouldn't break score submission
  }
};