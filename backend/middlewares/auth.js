import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
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

    const User = (await import("../models/user.js")).default;
    const user = await User.findById(decoded.id).select("status");

    if (!user) {
      return res.status(401).json({
        error: "Account not found.",
        shouldPromptLogin: true,
      });
    }

    if (user.status === "deactivated") {
      return res.status(403).json({
        error: "Your account has been deactivated. Please contact support.",
        isDeactivated: true,
        shouldPromptLogin: true,
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token.",
      shouldPromptLogin: true,
    });
  }

  // next() is OUTSIDE the try/catch so downstream errors aren't swallowed
  next();
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required." });
  }

  if (req.user.userrole !== "admin") {
    return res.status(403).json({
      error: "Access denied. Admin privileges required.",
    });
  }

  next();
};