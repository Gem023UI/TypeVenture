import axios from "axios";

// Add logging to debug
const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log("API_URL:", API_URL); // Debug log
console.log("All env vars:", import.meta.env); // See all available vars

// Fallback if undefined
const BASE_URL = API_URL || "https://typeventure.onrender.com";

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
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log("Login success:", response.data); // Debug
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error); // Debug
    throw error.response?.data?.message || "Login failed.";
  }
};