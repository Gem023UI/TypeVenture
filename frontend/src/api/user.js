import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure-backend-production.up.railway.app";
// const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";

const BASE_URL = `${API_URL}`;

export const registerUser = async (formData) => {
  try {
    console.log("Registering to:", `${BASE_URL}/api/user/register`); // Debug
    const response = await axios.post(`${BASE_URL}/api/user/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Register success:", response.data); // Debug
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response || error); // Debug
    throw error.response?.data?.message || "Registration failed.";
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log("Logging in to:", `${BASE_URL}/api/user/login`); // Debug
    const response = await axios.post(`${BASE_URL}/api/user/login`, credentials, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true,
    });
    console.log("Login success:", response.data); // Debug
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error); // Debug
    throw error.response?.data?.message || "Login failed.";
  }
};

export const editProfile = async (formData) => {
  try {
    // Grab userId from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found in localStorage");

    // Append userId to the form data
    formData.append("userId", userId);

    console.log("Editing profile at:", `${BASE_URL}/api/user/edit-profile`);
    const response = await axios.put(`${BASE_URL}/api/user/edit-profile`, formData, {
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true,
    });
    console.log("Edit profile success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Edit profile error:", error.response || error);
    throw error.response?.data?.error || "Profile update failed.";
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/user/profile/${userId}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server did not return JSON");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const deleteAccount = async (credentials) => {
  try {
    console.log("Deleting account at:", `${BASE_URL}/api/user/delete-account`);
    const response = await axios.delete(`${BASE_URL}/api/user/delete-account`, {
      data: credentials,
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true,
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
    const response = await axios.post(`${BASE_URL}/api/user/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error('Send password reset code error:', error);
    throw error.response?.data?.error || 'Failed to send password reset code';
  }
};

export const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/reset-password`, { 
      email, 
      code, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error.response?.data?.error || 'Password reset failed';
  }
};

export const verifyEmail = async (code, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/verify-email`, { userId, code }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Verify email error:", error.response || error);
    throw error.response?.data?.error || "Email verification failed.";
  }
};

export const getCompletedLessons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/lessons`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Get lessons error:", error.response || error);
    throw error.response?.data?.error || "Failed to fetch lessons.";
  }
};