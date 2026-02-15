import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../../models/games.js";
import Lesson from "../../models/lessons.js";

dotenv.config();

// Helper function for fill-in-blank
const createBlanks = (answer, numberOfBlanks) => {
  const letters = answer.split('');
  const letterIndices = [];
  
  letters.forEach((char, index) => {
    if (/[a-zA-Z]/.test(char)) {
      letterIndices.push(index);
    }
  });
  
  const blankedPositions = [];
  const shuffled = [...letterIndices].sort(() => 0.5 - Math.random());
  const blanksToCreate = Math.min(numberOfBlanks, shuffled.length);
  
  for (let i = 0; i < blanksToCreate; i++) {
    blankedPositions.push(shuffled[i]);
  }
  
  const displayArray = letters.map((char, index) => {
    if (blankedPositions.includes(index)) {
      return '_';
    }
    return char;
  });
  
  const missingLetters = blankedPositions
    .sort((a, b) => a - b)
    .map(pos => letters[pos].toUpperCase());
  
  return {
    displayText: displayArray.join(''),
    missingLetters: missingLetters,
    blankedPositions: blankedPositions.sort((a, b) => a - b)
  };
};

const seedLesson2Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 2 quiz
    await Game.deleteMany({ gameType: "lesson2quiz" });
    console.log("🗑️  Cleared existing Lesson 2 quiz");

    // Get Lesson 2
    const lesson2 = await Lesson.findOne({ title: /II\. Uxcel/ });
    
    if (!lesson2) {
      console.log("⚠️  Lesson 2 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson2Quiz = {
      title: "Quiz: Uxcel – Typographic Principles",
      description: "Test your knowledge of essential typographic principles in UX and visual design!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson2quiz",
      lessonId: lesson2._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "What is the difference between readability and legibility?",
          questionType: "multiple",
          options: [
            "Legibility is about letterform design, readability is about comprehension",
            "They mean the same thing",
            "Readability is about letterform design, legibility is about comprehension",
            "Legibility applies only to digital text"
          ],
          correctAnswer: "Legibility is about letterform design, readability is about comprehension"
        },
        {
          questionText: "What is the recommended minimum body text size for accessibility?",
          questionType: "multiple",
          options: [
            "12px",
            "14px",
            "16px",
            "18px"
          ],
          correctAnswer: "16px"
        },
        {
          questionText: "What is the recommended line length for optimal readability?",
          questionType: "multiple",
          options: [
            "30-40 characters per line",
            "45-70 characters per line",
            "80-100 characters per line",
            "As long as possible"
          ],
          correctAnswer: "45-70 characters per line"
        },
        {
          questionText: "Why is scannability important in modern design?",
          questionType: "multiple",
          options: [
            "Users want to read every word carefully",
            "Most users scan text first to decide if content is worth reading",
            "It makes text look more professional",
            "It reduces the amount of content needed"
          ],
          correctAnswer: "Most users scan text first to decide if content is worth reading"
        },
        {
          questionText: "How many typefaces should most digital products use?",
          questionType: "multiple",
          options: [
            "One only",
            "No more than three",
            "At least five",
            "As many as needed"
          ],
          correctAnswer: "No more than three"
        },
        // Questions 6-10: True/False
        {
          questionText: "Sentence case feels most natural because it mimics how we learn to write.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Typography can convey emotion and influence how users feel about a brand.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "All caps text is best for long paragraphs.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "White space (negative space) has no functional purpose in typography.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Proximity helps readers visually associate related text elements.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for how easily text can be understood:",
          questionType: "fillblank",
          correctAnswer: "Readability",
          ...createBlanks("Readability", 4)
        },
        {
          questionText: "Complete the word for how easily individual letterforms can be distinguished:",
          questionType: "fillblank",
          correctAnswer: "Legibility",
          ...createBlanks("Legibility", 4)
        },
        {
          questionText: "Complete the word for the ability to quickly find information in text:",
          questionType: "fillblank",
          correctAnswer: "Scannability",
          ...createBlanks("Scannability", 4)
        },
        {
          questionText: "Complete the word for drawing attention to important information:",
          questionType: "fillblank",
          correctAnswer: "Emphasis",
          ...createBlanks("Emphasis", 3)
        },
        {
          questionText: "Complete the word for grouping related elements together:",
          questionType: "fillblank",
          correctAnswer: "Proximity",
          ...createBlanks("Proximity", 3)
        }
      ],
      isActive: true
    };

    await Game.create(lesson2Quiz);
    console.log(`✅ Created quiz for: ${lesson2.title}`);
    console.log(`   Game Type: lesson2quiz`);
    console.log(`   Questions: ${lesson2Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 2 quiz:", error);
    process.exit(1);
  }
};

seedLesson2Quiz();