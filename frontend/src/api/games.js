import api from "./axiosConfig";

// Fetch all games
export const fetchAllGames = async () => {
  try {
    const response = await api.get("/api/games");
    return response.data;
  } catch (error) {
    console.error("Error in fetchAllGames:", error);

    if (error.response?.status === 403 && error.response?.data?.isVerified === false) {
      throw {
        status: 403,
        isVerified: false,
        message: error.response?.data?.message || "Please verify your email to access games",
      };
    }

    throw error;
  }
};

// Fetch single game by ID
export const fetchGameById = async (id) => {
  try {
    const response = await api.get(`/api/games/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchGameById:", error);

    if (error.response?.status === 403 && error.response?.data?.isVerified === false) {
      throw {
        status: 403,
        isVerified: false,
        message: error.response?.data?.message || "Please verify your email to play this game",
      };
    }

    throw error;
  }
};

// Submit game score
export const submitScore = async (gameId, score) => {
  try {
    console.log("📤 Submitting score to server...", { gameId, score });
    const response = await api.post("/api/games/score", { gameId, score });
    console.log("✅ Score submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting score:", error);

    if (error.response?.status === 403 && error.response?.data?.isVerified === false) {
      throw {
        status: 403,
        isVerified: false,
        message: error.response?.data?.message || "Please verify your email to submit scores",
      };
    }

    throw error;
  }
};

// Fetch user's scores
export const fetchUserScores = async () => {
  try {
    const response = await api.get("/api/games/user/scores");
    return response.data;
  } catch (error) {
    console.error("Error in fetchUserScores:", error);
    throw error;
  }
};

// Fetch game leaderboard
export const fetchGameLeaderboard = async (gameId, limit = 10) => {
  try {
    const response = await api.get(`/api/games/${gameId}/leaderboard?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchGameLeaderboard:", error);
    throw error;
  }
};

// Fetch user profile by ID (for leaderboard top player)
export const fetchUserProfile = async (userId) => {
  try {
    const response = await api.get(`/api/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    throw error;
  }
};