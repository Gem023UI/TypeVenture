import mongoose from "mongoose";

const quizItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["multiple-choice", "identification", "scenario", "kerning-slide", "leading-lines", "x-height-detective"],
    default: "multiple-choice",
  },
  question:      { type: String, required: true },
  scenario:      { type: String },           // for scenario-based questions
  choices:       [{ type: String }],         // for choice-based questions
  correctAnswer: { type: String, required: true },
  explanation:   { type: String },           // shown after answering
  // kerning-slide specific
  letterA:       { type: String },
  letterB:       { type: String },
  targetOffset:  { type: Number },
  tolerance:     { type: Number },
  min:           { type: Number },
  max:           { type: Number },
}, { _id: false });

const lessonSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  sourceUrl:   { type: String },
  difficulty:  { type: String, enum: ["Beginner","Intermediate","Advanced","Expert"], default: "Beginner" },
  completionTime: { type: String, default: "~15 min" },
  lessonImage: { type: String, default: "" },

  content: {
    description:    { type: String },
    introduction:   { type: String },
    headerOne:      { type: String },
    discussionOne:  { type: String },
    headerTwo:      { type: String },
    discussionTwo:  { type: String },
    headerThree:    { type: String },
    discussionThree:{ type: String },
    headerFour:     { type: String },
    discussionFour: { type: String },
    headerFive:     { type: String },
    discussionFive: { type: String },
    headerSix:      { type: String },
    discussionSix:  { type: String },
    headerSeven:    { type: String },
    discussionSeven:{ type: String },
  },

  youtubeUrl:  { type: String, default: "" },
  imageUrls:   [{ type: String }],

  quiz: [quizItemSchema],

  usersDone: [{
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    completedAt: { type: Date, default: Date.now },
  }],

  createdAt: { type: Date, default: Date.now },
});

lessonSchema.index({ "usersDone.userId": 1 });

export default mongoose.model("Lesson", lessonSchema);