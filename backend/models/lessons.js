import mongoose from "mongoose";

/* ── Typeface option (font-select) ── */
const typefaceOptionSchema = new mongoose.Schema({
  typefaceTitle: { type: String, default: "" },
  font:          { type: String, default: "" },
  vibe:          { type: String, default: "" },
}, { _id: false });

/* ── Brand persona (brand-pairing) ── */
const brandPersonaSchema = new mongoose.Schema({
  personaTitle:  { type: String, default: "" },
  headlineFont:  { type: String, default: "" },
  bodyFont:      { type: String, default: "" },
  vibe:          { type: String, default: "" },
}, { _id: false });

/* ── Text layer (hierarchy-builder) ── */
const textLayerSchema = new mongoose.Schema({
  text:           { type: String, default: "" },
  role:           { type: String, default: "" },   // "title" | "subtitle" | "body" | "alert"
  targetFontSize: { type: Number, default: 16  },
  targetWeight:   { type: String, default: "Regular" },
  targetColor:    { type: String, default: "#000000" },
  targetCase:     { type: String, default: "normal" }, // "normal" | "uppercase"
}, { _id: false });

/* ── Learning objective ── */
const objectiveSchema = new mongoose.Schema({
  objective: { type: String, default: "" },
}, { _id: false });

/* ══════════════════════════════════════════
   QUIZ ITEM SCHEMA
══════════════════════════════════════════ */
const quizItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "multiple-choice",
      "identification",
      "scenario",
      "kerning-slide",
      "leading-lines",
      "x-height-detective",
      "font-select",
      "hierarchy-builder",
      "brand-pairing",
    ],
    default: "multiple-choice",
  },

  // ── shared ──────────────────────────────
  question:      { type: String, required: true },
  correctAnswer: { type: String, required: true },
  explanation:   { type: String },

  // ── multiple-choice / scenario / x-height-detective ──
  choices:  [{ type: String }],
  scenario: { type: String },

  // ── kerning-slide ────────────────────────
  letterA:      { type: String },
  letterB:      { type: String },
  targetOffset: { type: Number },
  tolerance:    { type: Number },
  min:          { type: Number },
  max:          { type: Number },

  // ── leading-lines ────────────────────────
  sentence1:        { type: String, default: "" },
  sentence2:        { type: String, default: "" },
  minLeading:       { type: Number, default: 10 },
  maxLeading:       { type: Number, default: 60 },
  targetLeading:    { type: Number, default: 24 },
  toleranceLeading: { type: Number, default: 4  },

  // ── font-select ──────────────────────────
  theme:              { type: String, default: "" },
  mechanic:           { type: String, default: "" },
  learningObjectives: [objectiveSchema],
  narrative:          { type: String, default: "" },
  narrativeContext:   { type: String, default: "" },
  problem:            { type: String, default: "" },
  problemContext:     { type: String, default: "" },
  contextImage:       { type: String, default: "" },
  backgroundImage:    { type: String, default: "" },
  displayText:        { type: String, default: "" },
  subtext:            { type: String, default: "" },
  wrongFont:          { type: String, default: "" },     // font shown on canvas before player picks
  correctAnswers:     [{ type: String }],                // supports multiple valid answers
  typefaceOptions:    [typefaceOptionSchema],

  // ── hierarchy-builder ───────────────────
  // correctAnswer = comma-joined "role:text" pairs used for evaluation
  // textLayers holds all layers; player assigns each a role
  textLayers:         [textLayerSchema],
  availableRoles:     [{ type: String }],  // roles the player can assign, e.g. ["title","subtitle","body","alert"]

  // ── brand-pairing ────────────────────────
  // correctAnswer = personaTitle of correct persona
  brandBackground:    { type: String, default: "" },    // Cloudinary URL for canvas bg
  headlineText:       { type: String, default: "" },    // text shown as headline on canvas
  bodyText:           { type: String, default: "" },    // text shown as body on canvas
  wrongHeadlineFont:  { type: String, default: "" },    // font shown on canvas initially (broken state)
  wrongBodyFont:      { type: String, default: "" },
  brandPersonas:      [brandPersonaSchema],

}, { _id: false });

/* ══════════════════════════════════════════
   SECTION SCHEMA
══════════════════════════════════════════ */
const sectionSchema = new mongoose.Schema({
  header:     { type: String, default: "" },
  discussion: { type: String, default: "" },
  images:     [{ type: String }],
  authorLink: { type: String, default: "" },
}, { _id: false });

/* ══════════════════════════════════════════
   LESSON SCHEMA
══════════════════════════════════════════ */
const lessonSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  lessonImage:    { type: String, default: "" },
  difficulty:     { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"], default: "Beginner" },
  completionTime: { type: String, default: "~15 min" },
  youtubeUrl:     { type: String, default: "" },

  description: { type: String, default: "" },
  instruction: { type: String, default: "" },

  sections: [sectionSchema],
  quiz:     [quizItemSchema],

  usersDone: [{
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    completedAt: { type: Date, default: Date.now },
  }],

  createdAt: { type: Date, default: Date.now },
});

lessonSchema.index({ "usersDone.userId": 1 });

export default mongoose.model("Lesson", lessonSchema);