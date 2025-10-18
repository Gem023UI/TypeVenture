import express from "express";
import multer from "multer";
import upload from "../utils/multer.js";
import { authenticateUser } from "../middlewares/auth.js";
import { 
  registerUser, 
  loginUser, 
  editProfile,
  getUserById,
  deleteAccount
} from "../controllers/user.js";

const router = express.Router();

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

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile/:id", authenticateUser, getUserById);
router.put("/edit-profile", 
  authenticateUser,
  upload.single("avatar"), 
  handleMulterError,
  editProfile
);
router.delete("/delete-account", authenticateUser, deleteAccount);

export default router;