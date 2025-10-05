// models/Score.js
import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  gameType: {
    type: String,
    enum: ["quiz", "kerning", "typography"],
    required: true
  },
  lessonNumber: { type: Number, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  completedAt: { type: Date, default: Date.now }
});

// Indexes for analytics
scoreSchema.index({ username: 1 });
scoreSchema.index({ gameType: 1 });
scoreSchema.index({ lessonNumber: 1 });

export default mongoose.model("Score", scoreSchema);
