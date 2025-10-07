import Score from "../models/score.js";

// Submit a new score
export const submitScore = async (req, res) => {
  try {
    const { username, gameType, lessonNumber, score } = req.body;

    // Validation
    if (!username || !gameType || !lessonNumber || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const newScore = new Score({
      username,
      gameType,
      lessonNumber,
      score
    });

    await newScore.save();

    res.status(201).json({
      success: true,
      message: "Score submitted successfully",
      data: newScore
    });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting score",
      error: error.message
    });
  }
};

// Get scores by username
export const getScoresByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const scores = await Score.find({ username }).sort({ completedAt: -1 });

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
          _id: "$username",
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 }
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