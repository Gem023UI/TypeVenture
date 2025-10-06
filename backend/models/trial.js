// models/Trial.js
import mongoose from "mongoose";

const trialSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  scores: {
    quiz: { type: Number, min: 0, max: 50, default: 0 },
    typography: { type: Number, min: 0, max: 50, default: 0 }
  },
  overallScore: { type: Number, min: 0, max: 100, default: 0 },
  takenAt: { type: Date, default: Date.now }
});

trialSchema.index({ username: 1 });

export default mongoose.model("Trial", trialSchema);
