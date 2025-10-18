import axios from "axios";

const API_URL = import.meta.env.VITE_LOCAL_URL;
const BASE_URL = `${API_URL}`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const getAuthHeadersMultipart = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "multipart/form-data",
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const registerUser = async (formData) => {
  try {
    console.log("Registering to:", `${BASE_URL}/api/user/register`);
    const response = await axios.post(`${BASE_URL}/api/user/register`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Register success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response || error);
    throw error.response?.data?.message || "Registration failed.";
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log("Logging in to:", `${BASE_URL}/api/user/login`);
    const response = await axios.post(`${BASE_URL}/api/user/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log("Login success:", response.data);
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("username", response.data.user.username);
    }
    
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error.response?.data?.message || "Login failed.";
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/user/profile/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized, clear localStorage and redirect to login
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      throw new Error(data.error || "Failed to fetch user data");
    }

    return data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const editProfile = async (formData) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found in localStorage");

    formData.append("userId", userId);

    console.log("Editing profile at:", `${BASE_URL}/api/user/edit-profile`);
    const response = await axios.put(`${BASE_URL}/api/user/edit-profile`, formData, {
      headers: getAuthHeadersMultipart(),
      withCredentials: true,
    });
    
    console.log("Edit profile success:", response.data);
    
    if (response.data.user.username) {
      localStorage.setItem("username", response.data.user.username);
    }
    
    return response.data;
  } catch (error) {
    console.error("Edit profile error:", error.response || error);
    
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    
    throw error.response?.data?.error || "Profile update failed.";
  }
};

export const deleteAccount = async (credentials) => {
  try {
    console.log("Deleting account at:", `${BASE_URL}/api/user/delete-account`);
    const response = await axios.delete(`${BASE_URL}/api/user/delete-account`, {
      data: credentials,
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    
    console.log("Delete account success:", response.data);
    
    localStorage.clear();
    
    return response.data;
  } catch (error) {
    console.error("Delete account error:", error.response || error);
    
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    
    throw error.response?.data?.error || "Account deletion failed.";
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return !!(token && userId);
};

export const getCurrentUser = () => {
  return {
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token")
  };
};