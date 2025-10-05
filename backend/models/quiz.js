// models/DiscussionQuiz.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true }
});

const discussionQuizSchema = new mongoose.Schema({
  lessonNumber: { type: Number, required: true },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

// Index for quick lesson-based lookups
discussionQuizSchema.index({ lessonNumber: 1 });

export default mongoose.model("DiscussionQuiz", discussionQuizSchema);
