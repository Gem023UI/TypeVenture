// models/Lesson.js
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sourceUrl: { type: String },
  category: {
    type: String,
    enum: ["quiz", "kerning", "typography", "trial"],
    required: true
  },
  difficultyRank: { type: Number, required: true },
  content: {
    introduction: { type: String, required: true },
    discussionOne: { type: String, required: true },
    discussionTwo: { type: String, required: true }
  },
  gameNumber: { type: Number, default: 4 },
  createdAt: { type: Date, default: Date.now }
});

// Index for efficient querying
lessonSchema.index({ category: 1, difficultyRank: 1 });

export default mongoose.model("Lesson", lessonSchema);
