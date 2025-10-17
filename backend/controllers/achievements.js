import Achievement from "../models/achievements.js";
import UserAchievement from "../models/userAchievements.js";

/**
 * Process and award achievement based on score
 * This function is called after a score is saved
 */
export const processAchievement = async (userId, lessonId, score) => {
  try {
    console.log("🏆 Processing achievement...");
    console.log("  User ID:", userId);
    console.log("  Lesson ID:", lessonId);
    console.log("  Score:", score);

    // Find the achievement configuration for this lesson
    const achievement = await Achievement.findOne({ lessonId });

    if (!achievement) {
      console.log("⚠️ No achievement configuration found for this lesson");
      return {
        success: false,
        message: "No achievement configuration for this lesson"
      };
    }

    // Determine which tier the user earned based on score
    let earnedTier = null;
    for (const level of achievement.levels) {
      if (score >= level.minScore && score <= level.maxScore) {
        earnedTier = level;
        break;
      }
    }

    if (!earnedTier) {
      console.log("❌ Score does not qualify for any achievement tier");
      return {
        success: false,
        message: "Score does not qualify for any achievement"
      };
    }

    console.log(`✨ User earned ${earnedTier.tier} tier!`);

    // Delete ALL existing achievements for this user and lesson
    const deleteResult = await UserAchievement.deleteMany({
      userId: userId,
      lessonId: lessonId
    });

    console.log("🗑️ Deleted", deleteResult.deletedCount, "old achievement(s)");

    const wasReplaced = deleteResult.deletedCount > 0;

    // Create new user achievement
    const newUserAchievement = new UserAchievement({
      userId,
      achievementId: achievement._id,
      lessonId,
      tier: earnedTier.tier,
      score,
      earnedAt: new Date()
    });

    await newUserAchievement.save();
    console.log("✅ New achievement saved:", newUserAchievement);

    return {
      success: true,
      message: wasReplaced 
        ? `Achievement updated to ${earnedTier.tier}` 
        : `${earnedTier.tier} achievement earned!`,
      data: {
        tier: earnedTier.tier,
        imageUrl: earnedTier.imageUrl,
        score: score
      },
      replaced: wasReplaced,
      deletedCount: deleteResult.deletedCount
    };
  } catch (error) {
    console.error("❌ Error processing achievement:", error);
    return {
      success: false,
      message: "Error processing achievement",
      error: error.message
    };
  }
};

/**
 * Get all achievements earned by a user
 */
export const getUserAchievements = async (req, res) => {
  try {
    const { userId } = req.params;

    const userAchievements = await UserAchievement.find({ userId })
      .populate('achievementId')
      .populate('lessonId')
      .sort({ earnedAt: -1 });

    // Format the response to include image URLs
    const formattedAchievements = userAchievements.map(ua => {
      const tierData = ua.achievementId.levels.find(l => l.tier === ua.tier);
      return {
        _id: ua._id,
        lessonId: ua.lessonId._id,
        lessonTitle: ua.lessonId.title,
        tier: ua.tier,
        score: ua.score,
        imageUrl: tierData ? tierData.imageUrl : null,
        earnedAt: ua.earnedAt
      };
    });

    res.status(200).json({
      success: true,
      count: formattedAchievements.length,
      data: formattedAchievements
    });
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching achievements",
      error: error.message
    });
  }
};

/**
 * Get achievement configuration for a specific lesson
 */
export const getAchievementByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const achievement = await Achievement.findOne({ lessonId });

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "No achievement found for this lesson"
      });
    }

    res.status(200).json({
      success: true,
      data: achievement
    });
  } catch (error) {
    console.error("Error fetching achievement:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching achievement",
      error: error.message
    });
  }
};