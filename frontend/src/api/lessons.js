// const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure.onrender.com";
const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";

const BASE_URL = `${API_URL}/api/lessons`;

console.log("🔗 API Base URL:", BASE_URL);

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const fetchAllLessons = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders()
    });
    
    // Check if response is not ok
    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle 403 - Email verification required
      if (response.status === 403 && errorData.isVerified === false) {
        throw {
          status: 403,
          isVerified: false,
          message: errorData.message || "Please verify your email to access lessons"
        };
      }
      
      throw new Error(errorData.error || "Failed to fetch lessons");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error in fetchAllLessons:", error);
    // Re-throw the error so it can be handled by the component
    throw error;
  }
};

export const fetchLessonById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders()
    });
    
    // Check if response is not ok
    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle 403 - Email verification required
      if (response.status === 403 && errorData.isVerified === false) {
        throw {
          status: 403,
          isVerified: false,
          message: errorData.message || "Please verify your email to access lessons"
        };
      }
      
      throw new Error(errorData.error || "Failed to fetch lesson");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error in fetchLessonById:", error);
    // Re-throw the error so it can be handled by the component
    throw error;
  }
};

export const markLessonComplete = async (lessonId) => {
  try {
    const response = await fetch(`${BASE_URL}/${lessonId}/complete`, {
      method: "POST",
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to mark lesson complete");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error marking lesson complete:", error);
    throw error;
  }
};