import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "../../models/quiz.js";

dotenv.config({ path: "./backend/.env" });

const quizData = {
  lessonNumber: new mongoose.Types.ObjectId("68e3fa7ee6981fcb7ccf5ef1"),
  questions: [
    {
      question: "What is typography?",
      options: [
        "The color scheme used in design",
        "The style or appearance of text / the art of working with text",
        "The layout grid for images",
      ],
      answer: "The style or appearance of text / the art of working with text",
    },
    {
      question: "Which element distinguishes a serif font?",
      options: [
        "It has little strokes (serifs) attached to letters",
        "It is always bold and heavy",
        "It has no decorative elements",
      ],
      answer: "It has little strokes (serifs) attached to letters",
    },
    {
      question: "What does “sans serif” mean?",
      options: ["With serifs", "Without serifs", "Decorative style"],
      answer: "Without serifs",
    },
    {
      question: "For what kind of use are display fonts best suited?",
      options: [
        "Large blocks of body text",
        "Decorative or attention-getting text (e.g. titles, headers)",
        "Hidden watermark text",
      ],
      answer: "Decorative or attention-getting text (e.g. titles, headers)",
    },
    {
      question: "Why should you limit yourself to one or two fonts in a design?",
      options: [
        "Because more fonts slow printing",
        "To keep visual consistency and avoid clutter",
        "To reduce the file size",
      ],
      answer: "To keep visual consistency and avoid clutter",
    },
    {
      question: "Which of these is a font generally suggested to avoid due to overuse or reputation?",
      options: ["Helvetica", "Comic Sans", "Georgia"],
      answer: "Comic Sans",
    },
    {
      question: "What is hierarchy in typography?",
      options: [
        "A list of fonts ranked by quality",
        "A way to guide the reader’s eye to what’s most important using emphasis",
        "The order in which letters are drawn",
      ],
      answer: "A way to guide the reader’s eye to what’s most important using emphasis",
    },
    {
      question: "What is leading (pronounced “ledding”)?",
      options: [
        "The space between paragraphs",
        "The space between lines of text (line spacing)",
        "The space between words",
      ],
      answer: "The space between lines of text (line spacing)",
    },
    {
      question: "What is tracking (character spacing)?",
      options: [
        "The space between sentences",
        "The overall space between characters in a group of text",
        "The vertical distance between baselines",
      ],
      answer: "The overall space between characters in a group of text",
    },
    {
      question: "What is kerning?",
      options: [
        "The uniform spacing between all characters in a font",
        "The space between specific pairs of characters",
        "The thickness of strokes",
      ],
      answer: "The space between specific pairs of characters",
    },
    {
      question: "How does kerning differ from tracking?",
      options: [
        "Kerning adjusts global spacing; tracking adjusts pair spacing",
        "Kerning adjusts spacing for specific character pairs; tracking adjusts spacing uniformly",
        "They are the same thing",
      ],
      answer:
        "Kerning adjusts spacing for specific character pairs; tracking adjusts spacing uniformly",
    },
    {
      question: "Which font pairing is often recommended because of contrast?",
      options: ["Serif + serif", "Sans serif + serif", "Two decorative fonts"],
      answer: "Sans serif + serif",
    },
    {
      question: "When choosing a font, what should you consider first?",
      options: [
        "What message or tone you want to convey",
        "Whether the font is free or paid",
        "Whether the font looks fancy",
      ],
      answer: "What message or tone you want to convey",
    },
    {
      question: "Why are sans serif fonts often easier to read on screens?",
      options: [
        "Because monitors can’t display serifs",
        "Because they are simpler and cleaner in design",
        "Because they are smaller",
      ],
      answer: "Because they are simpler and cleaner in design",
    },
    {
      question: "Which of these is not one of the “other important terms” mentioned in the lesson?",
      options: ["Leading", "Tracking", "Glyph scaling"],
      answer: "Glyph scaling",
    },
    {
      question: "Which of the following is true about combining fonts?",
      options: [
        "Always use nonrelated fonts",
        "Use fonts that are different but complementary (e.g. serif + sans serif)",
        "Use as many fonts as possible to show variety",
      ],
      answer: "Use fonts that are different but complementary (e.g. serif + sans serif)",
    },
    {
      question: "What happens if line spacing (leading) is too tight or too loose?",
      options: [
        "Nothing; it doesn’t affect readability",
        "It can make the text hard or unpleasant to read",
        "It automatically corrects by the software",
      ],
      answer: "It can make the text hard or unpleasant to read",
    },
    {
      question: "What is the main purpose of adjusting tracking?",
      options: [
        "To align text with images",
        "To improve readability or create an aesthetic effect",
        "To change the font style",
      ],
      answer: "To improve readability or create an aesthetic effect",
    },
    {
      question: "Which of these statements is correct?",
      options: [
        "You should never adjust kerning because fonts are perfect",
        "Some fonts come with bad kerning and may need adjustment",
        "Tracking and kerning always solve the same problem",
      ],
      answer: "Some fonts come with bad kerning and may need adjustment",
    },
    {
      question: "In establishing hierarchy, what is a common technique to make something stand out?",
      options: [
        "Make all elements the same size",
        "Use larger size, bolder weight, or different style for the most important elements",
        "Use only lowercase letters",
      ],
      answer:
        "Use larger size, bolder weight, or different style for the most important elements",
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
