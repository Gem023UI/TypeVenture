import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Access denied. No token provided."
      });
    }

    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied. Invalid token format."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found. Token invalid."
      });
    }

    if (user.token !== token) {
      return res.status(401).json({
        success: false,
        error: "Token has been invalidated. Please login again."
      });
    }

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    next();
  } catch (error) {
    console.error("🔒 Authentication error:", error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Invalid token."
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expired. Please login again."
      });
    }

    return res.status(500).json({
      success: false,
      error: "Authentication failed.",
      details: error.message
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // No token provided, continue as guest
      req.user = null;
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    const user = await User.findById(decoded.id).select("-password");
    
    if (user && user.token === token) {
      req.user = {
        id: user._id,
        username: user.username,
        email: user.email
      };
    } else {
      req.user = null;
    }
    
    next();
  } catch (error) {
    // If token verification fails, continue as guest
    req.user = null;
    next();
  }
};