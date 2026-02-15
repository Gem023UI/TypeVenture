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

const seedLesson6Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 6 quiz
    await Game.deleteMany({ gameType: "lesson6quiz" });
    console.log("🗑️  Cleared existing Lesson 6 quiz");

    // Get Lesson 6
    const lesson6 = await Lesson.findOne({ title: /VI\. Graphic Design Basics/ });
    
    if (!lesson6) {
      console.log("⚠️  Lesson 6 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson6Quiz = {
      title: "Quiz: Graphic Design Basics – Typography Lesson Plan",
      description: "Test your knowledge of typography fundamentals, lesson structure, and practical applications in design projects!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson6quiz",
      lessonId: lesson6._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "What is the primary focus of the typography lesson plan's learning objectives?",
          questionType: "multiple",
          options: [
            "Memorizing typography definitions only",
            "Understanding and applying foundational concepts in design projects",
            "Learning only about font history",
            "Creating decorative art without purpose"
          ],
          correctAnswer: "Understanding and applying foundational concepts in design projects"
        },
        {
          questionText: "What technical skills do students learn with typography tools?",
          questionType: "multiple",
          options: [
            "Only identifying typefaces",
            "Only memorizing font names",
            "Manipulating text frames, threading text, and flowing text around elements",
            "Only changing font colors"
          ],
          correctAnswer: "Manipulating text frames, threading text, and flowing text around elements"
        },
        {
          questionText: "What is the purpose of the Decorative Typography Activity?",
          questionType: "multiple",
          options: [
            "To memorize typeface names",
            "To explore creative applications where letterforms visually interpret words",
            "To practice only spacing",
            "To copy existing designs"
          ],
          correctAnswer: "To explore creative applications where letterforms visually interpret words"
        },
        {
          questionText: "What does the Typographic Logo Activity challenge students to do?",
          questionType: "multiple",
          options: [
            "Copy existing logos",
            "Choose typefaces and design logos that embody brand personality",
            "Use as many fonts as possible",
            "Ignore brand meaning"
          ],
          correctAnswer: "Choose typefaces and design logos that embody brand personality"
        },
        {
          questionText: "What does the Magazine Spread Project require students to synthesize?",
          questionType: "multiple",
          options: [
            "Only images without text",
            "Images, multiple typefaces, and alignment choices into a cohesive layout",
            "Only decorative elements",
            "Only color theory"
          ],
          correctAnswer: "Images, multiple typefaces, and alignment choices into a cohesive layout"
        },
        // Questions 6-10: True/False
        {
          questionText: "Typography should be viewed as visual communication, not just text.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Assessment in the lesson plan only occurs at the final project stage.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "The lesson plan includes career exploration opportunities in graphic design fields.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Students only learn typography vocabulary without practical application.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "The multi-class structure helps students build knowledge progressively.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for the activity where students design letterforms that visually interpret words:",
          questionType: "fillblank",
          correctAnswer: "Decorative",
          ...createBlanks("Decorative", 4)
        },
        {
          questionText: "Complete the word for the type of project that combines images and typefaces:",
          questionType: "fillblank",
          correctAnswer: "Magazine",
          ...createBlanks("Magazine", 3)
        },
        {
          questionText: "Complete the word for what typography decisions must support in logos:",
          questionType: "fillblank",
          correctAnswer: "Brand",
          ...createBlanks("Brand", 2)
        },
        {
          questionText: "Complete the word for the teaching method that combines theory and practice:",
          questionType: "fillblank",
          correctAnswer: "Activities",
          ...createBlanks("Activities", 4)
        },
        {
          questionText: "Complete the word for professional roles students explore through connections:",
          questionType: "fillblank",
          correctAnswer: "Career",
          ...createBlanks("Career", 3)
        }
      ],
      isActive: true
    };

    await Game.create(lesson6Quiz);
    console.log(`✅ Created quiz for: ${lesson6.title}`);
    console.log(`   Game Type: lesson6quiz`);
    console.log(`   Questions: ${lesson6Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 6 quiz:", error);
    process.exit(1);
  }
};

seedLesson6Quiz();