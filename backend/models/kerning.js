// models/Kerning.js
import mongoose from "mongoose";

const kerningSchema = new mongoose.Schema({
  lessonNumber: { type: Number, required: true },
  kerningWord: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Index for lesson lookups
kerningSchema.index({ lessonNumber: 1 });

export default mongoose.model("Kerning", kerningSchema);
