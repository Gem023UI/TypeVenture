import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sourceUrl: { type: String },
  category: {
    type: String,
    enum: ["quiz", "typography", "trial"],
    required: true
  },
  content: {
    description: { type: String, required: true },
    introduction: { type: String, required: true },
    discussionOne: { type: String, required: true },
    discussionTwo: { type: String, required: true },
    discussionThree: { type: String, required: true },
    discussionFour: { type: String, required: true },
    discussionFive: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

// Index for efficient querying
lessonSchema.index({ category: 1 });

export default mongoose.model("Lesson", lessonSchema);
