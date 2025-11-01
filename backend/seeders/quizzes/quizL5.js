import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "../../models/quiz.js";

dotenv.config({ path: "./backend/.env" });

const quizData = {
  lessonNumber: new mongoose.Types.ObjectId("68e3fa7fe6981fcb7ccf5efd"),
  questions: [
    {
      question: "According to Smashing Magazine, what is the minimum recommended font size for web body copy?",
      options: ["14 px", "16 px", "18 px"],
      answer: "16 px",
    },
    {
      question: "What does macrotypography primarily concern itself with?",
      options: [
        "Micro-adjustments in kerning and glyphs",
        "Overall page layout, grids, and line length",
        "Web font file optimization",
      ],
      answer: "Overall page layout, grids, and line length",
    },
    {
      question: "Which practice should be avoided when using decorative drop caps?",
      options: [
        "Embedding scalable fonts",
        "Using raster images that break accessibility",
        "Applying :first-letter pseudo-selectors",
      ],
      answer: "Using raster images that break accessibility",
    },
    {
      question: "What caution does the article give about using @font-face?",
      options: [
        "Fonts might display differently across browsers and devices",
        "It removes the need for fallback fonts",
        "It’s only supported by older browsers",
      ],
      answer: "Fonts might display differently across browsers and devices",
    },
    {
      question: "What font pairing is described as “almost impossible to get wrong”?",
      options: [
        "Serif for both header and body",
        "Sans-serif header with serif body",
        "Cursive header with condensed body",
      ],
      answer: "Sans-serif header with serif body",
    },
    {
      question: "What defines a good text face for digital body copy?",
      options: [
        "Ornamental features and complex ligatures",
        "Familiarity and proven readability at small sizes",
        "Narrow spacing for more words per line",
      ],
      answer: "Familiarity and proven readability at small sizes",
    },
    {
      question: "Which statement is NOT among the five principles for choosing typefaces?",
      options: [
        "Always select the most decorative font available",
        "Define audience reaction before choosing",
        "Consider legibility before aesthetics",
      ],
      answer: "Always select the most decorative font available",
    },
    {
      question: "Which quote reflects the concept of reading habits influencing legibility?",
      options: [
        "Legibility is subjective and relies on personal emotion.",
        "Almost everyone reads most easily matter set up in the style and size to which he has become habituated.",
        "Typography should always look surprising.",
      ],
      answer: "Almost everyone reads most easily matter set up in the style and size to which he has become habituated.",
    },
    {
      question: "Regarding line length, which principle does the article emphasize?",
      options: [
        "Excessive line length increases fatigue",
        "Moderately long lines enhance comprehension",
        "Line length doesn’t affect usability",
      ],
      answer: "Moderately long lines enhance comprehension",
    },
    {
      question: "What limitation do Web-safe fonts present to modern web designers?",
      options: [
        "They restrict creative freedom and typographic expression",
        "They cannot be used for headings",
        "They are always serif fonts",
      ],
      answer: "They restrict creative freedom and typographic expression",
    },
    {
      question: "What should designers do about font rendering differences between systems?",
      options: [
        "Test fonts and select ones that render consistently",
        "Ignore rendering; all browsers auto-optimize",
        "Use only open-source typefaces",
      ],
      answer: "Test fonts and select ones that render consistently",
    },
    {
      question: "A font-face kit generator helps designers by:",
      options: [
        "Creating web-safe image fallbacks",
        "Converting fonts for multi-browser embedding",
        "Compressing TTF files for SEO",
      ],
      answer: "Converting fonts for multi-browser embedding",
    },
    {
      question: "The web font revolution introduced a new challenge for typography:",
      options: [
        "Accessibility and performance concerns",
        "Loss of typographic diversity",
        "Reduced designer creativity",
      ],
      answer: "Accessibility and performance concerns",
    },
    {
      question: "The article’s stance on “weird but illegible” fonts is that:",
      options: [
        "They should never be used in brand design",
        "They fail if they sacrifice legibility",
        "They are suitable only for calligraphy",
      ],
      answer: "They fail if they sacrifice legibility",
    },
    {
      question: "Why is choosing a typeface based purely on aesthetic taste risky?",
      options: [
        "It overlooks the font’s intended readability",
        "It violates standard licensing",
        "It makes print conversions difficult",
      ],
      answer: "It overlooks the font’s intended readability",
    },
    {
      question: "From The Perfect Paragraph insights, Smashing Magazine notes that:",
      options: [
        "Line length and spacing should adapt to screen contexts",
        "Drop caps improve online legibility",
        "Indentation is obsolete in digital media",
      ],
      answer: "Line length and spacing should adapt to screen contexts",
    },
    {
      question: "Fonts sized between 10–15 px are discouraged because they:",
      options: [
        "Are less readable for most users",
        "Take longer to download",
        "Break responsive grids",
      ],
      answer: "Are less readable for most users",
    },
    {
      question: "Why are classic fonts like Times New Roman still widely used?",
      options: [
        "They are familiar and thus more readable",
        "They are always free for commercial use",
        "They display bold weight better",
      ],
      answer: "They are familiar and thus more readable",
    },
    {
      question: "The analysis of 50 websites measured which typographic ratio?",
      options: [
        "Line-height to line-length",
        "Header size to paragraph size",
        "Font weight to kerning width",
      ],
      answer: "Line-height to line-length",
    },
    {
      question: "What is the article’s final takeaway on effective typography?",
      options: [
        "Prioritize clarity and purpose over novelty",
        "Design purely for visual impact",
        "Avoid serif fonts entirely",
      ],
      answer: "Prioritize clarity and purpose over novelty",
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
