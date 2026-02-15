import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sourceUrl: { type: String },
  content: {
    description: { type: String },
    introduction: { type: String },
    headerOne: { type: String },
    discussionOne: { type: String },
    headerTwo: { type: String },
    discussionTwo: { type: String },
    headerThree: { type: String },
    discussionThree: { type: String },
    headerFour: { type: String },
    discussionFour: { type: String },
    headerFive: { type: String },
    discussionFive: { type: String },
    headerSix: { type: String },
    discussionSix: { type: String },
    headerSeven: { type: String },
    discussionSeven: { type: String }
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