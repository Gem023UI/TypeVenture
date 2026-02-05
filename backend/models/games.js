import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ["easy", "medium", "hard"],
    required: true 
  },
  gameType: {
    type: String,
    default: "kerning"
  },
  words: [{
    word: { type: String, required: true },
    idealKerning: [{ type: Number }] // Array of ideal spacing values between letters
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Index for efficient querying
gameSchema.index({ gameType: 1, isActive: 1 });
gameSchema.index({ difficulty: 1 });

export default mongoose.model("Game", gameSchema);