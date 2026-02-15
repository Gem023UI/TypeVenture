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

const seedLesson7Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 7 quiz
    await Game.deleteMany({ gameType: "lesson7quiz" });
    console.log("🗑️  Cleared existing Lesson 7 quiz");

    // Get Lesson 7
    const lesson7 = await Lesson.findOne({ title: /VII\. Lessons in Typography/ });
    
    if (!lesson7) {
      console.log("⚠️  Lesson 7 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson7Quiz = {
      title: "Quiz: Lessons in Typography – Must-Know Typographic Principles",
      description: "Test your knowledge of typographic terminology, lettering art, and practical layout design principles!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson7quiz",
      lessonId: lesson7._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "What parts of letterforms are covered in typographic anatomy?",
          questionType: "multiple",
          options: [
            "Only font colors",
            "Stems, serifs, x-height, ascenders, descenders, and counters",
            "Only font sizes",
            "Only letter spacing"
          ],
          correctAnswer: "Stems, serifs, x-height, ascenders, descenders, and counters"
        },
        {
          questionText: "What font classifications are discussed in the fundamentals section?",
          questionType: "multiple",
          options: [
            "Only serif and sans serif",
            "Serif, sans serif, script, blackletter, monospace, display, and ornamental",
            "Only decorative fonts",
            "Only web-safe fonts"
          ],
          correctAnswer: "Serif, sans serif, script, blackletter, monospace, display, and ornamental"
        },
        {
          questionText: "What does the book emphasize about typographic optics?",
          questionType: "multiple",
          options: [
            "Only mechanical measurements matter",
            "How human perception affects visual balance in type",
            "Only font file sizes",
            "Only printing quality"
          ],
          correctAnswer: "How human perception affects visual balance in type"
        },
        {
          questionText: "What aspects significantly impact legibility when working with words?",
          questionType: "multiple",
          options: [
            "Only font color",
            "Spacing, case choice, and stylistic treatments",
            "Only font brand",
            "Only file format"
          ],
          correctAnswer: "Spacing, case choice, and stylistic treatments"
        },
        {
          questionText: "What does the multi-word design section help designers avoid?",
          questionType: "multiple",
          options: [
            "Using any fonts at all",
            "Common multi-font mistakes",
            "Creating any layouts",
            "Using typography in design"
          ],
          correctAnswer: "Common multi-font mistakes"
        },
        // Questions 6-10: True/False
        {
          questionText: "Typography operates both as a visual art and a communicative system.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Understanding type terms enables designers to make intentional choices rather than relying on intuition alone.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Typography is purely functional and not an expressive medium.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "The book includes 'Your Turn To' exercises to encourage hands-on practice.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Working with backgrounds and backdrops while maintaining readability is never a challenge in design.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for what designers learn to see beyond in typographic optics:",
          questionType: "fillblank",
          correctAnswer: "Measurements",
          ...createBlanks("Measurements", 4)
        },
        {
          questionText: "Complete the word for the adjustment of space between specific character pairs:",
          questionType: "fillblank",
          correctAnswer: "Kerning",
          ...createBlanks("Kerning", 3)
        },
        {
          questionText: "Complete the word for what letterform alterations can shift:",
          questionType: "fillblank",
          correctAnswer: "Mood",
          ...createBlanks("Mood", 2)
        },
        {
          questionText: "Complete the word for the structuring that aids reader navigation:",
          questionType: "fillblank",
          correctAnswer: "Hierarchical",
          ...createBlanks("Hierarchical", 5)
        },
        {
          questionText: "Complete the word for what typography choices must be based on:",
          questionType: "fillblank",
          correctAnswer: "Informed",
          ...createBlanks("Informed", 3)
        }
      ],
      isActive: true
    };

    await Game.create(lesson7Quiz);
    console.log(`✅ Created quiz for: ${lesson7.title}`);
    console.log(`   Game Type: lesson7quiz`);
    console.log(`   Questions: ${lesson7Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 7 quiz:", error);
    process.exit(1);
  }
};

seedLesson7Quiz();