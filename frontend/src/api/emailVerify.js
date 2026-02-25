import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure-backend-production.up.railway.app";
// const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";

const BASE_URL = `${API_URL}/api/user`;

console.log("🔗 Email Verify API Base URL:", BASE_URL);

// Get authentication headers similar to lesson API
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const sendVerificationCode = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.post(`${BASE_URL}/send-verification-code`, 
      { userId },
      {
        headers: getAuthHeaders()
      }
    );
    return response.data;
  } catch (error) {
    console.error('Send verification code error:', error);
    
    // Handle specific error cases similar to lesson API
    if (error.response?.status === 403) {
      throw {
        status: 403,
        message: error.response?.data?.message || "Authentication failed"
      };
    }
    
    throw error.response?.data?.error || 'Failed to send verification code';
  }
};

export const verifyEmailCode = async (userId, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-email`, 
      { userId, code }, 
      {
        headers: getAuthHeaders()
      }
    );
    return response.data;
  } catch (error) {
    console.error('Verify email error:', error);
    
    // Handle specific error cases similar to lesson API
    if (error.response?.status === 403) {
      throw {
        status: 403,
        message: error.response?.data?.message || "Authentication failed"
      };
    }
    
    throw error.response?.data?.error || 'Email verification failed';
  }
};