// const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure.onrender.com";
const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";

const BASE_URL = `${API_URL}/api/games`;

console.log("🎮 Game API Base URL:", BASE_URL);

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

// Fetch all games
export const fetchAllGames = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle 403 - Email verification required
      if (response.status === 403 && errorData.isVerified === false) {
        throw {
          status: 403,
          isVerified: false,
          message: errorData.message || "Please verify your email to access games"
        };
      }
      
      throw new Error(errorData.error || "Failed to fetch games");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error in fetchAllGames:", error);
    throw error;
  }
};

// Fetch single game by ID
export const fetchGameById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle 403 - Email verification required
      if (response.status === 403 && errorData.isVerified === false) {
        throw {
          status: 403,
          isVerified: false,
          message: errorData.message || "Please verify your email to play this game"
        };
      }
      
      throw new Error(errorData.error || "Failed to fetch game");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error in fetchGameById:", error);
    throw error;
  }
};

// Submit game score
export const submitScore = async (gameId, score) => {
  try {
    console.log("📤 Submitting score to server...", { gameId, score });
    
    const response = await fetch(`${BASE_URL}/score`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ gameId, score })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle 403 - Email verification required
      if (response.status === 403 && errorData.isVerified === false) {
        throw {
          status: 403,
          isVerified: false,
          message: errorData.message || "Please verify your email to submit scores"
        };
      }
      
      throw new Error(errorData.error || "Failed to submit score");
    }
    
    const data = await response.json();
    console.log("✅ Score submitted:", data);
    
    return data;
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
};

// Fetch user's scores
export const fetchUserScores = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user/scores`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user scores");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error in fetchUserScores:", error);
    throw error;
  }
};

// Fetch game leaderboard
export const fetchGameLeaderboard = async (gameId, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/${gameId}/leaderboard?limit=${limit}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch leaderboard");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error in fetchGameLeaderboard:", error);
    throw error;
  }
};