import api from "./axiosConfig";

export const registerUser = async (formData) => {
  try {
    console.log("Registering user...");
    const response = await api.post("/api/user/register", formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Register success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response || error);
    console.error("Server said:", error.response?.data);
    const serverMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Registration failed.";
    throw serverMsg;
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log("Logging in...");
    const response = await api.post("/api/user/login", credentials);
    console.log("Login success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error.response?.data?.message || "Login failed.";
  }
};

export const editProfile = async (formData) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found in localStorage");

    formData.append("userId", userId);

    console.log("Editing profile...");
    const response = await api.put("/api/user/edit-profile", formData);
    console.log("Edit profile success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Edit profile error:", error.response || error);
    throw error.response?.data?.error || "Profile update failed.";
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/api/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const deleteAccount = async (credentials) => {
  try {
    console.log("Deleting account...");
    const response = await api.delete("/api/user/delete-account", {
      data: credentials,
    });
    console.log("Delete account success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete account error:", error.response || error);
    throw error.response?.data?.error || "Account deletion failed.";
  }
};

export const sendPasswordResetCode = async (email) => {
  try {
    const response = await api.post("/api/user/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Send password reset code error:", error);
    throw error.response?.data?.error || "Failed to send password reset code";
  }
};

export const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await api.post("/api/user/reset-password", {
      email,
      code,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error.response?.data?.error || "Password reset failed";
  }
};

export const verifyEmail = async (code, userId) => {
  try {
    const response = await api.post("/api/user/verify-email", { userId, code });
    return response.data;
  } catch (error) {
    console.error("Verify email error:", error.response || error);
    throw error.response?.data?.error || "Email verification failed.";
  }
};

export const getCompletedLessons = async () => {
  try {
    const response = await api.get("/api/lessons");
    return response.data;
  } catch (error) {
    console.error("Get lessons error:", error.response || error);
    throw error.response?.data?.error || "Failed to fetch lessons.";
  }
};

/**
 * Retrieve the current user's quiz scores from their profile.
 * Returns the lessonQuiz array stored on the user document.
 * Used by LessonDetails to gate the "Mark as Complete" button.
 */
export const getQuizScores = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found in localStorage");
    const response = await api.get(`/api/user/profile/${userId}`);
    /* lessonQuiz lives on the user object returned by getUserById */
    return response.data?.user?.lessonQuiz ?? response.data?.lessonQuiz ?? [];
  } catch (error) {
    console.error("Get quiz scores error:", error.response || error);
    throw error.response?.data?.error || "Failed to fetch quiz scores.";
  }
};