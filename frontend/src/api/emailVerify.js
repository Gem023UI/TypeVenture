import api from "./axiosConfig";

export const sendVerificationCode = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await api.post("/api/user/send-verification-code", { userId });
    return response.data;
  } catch (error) {
    console.error("Send verification code error:", error);

    if (error.response?.status === 403) {
      throw {
        status: 403,
        message: error.response?.data?.message || "Authentication failed",
      };
    }

    throw error.response?.data?.error || "Failed to send verification code";
  }
};

export const verifyEmailCode = async (userId, code) => {
  try {
    const response = await api.post("/api/user/verify-email", { userId, code });
    return response.data;
  } catch (error) {
    console.error("Verify email error:", error);

    if (error.response?.status === 403) {
      throw {
        status: 403,
        message: error.response?.data?.message || "Authentication failed",
      };
    }

    throw error.response?.data?.error || "Email verification failed";
  }
};