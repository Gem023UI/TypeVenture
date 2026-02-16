import mongoose from "mongoose";

const gameScoreSchema = new mongoose.Schema({
  gameId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Game", 
    required: true 
  },
  gameTitle: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  score: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  achievement: {
    type: String,
    enum: ["gold", "silver", "bronze", "none"],
    default: "none"
  },
  achievementUrl: {
    type: String,
    default: ""
  },
  attempts: {
    type: Number,
    default: 1
  },
  completedAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Compound index for efficient user-game queries
gameScoreSchema.index({ userId: 1, gameId: 1 });
gameScoreSchema.index({ userId: 1, score: -1 });

// Ensure one score per user per game
gameScoreSchema.index({ userId: 1, gameId: 1 }, { unique: true });

// Update the updatedAt timestamp before saving
gameScoreSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("GameScore", gameScoreSchema);