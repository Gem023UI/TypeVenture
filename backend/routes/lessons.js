import express from "express";
import Lesson from "../models/lessons.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

export default router;