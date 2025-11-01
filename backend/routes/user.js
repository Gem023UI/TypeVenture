import express from "express";
import upload from "../utils/multer.js";
import { 
  registerUser, 
  loginUser, 
  editProfile,
  getUserById,
  deleteAccount
} from "../controllers/user.js";
import { handleMulterError } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile/:id", verifyToken, getUserById);

router.put("/edit-profile", 
  verifyToken,
  upload.single("avatar"), 
  handleMulterError,
  editProfile
);

router.delete("/delete-account", verifyToken, deleteAccount);

export default router;