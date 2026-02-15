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

const seedLesson1Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 1 quiz
    await Game.deleteMany({ gameType: "lesson1quiz" });
    console.log("🗑️  Cleared existing Lesson 1 quiz");

    // Get Lesson 1
    const lesson1 = await Lesson.findOne({ title: /I\. Beginning Graphic Design/ });
    
    if (!lesson1) {
      console.log("⚠️  Lesson 1 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson1Quiz = {
      title: "Quiz: Beginning Graphic Design - Typography",
      description: "Test your knowledge of typography basics and principles!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson1quiz",
      lessonId: lesson1._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "What is typography primarily defined as?",
          questionType: "multiple",
          options: [
            "The art and technique of working with text",
            "Only the appearance of printed text",
            "A type of graphic design software",
            "The process of creating fonts"
          ],
          correctAnswer: "The art and technique of working with text"
        },
        {
          questionText: "Which font category features small decorative strokes at the ends of letters?",
          questionType: "multiple",
          options: [
            "Sans serif",
            "Display",
            "Serif",
            "Monospace"
          ],
          correctAnswer: "Serif"
        },
        {
          questionText: "What are display fonts best used for?",
          questionType: "multiple",
          options: [
            "Long paragraphs of body text",
            "Short text like titles and headers",
            "Technical documentation",
            "Legal documents"
          ],
          correctAnswer: "Short text like titles and headers"
        },
        {
          questionText: "Which of these fonts is commonly considered overused and should be avoided?",
          questionType: "multiple",
          options: [
            "Helvetica",
            "Comic Sans",
            "Garamond",
            "Futura"
          ],
          correctAnswer: "Comic Sans"
        },
        {
          questionText: "How many fonts should typically be used in one design?",
          questionType: "multiple",
          options: [
            "As many as possible",
            "One or two",
            "At least five",
            "Only one"
          ],
          correctAnswer: "One or two"
        },
        // Questions 6-10: True/False
        {
          questionText: "Sans serif fonts work especially well in digital formats like websites and apps.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Typography is only about the appearance of text, not how it's arranged.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Leading refers to the vertical spacing between lines of text.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Tracking adjusts the space between specific character pairs.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Hierarchy helps guide readers through information efficiently.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for vertical spacing between lines:",
          questionType: "fillblank",
          correctAnswer: "Leading",
          ...createBlanks("Leading", 3)
        },
        {
          questionText: "Complete the word for adjusting space between all characters:",
          questionType: "fillblank",
          correctAnswer: "Tracking",
          ...createBlanks("Tracking", 3)
        },
        {
          questionText: "Complete the word for space between specific letter pairs:",
          questionType: "fillblank",
          correctAnswer: "Kerning",
          ...createBlanks("Kerning", 3)
        },
        {
          questionText: "Complete the word for visual arrangement of text importance:",
          questionType: "fillblank",
          correctAnswer: "Hierarchy",
          ...createBlanks("Hierarchy", 4)
        },
        {
          questionText: "Complete the word for fonts without decorative strokes:",
          questionType: "fillblank",
          correctAnswer: "Sans Serif",
          ...createBlanks("Sans Serif", 4)
        }
      ],
      isActive: true
    };

    await Game.create(lesson1Quiz);
    console.log(`✅ Created quiz for: ${lesson1.title}`);
    console.log(`   Game Type: lesson1quiz`);
    console.log(`   Questions: ${lesson1Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 1 quiz:", error);
    process.exit(1);
  }
};

seedLesson1Quiz();