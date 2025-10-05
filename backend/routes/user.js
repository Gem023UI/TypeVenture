import express from "express";
import multer from "multer";
import upload from "../utils/multer.js";
import { registerUser, loginUser } from "../controllers/user.js";

const router = express.Router();

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("❌ Multer error:", err);
    return res.status(400).json({ 
      error: `File upload error: ${err.message}` 
    });
  } else if (err) {
    console.error("❌ File filter error:", err);
    return res.status(400).json({ 
      error: err.message 
    });
  }
  next();
};

// Auth routes
router.post("/register", 
  upload.single("avatar"), 
  handleMulterError,
  registerUser
);

router.post("/login", loginUser);

export default router;