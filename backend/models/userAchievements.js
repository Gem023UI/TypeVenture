import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  achievementId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Achievement', 
    required: true 
  },
  lessonId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', 
    required: true 
  },
  tier: {
    type: String,
    enum: ["bronze", "silver", "gold"],
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  earnedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Indexes for efficient querying
userAchievementSchema.index({ userId: 1 });
userAchievementSchema.index({ lessonId: 1 });
userAchievementSchema.index({ userId: 1, lessonId: 1 });

export default mongoose.model("UserAchievement", userAchievementSchema);