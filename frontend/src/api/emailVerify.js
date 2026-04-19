import api from "./axiosConfig";

// Email verification has been disabled.
export const sendVerificationCode = async () => {
  throw new Error("Email verification has been disabled.");
};

export const verifyEmailCode = async () => {
  throw new Error("Email verification has been disabled.");
};