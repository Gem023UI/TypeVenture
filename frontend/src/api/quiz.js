import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust to your backend URL

export const getQuizByLessonId = async (lessonId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quiz/lesson/${lessonId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return { success: false, message: error.message };
  }
};