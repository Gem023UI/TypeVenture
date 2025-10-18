import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const BASE_URL = `${API_URL}/api/`;

export const getQuizByLessonId = async (lessonId) => {
  try {
    const response = await axios.get(`${BASE_URL}/quiz/lesson/${lessonId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return { success: false, message: error.message };
  }
};