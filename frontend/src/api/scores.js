const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";
const BASE_URL = `${API_URL}/api/`;

/**
 * Submit a new game score (existing - no achievement processing).
 * @param {Object} scoreData - { userId, gameType, lessonId, score }
 */
export const submitScore = async (scoreData) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${BASE_URL}score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...scoreData, userId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting score:", error);
    return { success: false, message: "Failed to submit score" };
  }
};

/**
 * NEW FUNCTION - Submit a new game score WITH achievement processing.
 * @param {Object} scoreData - { userId, gameType, lessonId, score }
 */
export const submitScoreWithAchievement = async (scoreData) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${BASE_URL}score/with-achievement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...scoreData, userId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting score with achievement:", error);
    return { success: false, message: "Failed to submit score with achievement" };
  }
};

/**
 * Get all scores by userId.
 * @param {string} userId
 */
export const getScoresByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}score/user/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user scores:", error);
    return { success: false, message: "Failed to load user scores" };
  }
};

/**
 * Get leaderboard (optionally by game type).
 * @param {string} [gameType]
 */
export const getLeaderboard = async (gameType) => {
  try {
    const query = gameType ? `?gameType=${gameType}` : "";
    const response = await fetch(`${BASE_URL}score/leaderboard${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { success: false, message: "Failed to load leaderboard" };
  }
};

/**
 * Get leaderboard with full user details (for display).
 * @param {string} [gameType]
 */
export const getLeaderboardWithDetails = async (gameType) => {
  try {
    const query = gameType ? `?gameType=${gameType}` : "";
    const response = await fetch(`${BASE_URL}score/leaderboard-details${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard with details:", error);
    return { success: false, message: "Failed to load leaderboard" };
  }
};