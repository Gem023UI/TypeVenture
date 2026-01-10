import Quiz from "../models/quiz.js";
import mongoose from "mongoose";

// Get quiz by lesson ID
export const getQuizByLessonId = async (req, res) => {
  try {
    const { lessonId } = req.params;
    
    console.log("🔍 Searching for quiz with lessonId:", lessonId);

    // Check if lessonId is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(lessonId);
    console.log("Valid ObjectId?", isValidObjectId);
    
    // Build query based on whether it's a valid ObjectId
    const query = isValidObjectId 
      ? { 
          $or: [
            { lessonNumber: lessonId },
            { lessonId: lessonId },
            { _id: lessonId }
          ]
        }
      : { lessonNumber: lessonId };

    console.log("Query:", JSON.stringify(query, null, 2));

    const quiz = await Quiz.findOne(query);

    console.log("Quiz found:", quiz ? "✅ Yes" : "❌ No");

    if (!quiz) {
      // Log all quizzes for debugging
      const allQuizzes = await Quiz.find({}).select('lessonNumber lessonId _id title');
      console.log("📚 Available quizzes in database:", allQuizzes.length);
      allQuizzes.forEach((q, index) => {
        console.log(`  ${index + 1}. ID: ${q._id}, LessonNumber: ${q.lessonNumber}, LessonId: ${q.lessonId}, Title: ${q.title}`);
      });
      
      return res.status(404).json({
        success: false,
        message: "No quiz found for this lesson",
        debug: {
          searchedLessonId: lessonId,
          totalQuizzesInDB: allQuizzes.length,
          availableQuizzes: allQuizzes.map(q => ({
            _id: q._id,
            lessonNumber: q.lessonNumber,
            lessonId: q.lessonId,
            title: q.title
          }))
        }
      });
    }

    console.log("✅ Returning quiz:", quiz.title);
    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    console.error("💥 Error fetching quiz:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching quiz",
      error: error.message,
    });
  }
};