import mongoose from "mongoose";

const sliderRangeSchema = new mongoose.Schema({
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    required: true
  },
  options: {
    type: [String],
    default: undefined
  },
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  unit: {
    type: String,
    default: ""
  }
}, { _id: false });

const acceptableSchema = new mongoose.Schema({
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  }
}, { _id: false });

const adjustablePropertySchema = new mongoose.Schema({
  property: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  optimal: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  acceptable: {
    type: acceptableSchema,
    default: () => ({})
  },
  sliderRange: {
    type: sliderRangeSchema,
    required: true
  }
});

const designContextSchema = new mongoose.Schema({
  readingDistance: {
    type: String,
    enum: ['close', 'medium', 'far'],
    required: true
  },
  targetAudience: {
    type: String,
    enum: ['general', 'elderly', 'children', 'professionals'],
    required: true
  },
  purpose: {
    type: String,
    enum: ['navigational', 'informational', 'actionable', 'decorative'],
    required: true
  }
}, { _id: false });

const exerciseSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  scenario: {
    type: String,
    required: true
  },
  displayText: {
    type: String,
    required: true
  },
  adjustableProperties: {
    type: [adjustablePropertySchema],
    required: true
  },
  designContext: {
    type: designContextSchema,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Typography", exerciseSchema);