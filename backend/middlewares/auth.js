import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * Middleware to verify JWT token and authenticate user
 * Expects token in Authorization header as "Bearer <token>"
 */
export const authenticateUser = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Access denied. No token provided."
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied. Invalid token format."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    
    // Find user and verify token matches the one stored in database
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found. Token invalid."
      });
    }

    // Verify the token matches the one in the database
    if (user.token !== token) {
      return res.status(401).json({
        success: false,
        error: "Token has been invalidated. Please login again."
      });
    }

    // Attach user info to request object for use in route handlers
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

/**
 * Optional middleware to check if user exists without requiring authentication
 * Useful for routes that work differently for logged-in vs guest users
 */
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