import Lesson from "../models/lessons.js";

// GET all lessons
export const getAllLessons = async (req, res) => {
  try {
    console.log("📚 Fetching all lessons...");
    console.log("User from token:", req.user);
    
    const userId = req.user.id;
    const User = (await import("../models/user.js")).default;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (!user.isVerified) {
      return res.status(403).json({ 
        error: "Email verification required",
        message: "Please verify your email to access lessons",
        isVerified: false
      });
    }
    
    const lessons = await Lesson.find().sort({ createdAt: -1 });
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
    
    const userId = req.user.id;
    const User = (await import("../models/user.js")).default;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (!user.isVerified) {
      return res.status(403).json({ 
        error: "Email verification required",
        message: "Please verify your email to access lessons",
        isVerified: false
      });
    }
    
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

// UPDATE lesson as completed
export const markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;

    console.log(`✅ Marking lesson ${lessonId} complete for user ${userId}`);

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    // Check if user already completed this lesson
    const alreadyCompleted = lesson.usersDone.some(
      entry => entry.userId.toString() === userId
    );

    if (alreadyCompleted) {
      return res.status(200).json({ 
        message: "Lesson already completed",
        lesson 
      });
    }

    // Add user to usersDone array
    lesson.usersDone.push({
      userId: userId,
      completedAt: new Date()
    });

    await lesson.save();

    console.log(`✅ Lesson marked complete`);
    res.status(200).json({ 
      message: "Lesson marked as complete",
      lesson 
    });
  } catch (error) {
    console.error("❌ Error marking lesson complete:", error);
    res.status(500).json({ error: "Failed to mark lesson complete" });
  }
};