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
    const data = error.response?.data;
    if (data?.isDeactivated) {
      const Swal = (await import("sweetalert2")).default;
      await Swal.fire({
        icon: "error",
        title: "Account Deactivated",
        text: "Your account has been deactivated. Please contact support.",
      });
      throw null;
    }
    throw data?.message || data?.error || "Login failed.";
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

export const getCompletedLessons = async () => {
  try {
    const response = await api.get("/api/lessons");
    return response.data;
  } catch (error) {
    console.error("Get lessons error:", error.response || error);
    throw error.response?.data?.error || "Failed to fetch lessons.";
  }
};

export const getQuizScores = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found in localStorage");
    const response = await api.get(`/api/user/profile/${userId}`);
    /* lessonQuiz lives on the user object returned by getUserById */
    const userData = response.data?.user ?? response.data;
    return userData?.lessonQuiz ?? [];
  } catch (error) {
    console.error("Get quiz scores error:", error.response || error);
    throw error.response?.data?.error || "Failed to fetch quiz scores.";
  }
};