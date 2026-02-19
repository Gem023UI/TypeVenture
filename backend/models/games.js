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
  gameImage: { 
    type: String, 
    default: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png"
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
    idealKerning: [{ type: Number }]
  }],
  questions: [{
    // For typeface guessing game
    displayText: { type: String },
    missingLetters: [{ type: String }],
    blankedPositions: [{ type: Number }],
    
    // For font pairing game
    givenFontImage: { type: String },
    givenFontName: { type: String },
    correctPairImage: { type: String },
    correctPairName: { type: String },
    options: [{
      pairImage: { type: String },
      pairName: { type: String }
    }]
  }],
  paragraphs: [{
    text: { type: String },
    idealLeading: { type: Number },
    fontSize: { type: Number },
    minLeading: { type: Number },
    maxLeading: { type: Number }
  }],
  purpose: { type: String },
  theme: { type: String },
  atmosphere: { type: String },
  context: { type: String },
  explanation: { type: String },
  options: [{
    fontName: { type: String },
    fontImage: { type: String }
  }],
  correctAnswer: { type: String },
  quizQuestions: [{
    questionText: { type: String },
    questionType: { type: String, enum: ['multiple', 'truefalse', 'fillblank'] },
    options: [{ type: String }],
    correctAnswer: { type: String },
    displayText: { type: String },
    missingLetters: [{ type: String }],
    blankedPositions: [{ type: Number }]
  }],
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
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