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

const seedLesson11Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 11 quiz
    await Game.deleteMany({ gameType: "lesson11quiz" });
    console.log("🗑️  Cleared existing Lesson 11 quiz");

    // Get Lesson 11
    const lesson11 = await Lesson.findOne({ title: /^XI\. An Essay on Typography/ });
    
    if (!lesson11) {
      console.log("⚠️  Lesson 11 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson11Quiz = {
      title: "Quiz: Understanding Typography | Theory",
      description: "Test your knowledge of typography fundamentals, typefaces vs fonts, and visual hierarchy!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson11quiz",
      lessonId: lesson11._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "What is typography according to the video?",
          questionType: "multiple",
          options: [
            "Only decorative lettering",
            "The practice and art of arranging text to make communication clear and readable",
            "Only font selection",
            "Only digital design"
          ],
          correctAnswer: "The practice and art of arranging text to make communication clear and readable"
        },
        {
          questionText: "What is the difference between a typeface and a font?",
          questionType: "multiple",
          options: [
            "They are exactly the same thing",
            "A typeface is a design family; fonts are specific styles within that family",
            "Fonts are only for digital use",
            "Typefaces are only for print use"
          ],
          correctAnswer: "A typeface is a design family; fonts are specific styles within that family"
        },
        {
          questionText: "What does readability refer to?",
          questionType: "multiple",
          options: [
            "The color of the font",
            "The ease with which a reader can understand text",
            "The size of the paper",
            "The cost of printing"
          ],
          correctAnswer: "The ease with which a reader can understand text"
        },
        {
          questionText: "What font categories are mentioned in the video?",
          questionType: "multiple",
          options: [
            "Only serif and sans serif",
            "Serif, sans serif, script, monospaced, and decorative",
            "Only decorative fonts",
            "Only web-safe fonts"
          ],
          correctAnswer: "Serif, sans serif, script, monospaced, and decorative"
        },
        {
          questionText: "How is visual hierarchy achieved in typography?",
          questionType: "multiple",
          options: [
            "Only through color changes",
            "Through changes in size, weight, spacing, and style",
            "Only through font selection",
            "Only through alignment"
          ],
          correctAnswer: "Through changes in size, weight, spacing, and style"
        },
        // Questions 6-10: True/False
        {
          questionText: "Effective typography is a blend of aesthetics and function.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Legibility refers to the clarity of individual letterforms.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Poor typography cannot affect how a message is perceived.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Sans serif fonts feel cleaner and more modern.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Typography is purely cosmetic and not a communication tool.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for what typography influences how readers do:",
          questionType: "fillblank",
          correctAnswer: "Perceive",
          ...createBlanks("Perceive", 3)
        },
        {
          questionText: "Complete the word for a design family like Helvetica:",
          questionType: "fillblank",
          correctAnswer: "Typeface",
          ...createBlanks("Typeface", 4)
        },
        {
          questionText: "Complete the word for the clarity of individual letterforms:",
          questionType: "fillblank",
          correctAnswer: "Legibility",
          ...createBlanks("Legibility", 4)
        },
        {
          questionText: "Complete the word for the arrangement that helps readers know what to read first:",
          questionType: "fillblank",
          correctAnswer: "Hierarchy",
          ...createBlanks("Hierarchy", 4)
        },
        {
          questionText: "Complete the word for the font category that conveys elegance:",
          questionType: "fillblank",
          correctAnswer: "Script",
          ...createBlanks("Script", 3)
        }
      ],
      isActive: true
    };

    await Game.create(lesson11Quiz);
    console.log(`✅ Created quiz for: ${lesson11.title}`);
    console.log(`   Game Type: lesson11quiz`);
    console.log(`   Questions: ${lesson11Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 11 quiz:", error);
    process.exit(1);
  }
};

seedLesson11Quiz();