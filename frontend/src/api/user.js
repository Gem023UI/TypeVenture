import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed.";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // if using cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed.";
  }
};
