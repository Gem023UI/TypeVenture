import api from "./axiosConfig";

export const fetchAllLessons = async () => {
  try {
    const response = await api.get("/api/lessons");
    return response.data;
  } catch (error) {
    console.error("Error in fetchAllLessons:", error);
    throw error;
  }
};

export const fetchLessonById = async (id) => {
  try {
    const response = await api.get(`/api/lessons/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchAllLessons:", error);
    throw error;
  }
};

export const markLessonComplete = async (lessonId) => {
  try {
    console.log("📧 Marking lesson complete and sending email...");
    const response = await api.post(`/api/lessons/${lessonId}/complete`);
    console.log("✅ Lesson completed, email sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error marking lesson complete:", error);
    throw error;
  }
};

/**
 * Submit a quiz score for a lesson.
 *
 * @param {string}  lessonTitle     - Title of the lesson
 * @param {number}  lessonScore     - Total points earned (time-weighted)
 * @param {boolean} lessonCompleted - TRUE only if the user PASSED (≥ 50% correct)
 *
 * The backend stores the score and only overwrites an existing record when
 * the new score is strictly higher.
 */
export const submitQuizScore = async (
  lessonTitle,
  lessonScore,
  lessonCompleted = false
) => {
  try {
    console.log(
      `📊 Submitting quiz score for "${lessonTitle}": ${lessonScore} pts | passed: ${lessonCompleted}`
    );
    const response = await api.post("/api/lessons/quiz/score", {
      lessonTitle,
      lessonScore,
      lessonCompleted,
    });
    console.log("✅ Quiz score submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz score:", error);
    throw error;
  }
};