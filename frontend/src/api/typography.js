const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";
const BASE_URL = `${API_URL}/api/`;

/**
 * Get typography challenges by lesson ID
 * @param {string} lessonId
 */
export const getTypographyByLessonId = async (lessonId) => {
  try {
    const response = await fetch(`${BASE_URL}typography/lesson/${lessonId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching typography challenges:", error);
    return { success: false, message: "Failed to load typography challenges" };
  }
};