import axios from "axios";

// const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure.onrender.com";
const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";

const BASE_URL = `${API_URL}/api/`;

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const getTypographyByLessonId = async (lessonId) => {
  try {
    const response = await fetch(`${BASE_URL}typography/lesson/${lessonId}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching typography challenges:", error);
    return { success: false, message: "Failed to load typography challenges" };
  }
};