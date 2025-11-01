import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "../../models/quiz.js";

dotenv.config({ path: "./backend/.env" });

const quizData = {
  lessonNumber: new mongoose.Types.ObjectId("68e3fa7fe6981fcb7ccf5f03"),
  questions: [
    {
      question: "What is the primary visual purpose of optical alignment in typography?",
      options: [
        "To adjust letter edges so text appears visually aligned, not mathematically aligned",
        "To maintain equal side bearings on all letters",
        "To ensure baseline shifts appear uniform across all glyphs",
      ],
      answer: "To adjust letter edges so text appears visually aligned, not mathematically aligned",
    },
    {
      question: "Which of the following best represents typographic voice?",
      options: [
        "The perceived weight and density of text blocks",
        "The stylistic tone communicated through a typeface’s form and proportion",
        "The balance between x-height and cap height",
      ],
      answer: "The stylistic tone communicated through a typeface’s form and proportion",
    },
    {
      question: "Why does Krause emphasize overshoot in letterforms like “O” or “S”?",
      options: [
        "To ensure curved letters appear visually aligned with flat ones",
        "To create extra tracking for symmetrical letters",
        "To exaggerate counters for visual interest",
      ],
      answer: "To ensure curved letters appear visually aligned with flat ones",
    },
    {
      question: "When designing text over complex imagery, what is the most reliable technique to preserve legibility?",
      options: [
        "Increase tracking for better clarity",
        "Apply a semi-transparent overlay beneath text",
        "Convert text to outlines for bolder edges",
      ],
      answer: "Apply a semi-transparent overlay beneath text",
    },
    {
      question: "In typographic composition, rhythm primarily results from:",
      options: [
        "Alternating weights in every other line",
        "Using proportional scaling on each paragraph",
        "Consistent spacing and visual pacing between elements",
      ],
      answer: "Consistent spacing and visual pacing between elements",
    },
    {
      question: "What key risk arises when mixing fonts with nearly identical proportions but different personalities?",
      options: [
        "They improve readability but reduce contrast",
        "They make the composition overly predictable",
        "They may look subtly discordant or conflict visually",
      ],
      answer: "They may look subtly discordant or conflict visually",
    },
    {
      question: "The baseline grid is primarily used to:",
      options: [
        "Create consistent vertical alignment of text across multiple columns",
        "Measure stroke widths for even rhythm",
        "Define margins relative to ascenders",
      ],
      answer: "Create consistent vertical alignment of text across multiple columns",
    },
    {
      question: "Which typographic factor most strongly influences perceived density or 'color' of a text block?",
      options: [
        "Font size and line length",
        "Stroke thickness and letter spacing",
        "Cap height and ascender length",
      ],
      answer: "Stroke thickness and letter spacing",
    },
    {
      question: "What distinguishes kerning from tracking according to Krause’s principles?",
      options: [
        "Kerning adjusts specific letter pairs; tracking affects overall spacing",
        "Tracking affects vertical spacing while kerning changes alignment",
        "Kerning controls line width; tracking controls height ratio",
      ],
      answer: "Kerning adjusts specific letter pairs; tracking affects overall spacing",
    },
    {
      question: "When establishing hierarchy in typographic layouts, Krause suggests designers should:",
      options: [
        "Emphasize uniformity across all text",
        "Use centered alignment exclusively for balance",
        "Guide the eye with deliberate contrast in size, weight, or color",
      ],
      answer: "Guide the eye with deliberate contrast in size, weight, or color",
    },
    {
      question: "In the context of type anatomy, the shoulder refers to:",
      options: [
        "The curved stroke of letters like “n” or “h”",
        "The crossbar in letters like “A” or “H”",
        "The diagonal stroke of “N”",
      ],
      answer: "The curved stroke of letters like “n” or “h”",
    },
    {
      question: "Krause warns against using display fonts for long text passages because:",
      options: [
        "They distort kerning patterns when scaled down",
        "They compress line height unevenly",
        "Their ornate features reduce readability in small sizes",
      ],
      answer: "Their ornate features reduce readability in small sizes",
    },
    {
      question: "Which statement aligns with Krause’s advice on typographic restraint?",
      options: [
        "Limit your font selection and build contrast intentionally",
        "Avoid repetition in size or alignment for visual surprise",
        "Always pair serif with script for variety",
      ],
      answer: "Limit your font selection and build contrast intentionally",
    },
    {
      question: "What concept does Krause use to describe how spacing and line length affect reading comfort?",
      options: ["Optical flow", "Spatial resistance", "Typographic contrast"],
      answer: "Optical flow",
    },
    {
      question: "According to the book, a strong typographic system balances:",
      options: [
        "Visual order and expressive freedom",
        "Decoration and symmetry",
        "Line length and letter width",
      ],
      answer: "Visual order and expressive freedom",
    },
    {
      question: "What is one practical guideline when setting all-caps text?",
      options: [
        "Increase letter spacing to improve readability",
        "Reduce font weight to maintain visual rhythm",
        "Add a secondary color to emphasize shape",
      ],
      answer: "Increase letter spacing to improve readability",
    },
    {
      question: "The cap height of a typeface affects:",
      options: [
        "The perceived alignment of uppercase letters with ascenders",
        "The balance between counters and stems",
        "The proportion between lowercase and uppercase letters",
      ],
      answer: "The proportion between lowercase and uppercase letters",
    },
    {
      question: "Why does Krause describe negative space as 'active'?",
      options: [
        "Because it visually defines how type is perceived and grouped",
        "Because it determines the tonal contrast of the page",
        "Because it directs how strokes are rendered on screen",
      ],
      answer: "Because it visually defines how type is perceived and grouped",
    },
    {
      question: "Mastering counterforms helps designers:",
      options: [
        "Balance open and closed spaces within letterforms",
        "Create typographic rhythm through repeated shapes",
        "Adjust vertical alignment precisely",
      ],
      answer: "Balance open and closed spaces within letterforms",
    },
    {
      question: "What typographic element most influences texture consistency across large text areas?",
      options: [
        "Consistent baseline alignment",
        "Harmonized contrast between weights",
        "Even typographic rhythm and spacing",
      ],
      answer: "Even typographic rhythm and spacing",
    },
  ],
};

// Database seeding logic
const seedQuiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB Connected...");

    // Delete existing quiz for this lesson first (replace behavior)
    await Quiz.deleteOne({ lessonNumber: quizData.lessonNumber });

    // Insert new quiz
    await Quiz.create(quizData);
    console.log("✅ Typography Quiz successfully seeded!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding quiz:", error);
    process.exit(1);
  }
};

// Run seeder
seedQuiz();
