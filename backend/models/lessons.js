import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sourceUrl: { type: String },
  content: {
    description: { type: String, required: true },
    introduction: { type: String, required: true },
    discussionOne: { type: String, required: true },
    discussionTwo: { type: String, required: true },
    discussionThree: { type: String, required: true },
    discussionFour: { type: String, required: true },
    discussionFive: { type: String, required: true }
  },
  youtubeUrl: { type: String, default: "" },
  imageUrls: [{ type: String }],
  usersDone: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    completedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Index for efficient querying
lessonSchema.index({ category: 1 });
lessonSchema.index({ "usersDone.userId": 1 });

export default mongoose.model("Lesson", lessonSchema);