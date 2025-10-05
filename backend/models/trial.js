// models/Trial.js
import mongoose from "mongoose";

const trialSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  scores: {
    discussionQuiz: { type: Number, min: 0, max: 1000, default: 0 },
    kerning: { type: Number, min: 0, max: 1000, default: 0 },
    typography: { type: Number, min: 0, max: 1000, default: 0 } // merged
  },
  overallScore: { type: Number, min: 0, max: 3000, default: 0 },
  takenAt: { type: Date, default: Date.now }
});

trialSchema.index({ username: 1 });

export default mongoose.model("Trial", trialSchema);
