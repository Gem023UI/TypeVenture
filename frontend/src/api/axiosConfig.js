import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure.onrender.com";
// const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor - automatically attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`, {
      hasToken: !!token,
      headers: config.headers
    });
    
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle authentication errors globally
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ Response error from ${error.config?.url}:`, error.response?.status);
    
    // Handle unauthorized errors (401)
    if (error.response?.status === 401) {
      console.log("🔒 Unauthorized - clearing localStorage and redirecting to login");
      
      // Clear stored authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    
    // Handle forbidden errors (403)
    if (error.response?.status === 403) {
      console.log("⛔ Forbidden - insufficient permissions");
    }
    
    return Promise.reject(error);
  }
);

export default api;

/**
 * Usage example in your service files:
 * 
 * import api from '../config/axiosConfig';
 * 
 * // Instead of:
 * // axios.post(`${BASE_URL}/api/user/profile`, data)
 * 
 * // Use:
 * // api.post('/api/user/profile', data)
 * 
 * // The interceptor will automatically add the Bearer token
 */