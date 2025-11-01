import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "../../models/quiz.js";

dotenv.config({ path: "./backend/.env" });

const quizData = {
  lessonNumber: new mongoose.Types.ObjectId("68e3fa7fe6981fcb7ccf5f00"),
  questions: [
    {
      question: "Which of the following best defines type anatomy?",
      options: [
        "The structural elements that make up individual letterforms",
        "The stylistic family a typeface belongs to",
        "The contrast between thick and thin strokes",
      ],
      answer: "The structural elements that make up individual letterforms",
    },
    {
      question: "In typography, x-height primarily affects which of the following?",
      options: [
        "The spacing between words",
        "Readability in small sizes",
        "The perceived boldness of type",
      ],
      answer: "Readability in small sizes",
    },
    {
      question: "The baseline in typography serves as:",
      options: [
        "The line where most characters sit",
        "The height of ascenders",
        "The distance between columns of text",
      ],
      answer: "The line where most characters sit",
    },
    {
      question: "Which of the following best explains kerning?",
      options: [
        "The vertical spacing between lines of text",
        "The horizontal space between individual letters",
        "The measurement of paragraph indentation",
      ],
      answer: "The horizontal space between individual letters",
    },
    {
      question: "The term leading originates from:",
      options: [
        "The width of letter strokes",
        "The direction of text flow",
        "The strips of lead used to separate lines in metal type",
      ],
      answer: "The strips of lead used to separate lines in metal type",
    },
    {
      question: "Why is contrast essential in typographic hierarchy?",
      options: [
        "It distinguishes important content through size or weight differences",
        "It limits the use of multiple typefaces",
        "It ensures fonts render properly on screen",
      ],
      answer: "It distinguishes important content through size or weight differences",
    },
    {
      question: "A typeface designed for digital screens should prioritize:",
      options: [
        "Low contrast and open counters",
        "Narrow tracking and tall x-heights",
        "Decorative features and complex ligatures",
      ],
      answer: "Low contrast and open counters",
    },
    {
      question: "Which font pairing principle maintains the highest readability?",
      options: [
        "Combining multiple script fonts",
        "Pairing serif with sans serif for contrast",
        "Mixing novelty fonts for visual diversity",
      ],
      answer: "Pairing serif with sans serif for contrast",
    },
    {
      question: "The purpose of alignment consistency in design is to:",
      options: [
        "Reduce white space for compact layouts",
        "Create structured relationships between elements",
        "Make text appear informal and dynamic",
      ],
      answer: "Create structured relationships between elements",
    },
    {
      question: "Excessive use of different fonts can:",
      options: [
        "Confuse hierarchy and readability",
        "Strengthen brand recognition",
        "Improve line spacing balance",
      ],
      answer: "Confuse hierarchy and readability",
    },
    {
      question: "Orphans and widows refer to:",
      options: [
        "Words or lines isolated at the beginning or end of columns",
        "Decorative font variations",
        "Mismatched type weights",
      ],
      answer: "Words or lines isolated at the beginning or end of columns",
    },
    {
      question: "Which type of font conveys authority and reliability?",
      options: ["Script", "Serif", "Sans-serif"],
      answer: "Serif",
    },
    {
      question: "The ascender of a letter is:",
      options: [
        "The section below the baseline",
        "The part of a lowercase letter that extends above the x-height",
        "The height of capital letters",
      ],
      answer: "The part of a lowercase letter that extends above the x-height",
    },
    {
      question: "Typographic color refers to:",
      options: [
        "The overall visual density of a text block",
        "The literal color applied to text",
        "The alignment of text columns",
      ],
      answer: "The overall visual density of a text block",
    },
    {
      question: "When designing for accessibility, which principle is most crucial?",
      options: [
        "Compact kerning",
        "High contrast between text and background",
        "Minimal whitespace",
      ],
      answer: "High contrast between text and background",
    },
    {
      question: "The best way to ensure readability in long paragraphs is to:",
      options: [
        "Use narrow line lengths with proper leading",
        "Apply condensed fonts",
        "Use all caps for emphasis",
      ],
      answer: "Use narrow line lengths with proper leading",
    },
    {
      question: "Which alignment type typically provides a clean and formal appearance?",
      options: ["Center alignment", "Justified alignment", "Right alignment"],
      answer: "Justified alignment",
    },
    {
      question: "The principle of proximity in typography helps readers:",
      options: [
        "Interpret which elements are visually related",
        "Avoid misreading letter shapes",
        "Identify the type designer",
      ],
      answer: "Interpret which elements are visually related",
    },
    {
      question: "Which typographic adjustment improves legibility in narrow columns?",
      options: [
        "Increasing tracking",
        "Switching to decorative fonts",
        "Decreasing x-height",
      ],
      answer: "Increasing tracking",
    },
    {
      question: "A designer who maintains consistent typographic rhythm achieves:",
      options: [
        "A smooth reading experience with balanced spacing",
        "Minimal contrast between text elements",
        "Irregular alignment for emphasis",
      ],
      answer: "A smooth reading experience with balanced spacing",
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
