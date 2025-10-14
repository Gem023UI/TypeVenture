import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameType: {
    type: String,
    enum: ["quiz", "typography", "trial"],
    required: true
  },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  completedAt: { type: Date, default: Date.now }
});

// Indexes for analytics
scoreSchema.index({ userId: 1 });
scoreSchema.index({ gameType: 1 });
scoreSchema.index({ lessonId: 1 });

export default mongoose.model("Score", scoreSchema);