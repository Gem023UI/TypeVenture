const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure.onrender.com";
const BASE_URL = `${API_URL}`;

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const submitScore = async (scoreData) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${BASE_URL}/api/score`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...scoreData, userId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting score:", error);
    return { success: false, message: "Failed to submit score" };
  }
};

export const submitScoreWithAchievement = async (scoreData) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${BASE_URL}/api/score/with-achievement`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...scoreData, userId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting score with achievement:", error);
    return { success: false, message: "Failed to submit score with achievement" };
  }
};

export const getScoresByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/score/user/${userId}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user scores:", error);
    return { success: false, message: "Failed to load user scores" };
  }
};

export const getLeaderboard = async (gameType) => {
  try {
    const query = gameType ? `?gameType=${gameType}` : "";
    const response = await fetch(`${BASE_URL}/api/score/leaderboard${query}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { success: false, message: "Failed to load leaderboard" };
  }
};


export const getLeaderboardWithDetails = async (gameType) => {
  try {
    const query = gameType ? `?gameType=${gameType}` : "";
    const response = await fetch(`${BASE_URL}/api/score/leaderboard-details${query}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard with details:", error);
    return { success: false, message: "Failed to load leaderboard" };
  }
};