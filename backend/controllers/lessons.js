// controllers/lessons.js
import Lesson from "../models/lessons.js";

// GET all lessons
export const getAllLessons = async (req, res) => {
  try {
    console.log("📚 Fetching all lessons...");
    const lessons = await Lesson.find().sort({ difficultyRank: 1 });
    console.log(`✅ Found ${lessons.length} lessons`);
    res.status(200).json(lessons);
  } catch (error) {
    console.error("❌ Error fetching lessons:", error);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};

// GET a single lesson by ID
export const getLessonById = async (req, res) => {
  try {
    console.log(`📖 Fetching lesson with ID: ${req.params.id}`);
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      console.log("❌ Lesson not found");
      return res.status(404).json({ error: "Lesson not found" });
    }
    console.log(`✅ Found lesson: ${lesson.title}`);
    res.status(200).json(lesson);
  } catch (error) {
    console.error("❌ Error fetching lesson:", error);
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
};