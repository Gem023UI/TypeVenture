import express from "express";
import { optionalAuth } from "../middlewares/auth.js";
import { getAllLessons, getLessonById } from "../controllers/lessons.js";

const router = express.Router();


router.get("/", optionalAuth, getAllLessons);
router.get("/:id", optionalAuth, getLessonById);

export default router;