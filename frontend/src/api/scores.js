const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";
const BASE_URL = `${API_URL}/api/`;

/**
 * Submit a new game score.
 * @param {Object} scoreData - { userId, gameType, lessonId, score }
 */
export const submitScore = async (scoreData) => {
  try {
    const userId = localStorage.getItem('userId'); // Add this line
    const response = await fetch(`${BASE_URL}score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...scoreData, userId }), // Add userId
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting score:", error);
    return { success: false, message: "Failed to submit score" };
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