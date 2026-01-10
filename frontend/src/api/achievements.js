const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";
const BASE_URL = `${API_URL}/api/`;

const getAuthHeaders = () => ({
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const getUserAchievements = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}achievements/user/${userId}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error response from server:", data);
      return { success: false, message: data.message || "Failed to load user achievements" };
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    return { success: false, message: "Failed to load user achievements" };
  }
};

export const getAchievementByLesson = async (lessonId) => {
  try {
    const response = await fetch(`${BASE_URL}achievements/lesson/${lessonId}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error response from server:", data);
      return { success: false, message: data.message || "Failed to load achievement configuration" };
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching lesson achievement:", error);
    return { success: false, message: "Failed to load achievement configuration" };
  }
};