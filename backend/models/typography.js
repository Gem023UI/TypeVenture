// models/Typography.js
import mongoose from "mongoose";

const typographySchema = new mongoose.Schema({
  lessonNumber: { type: Number, required: true },
  prompt: { type: String, required: true }, // scenario or instruction
  displayText: { type: String, required: true }, // text shown to adjust
  createdAt: { type: Date, default: Date.now }
});

// Example: prompt: "Adjust this paragraph for readability and color contrast."

typographySchema.index({ lessonNumber: 1 });

export default mongoose.model("Typography", typographySchema);
