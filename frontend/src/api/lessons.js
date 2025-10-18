const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const BASE_URL = `${API_URL}/api/lessons`;

console.log("🔗 API Base URL:", BASE_URL); // Debug log

// ✅ Fetch all lessons
export const fetchAllLessons = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch lessons");
    return await response.json();
  } catch (error) {
    console.error("Error in fetchAllLessons:", error);
    return [];
  }
};

// ✅ Fetch single lesson by ID
export const fetchLessonById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch lesson");
    return await response.json();
  } catch (error) {
    console.error("Error in fetchLessonById:", error);
    return null;
  }
};