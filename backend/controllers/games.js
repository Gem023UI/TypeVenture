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
  gold: "https://res.cloudinary.com/placeholder/gold-trophy.png",
  silver: "https://res.cloudinary.com/placeholder/silver-trophy.png",
  bronze: "https://res.cloudinary.com/placeholder/bronze-trophy.png",
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

        return res.status(200).json({
          message: "Score updated successfully! New high score!",
          gameScore,
          isNewHighScore: true
        });
      } else {
        // Score is not higher, just increment attempts
        console.log(`📊 Score ${score} not higher than existing ${gameScore.score}`);
        
        gameScore.attempts += 1;
        await gameScore.save();

        return res.status(200).json({
          message: "Score recorded, but not a new high score",
          gameScore,
          isNewHighScore: false
        });
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

      return res.status(201).json({
        message: "Score submitted successfully!",
        gameScore,
        isNewHighScore: true
      });
    }
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
    
    const leaderboard = await GameScore.find({ gameId })
      .sort({ score: -1, completedAt: 1 })
      .limit(limit)
      .select('username score achievement completedAt');
    
    console.log(`✅ Found ${leaderboard.length} leaderboard entries`);
    
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};