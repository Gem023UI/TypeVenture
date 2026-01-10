import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "../../models/quiz.js";

dotenv.config({ path: "./backend/.env" });

const quizData = {
  lessonNumber: new mongoose.Types.ObjectId("68e3fa7ee6981fcb7ccf5ef4"),
  questions: [
    {
      question: "Which of the following best differentiates legibility from readability in typography?",
      options: [
        "Legibility is about how comfortably text can be read; readability is about letterform clarity.",
        "Legibility focuses on letterform recognition, while readability deals with text flow and comprehension.",
        "Both terms refer to how clear text appears on digital screens.",
      ],
      answer: "Legibility focuses on letterform recognition, while readability deals with text flow and comprehension.",
    },
    {
      question: "Why is achieving both legibility and readability crucial in digital design?",
      options: [
        "It ensures consistent spacing in body text.",
        "It balances aesthetic appeal with functional comprehension.",
        "It allows more decorative fonts to be used.",
      ],
      answer: "It balances aesthetic appeal with functional comprehension.",
    },
    {
      question: "Which factor most negatively affects readability?",
      options: [
        "Short paragraphs",
        "Optimal line height",
        "Overly long line lengths and poor spacing",
      ],
      answer: "Overly long line lengths and poor spacing",
    },
    {
      question: "Scannability primarily addresses which user behavior?",
      options: [
        "Users reading every word for deep understanding",
        "Users skimming to locate key information",
        "Users ignoring text in favor of visuals",
      ],
      answer: "Users skimming to locate key information",
    },
    {
      question: "According to Uxcel, which typographic strategy enhances scannability?",
      options: [
        "Using uniform font weights across all text",
        "Applying hierarchy through headings and subheadings",
        "Aligning all text to the right side of the layout",
      ],
      answer: "Applying hierarchy through headings and subheadings",
    },
    {
      question: "How does typographic hierarchy contribute to usability?",
      options: [
        "It establishes visual order and guides the reader’s attention.",
        "It makes the page appear more decorative.",
        "It reduces the need for alignment and spacing.",
      ],
      answer: "It establishes visual order and guides the reader’s attention.",
    },
    {
      question: "What is the main role of contrast in typographic design?",
      options: [
        "To create strong emotional impact through color",
        "To visually separate and emphasize important text elements",
        "To ensure text uses consistent font weights",
      ],
      answer: "To visually separate and emphasize important text elements",
    },
    {
      question: "Typographic mood mainly influences:",
      options: [
        "Emotional and psychological perception of content",
        "The number of fonts used in a layout",
        "The alignment style chosen for the layout",
      ],
      answer: "Emotional and psychological perception of content",
    },
    {
      question: "Which font best communicates tradition and reliability according to typographic mood theory?",
      options: [
        "Serif",
        "Sans serif",
        "Monospace",
      ],
      answer: "Serif",
    },
    {
      question: "A designer chooses a rounded sans serif typeface to create a friendly and approachable tone. This decision reflects which typographic principle?",
      options: [
        "Typographic mood",
        "Scannability",
        "White space",
      ],
      answer: "Typographic mood",
    },
    {
      question: "Why does Uxcel recommend using only two to three typefaces in a design?",
      options: [
        "To ensure faster website loading times",
        "To maintain visual harmony and avoid confusion",
        "To meet accessibility color-contrast standards",
      ],
      answer: "To maintain visual harmony and avoid confusion",
    },
    {
      question: "What is typographic scale primarily used for?",
      options: [
        "Establishing proportional relationships between different text sizes",
        "Choosing matching color palettes",
        "Creating text alignment along a grid",
      ],
      answer: "Establishing proportional relationships between different text sizes",
    },
    {
      question: "Which of the following best represents typographic rhythm?",
      options: [
        "Consistent spacing and proportional text hierarchy",
        "Frequent font switching to create visual interest",
        "Randomized font sizes to draw attention",
      ],
      answer: "Consistent spacing and proportional text hierarchy",
    },
    {
      question: "Alignment in typography primarily affects:",
      options: [
        "Emotional tone of the design",
        "Structural order and connection among text elements",
        "Font compatibility across browsers",
      ],
      answer: "Structural order and connection among text elements",
    },
    {
      question: "The principle of proximity in typography helps the reader by:",
      options: [
        "Adding more spacing between unrelated elements",
        "Grouping related information together for easier interpretation",
        "Increasing text contrast for accessibility",
      ],
      answer: "Grouping related information together for easier interpretation",
    },
    {
      question: "What is the main visual benefit of white space in layout design?",
      options: [
        "It allows designers to fit more text on the page.",
        "It reduces clutter and enhances focus.",
        "It ensures equal line height for all text blocks.",
      ],
      answer: "It reduces clutter and enhances focus.",
    },
    {
      question: "In typography, what happens when there’s too little white space?",
      options: [
        "The composition feels tight and visually overwhelming.",
        "The text becomes too legible to read comfortably.",
        "The design looks overly minimalist and bland.",
      ],
      answer: "The composition feels tight and visually overwhelming.",
    },
    {
      question: "How does balance relate to alignment, proximity, and white space?",
      options: [
        "These elements collectively maintain equilibrium in composition.",
        "Balance is unrelated to spacing and hierarchy.",
        "Only proximity determines balance.",
      ],
      answer: "These elements collectively maintain equilibrium in composition.",
    },
    {
      question: "A layout where multiple fonts compete for attention and visual hierarchy is lost violates which principle?",
      options: [
        "Limited typeface usage",
        "Typographic mood",
        "Scannability",
      ],
      answer: "Limited typeface usage",
    },
    {
      question: "Which best summarizes the overarching goal of Uxcel’s typographic principles?",
      options: [
        "To create decorative and artistic compositions",
        "To merge beauty and usability for effective communication",
        "To prioritize aesthetics over content comprehension",
      ],
      answer: "To merge beauty and usability for effective communication",
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
