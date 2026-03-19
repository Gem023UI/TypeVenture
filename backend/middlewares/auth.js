import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided.",
      shouldPromptLogin: true,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token.",
      shouldPromptLogin: true,
    });
  }
};

export const verifyAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required." });
  }

  // First check: role must be admin from the JWT payload
  if (req.user.userrole !== "admin") {
    return res.status(403).json({
      error: "Access denied. Admin privileges required.",
    });
  }

  // Second check: fetch user from DB to verify isVerified = true
  // This ensures the admin's email is verified before granting access
  try {
    const User = (await import("../models/user.js")).default;
    const user = await User.findById(req.user.id).select("isVerified status");

    if (!user) {
      return res.status(401).json({ error: "Admin account not found." });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: "Admin account email is not verified. Please verify your email first.",
        isVerified: false,
      });
    }

    if (user.status === "deactivated") {
      return res.status(403).json({
        error: "Admin account has been deactivated.",
      });
    }

    next();
  } catch (error) {
    console.error("❌ verifyAdmin DB check error:", error);
    return res.status(500).json({ error: "Failed to verify admin credentials." });
  }
};