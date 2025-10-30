import axios from "axios";

const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";
const BASE_URL = `${API_URL}/api/`;

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const getQuizByLessonId = async (lessonId) => {
  try {
    const response = await axios.get(`${BASE_URL}quiz/lesson/${lessonId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return { success: false, message: error.message };
  }
};