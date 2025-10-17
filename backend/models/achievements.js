import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  lessonId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', 
    required: true 
  },
  levels: [
    {
      tier: {
        type: String,
        enum: ["bronze", "silver", "gold"],
        required: true
      },
      minScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
      },
      maxScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
      },
      imageUrl: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Index for efficient querying
achievementSchema.index({ lessonId: 1 });

export default mongoose.model("Achievement", achievementSchema);