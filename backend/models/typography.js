import mongoose from "mongoose";

const typographySchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  
  // Challenge setup
  prompt: { type: String, required: true }, // "Design a warning sign for..."
  scenario: { type: String, required: true }, // "caution-sign", "event-poster", etc.
  displayText: { type: String, required: true },
  
  // Typography properties to adjust
  adjustableProperties: [{
    availableFonts: [{ type: String }], // For font selection challenge
    correctFont: { type: String }, // The correct font answer
    availableFontColors: [{ type: String }], // For color selection challenge
    correctFontColor: { type: String }, // The correct color answer

    property: { 
      type: String, 
      enum: ['letterSpacing', 'lineHeight', 'fontSize', 'wordSpacing', 'textAlign', 'fontFamily', 'color'],
      required: true 
    },
    
    // Scoring ranges
    optimal: { type: Number, required: false }, // ideal value
    acceptable: { 
      min: { type: Number, required: false },
      max: { type: Number, required: false }
    },
    
    // UI constraints
    sliderRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      step: { type: Number, default: 1 },

      // For binary choice properties (font, color)
      options: [{ type: String }], // Available choices
      correctAnswer: { type: String }, // Correct answer for binary choices
      unit: { type: String, default: '' } // Unit for display (px, em, etc)
    }
  }],
  
  // Context for scoring
  designContext: {
    readingDistance: { type: String }, // "far", "medium", "close"
    targetAudience: { type: String }, // "elderly", "children", "general"
    purpose: { type: String } // "warning", "informational", "decorative"
  },
  
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Typography", typographySchema);