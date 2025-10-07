import mongoose from "mongoose";

const typographySchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  
  // Challenge setup
  prompt: { type: String, required: true }, // "Design a warning sign for..."
  scenario: { type: String, required: true }, // "caution-sign", "event-poster", etc.
  displayText: { type: String, required: true },
  
  // Typography properties to adjust
  adjustableProperties: [{
    property: { 
      type: String, 
      enum: ['letterSpacing', 'lineHeight', 'fontSize', 'wordSpacing', 'textAlign'],
      required: true 
    },
    
    // Scoring ranges
    optimal: { type: Number, required: true }, // ideal value
    acceptable: { 
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    
    // UI constraints
    sliderRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      step: { type: Number, default: 1 }
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