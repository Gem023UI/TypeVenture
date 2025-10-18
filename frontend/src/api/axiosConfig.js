import axios from "axios";

const API_URL = import.meta.env.VITE_LOCAL_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

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

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ Response error from ${error.config?.url}:`, error.response?.status);
    
    if (error.response?.status === 401) {
      console.log("🔒 Unauthorized - clearing localStorage and redirecting to login");
      
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    
    if (error.response?.status === 403) {
      console.log("⛔ Forbidden - insufficient permissions");
    }
    
    return Promise.reject(error);
  }
);

export default api;