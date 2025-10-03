const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/multer");

const {
  registerUser,
  loginUser,
} = require("../controllers/user");

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

module.exports = router;