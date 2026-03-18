import Lesson from "../models/lessons.js";
import { sendLessonCompletionEmail } from "../utils/emailVerify.js";

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
        isVerified: false,
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
        isVerified: false,
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

// POST mark lesson as completed
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
      (entry) => entry.userId.toString() === userId
    );

    if (alreadyCompleted) {
      return res.status(200).json({
        message: "Lesson already completed",
        lesson,
      });
    }

    lesson.usersDone.push({ userId, completedAt: new Date() });
    await lesson.save();

    const User = (await import("../models/user.js")).default;
    const user = await User.findById(userId);

    if (!user) {
      console.error("❌ User not found for email notification");
      return res.status(200).json({
        message: "Lesson marked as complete (user not found for email)",
        lesson,
      });
    }

    const allLessons = await Lesson.find().sort({ createdAt: 1 });
    const currentLessonIndex = allLessons.findIndex(
      (l) => l._id.toString() === lessonId
    );
    const nextLesson = allLessons[currentLessonIndex + 1] || null;

    sendLessonCompletionEmail(user.email, user.username, lesson, nextLesson)
      .then(() => console.log("✅ Lesson completion email sent to:", user.email))
      .catch((err) => console.error("❌ Failed to send completion email:", err));

    console.log(`✅ Lesson marked complete for user ${user.username}`);
    res.status(200).json({
      message: "Lesson marked as complete",
      lesson,
      nextLesson: nextLesson
        ? {
            _id: nextLesson._id,
            title: nextLesson.title,
            description: nextLesson.content.description,
          }
        : null,
    });
  } catch (error) {
    console.error("❌ Error marking lesson complete:", error);
    res.status(500).json({ error: "Failed to mark lesson complete" });
  }
};

// POST submit quiz score
// Body: { lessonTitle, lessonScore, lessonCompleted (bool — true only if passed) }
// Rules:
//   • lessonCompleted = true only when the user passed (≥ 50% correct)
//   • Existing record is updated only when the new score is strictly higher
export const submitQuizScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonTitle, lessonScore, lessonCompleted } = req.body;

    if (!lessonTitle || lessonScore === undefined) {
      return res
        .status(400)
        .json({ error: "lessonTitle and lessonScore are required." });
    }

    const User = (await import("../models/user.js")).default;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const existingIdx = user.lessonQuiz.findIndex(
      (q) => q.lessonTitle === lessonTitle
    );

    if (existingIdx >= 0) {
      // Always overwrite on retake — latest attempt is always saved
      user.lessonQuiz[existingIdx].lessonScore     = lessonScore;
      user.lessonQuiz[existingIdx].lessonCompleted = lessonCompleted ?? false;
      user.lessonQuiz[existingIdx].completedAt     = new Date();
      console.log(
        `🔄 Updated quiz score for "${lessonTitle}" → ${lessonScore} pts | passed: ${lessonCompleted}`
      );
    } else {
      user.lessonQuiz.push({
        lessonTitle,
        lessonScore,
        lessonCompleted: lessonCompleted ?? false,
        completedAt: new Date(),
      });
      console.log(
        `✅ New quiz score for "${lessonTitle}": ${lessonScore} pts | passed: ${lessonCompleted}`
      );
    }

    await user.save();

    res.status(200).json({
      message: "Quiz score saved successfully.",
      lessonQuiz: user.lessonQuiz,
    });
  } catch (error) {
    console.error("❌ Error saving quiz score:", error);
    res.status(500).json({ error: "Failed to save quiz score." });
  }
};