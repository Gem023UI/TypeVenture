import Score from "../models/scores.js";
import { processAchievement } from "./achievements.js";

// Submit a new score (deletes old score if exists)
export const submitScore = async (req, res) => {
  try {
    const { userId, gameType, lessonId, score } = req.body;

    // Validation
    if (!userId || !gameType || !lessonId || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    console.log("ðŸ” Checking for existing score...");
    console.log("  User ID:", userId);
    console.log("  Game Type:", gameType);
    console.log("  Lesson ID:", lessonId);

    // Delete ALL existing scores for this user, game type, and lesson
    const deleteResult = await Score.deleteMany({
      userId: userId,
      gameType: gameType,
      lessonId: lessonId
    });

    console.log("ðŸ—‘ï¸ Deleted", deleteResult.deletedCount, "old score(s)");

    const wasReplaced = deleteResult.deletedCount > 0;

    // Create new score
    const newScore = new Score({
      userId,
      gameType,
      lessonId,
      score,
      completedAt: new Date()
    });

    await newScore.save();
    console.log("âœ… New score saved:", newScore);

    res.status(201).json({
      success: true,
      message: wasReplaced 
        ? `Score replaced successfully (deleted ${deleteResult.deletedCount} old score(s))` 
        : "Score submitted successfully",
      data: newScore,
      replaced: wasReplaced,
      deletedCount: deleteResult.deletedCount
    });
  } catch (error) {
    console.error("âŒ Error submitting score:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting score",
      error: error.message
    });
  }
};

export const submitScoreWithAchievement = async (req, res) => {
  try {
    const { userId, gameType, lessonId, score } = req.body;

    // Validation
    if (!userId || !gameType || !lessonId || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    console.log("🔍 Checking for existing score...");
    console.log("  User ID:", userId);
    console.log("  Game Type:", gameType);
    console.log("  Lesson ID:", lessonId);

    // Delete ALL existing scores for this user, game type, and lesson
    const deleteResult = await Score.deleteMany({
      userId: userId,
      gameType: gameType,
      lessonId: lessonId
    });

    console.log("🗑️ Deleted", deleteResult.deletedCount, "old score(s)");

    const wasReplaced = deleteResult.deletedCount > 0;

    // Create new score
    const newScore = new Score({
      userId,
      gameType,
      lessonId,
      score,
      completedAt: new Date()
    });

    await newScore.save();
    console.log("✅ New score saved:", newScore);

    // 🏆 Process achievement after score is saved
    const achievementResult = await processAchievement(userId, lessonId, score);
    
    console.log("🏆 Achievement processing result:", achievementResult);

    res.status(201).json({
      success: true,
      message: wasReplaced 
        ? `Score replaced successfully (deleted ${deleteResult.deletedCount} old score(s))` 
        : "Score submitted successfully",
      data: newScore,
      replaced: wasReplaced,
      deletedCount: deleteResult.deletedCount,
      achievement: achievementResult // Include achievement info in response
    });
  } catch (error) {
    console.error("❌ Error submitting score:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting score",
      error: error.message
    });
  }
};

// Get scores by userId
export const getScoresByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const scores = await Score.find({ userId }).sort({ completedAt: -1 });

    res.status(200).json({
      success: true,
      count: scores.length,
      data: scores
    });
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching scores",
      error: error.message
    });
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { gameType } = req.query;

    const filter = gameType ? { gameType } : {};

    const leaderboard = await Score.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          username: "$userInfo.username",
          totalScore: 1,
          gamesPlayed: 1
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching leaderboard",
      error: error.message
    });
  }
};

// Get leaderboard with full user details
export const getLeaderboardWithUserDetails = async (req, res) => {
  try {
    const { gameType } = req.query;

    const filter = gameType ? { gameType } : {};

    const leaderboard = await Score.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          username: "$userInfo.username",
          profileImage: "$userInfo.profilePicture",
          email: "$userInfo.email",
          fullName: "$userInfo.username",
          bio: { $ifNull: [{ $arrayElemAt: ["$userInfo.hobbies", 0] }, "No bio available"] },
          createdAt: "$userInfo.createdAt",
          totalScore: 1,
          gamesPlayed: 1
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error("Error fetching leaderboard with details:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching leaderboard",
      error: error.message
    });
  }
};