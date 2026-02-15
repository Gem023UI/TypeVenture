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

const seedLesson4Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 4 quiz
    await Game.deleteMany({ gameType: "lesson4quiz" });
    console.log("🗑️  Cleared existing Lesson 4 quiz");

    // Get Lesson 4
    const lesson4 = await Lesson.findOne({ title: /IV\. Typography Tips/ });
    
    if (!lesson4) {
      console.log("⚠️  Lesson 4 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson4Quiz = {
      title: "Quiz: Typography Tips – A Lesson on Contrast",
      description: "Test your knowledge of typographic contrast principles and how to use them effectively in design!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson4quiz",
      lessonId: lesson4._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "What is contrast in typography?",
          questionType: "multiple",
          options: [
            "A tool for making text colorful",
            "Using differences in typographic properties to guide attention and establish hierarchy",
            "The space between letters",
            "A type of font family"
          ],
          correctAnswer: "Using differences in typographic properties to guide attention and establish hierarchy"
        },
        {
          questionText: "Which mechanisms can be used to create typographic contrast?",
          questionType: "multiple",
          options: [
            "Size, weight, transforms, color, styles, and font types",
            "Only size and color",
            "Only font types",
            "Only weight and size"
          ],
          correctAnswer: "Size, weight, transforms, color, styles, and font types"
        },
        {
          questionText: "What effect does greater contrast have on design?",
          questionType: "multiple",
          options: [
            "It makes design less readable",
            "It creates bold, dynamic expressions that feel powerful or artistic",
            "It has no effect on emotion",
            "It only affects color"
          ],
          correctAnswer: "It creates bold, dynamic expressions that feel powerful or artistic"
        },
        {
          questionText: "How does font weight contrast affect text?",
          questionType: "multiple",
          options: [
            "It only changes the color",
            "Bold weights draw the eye and create emphasis, while lighter weights appear subtle",
            "It has no impact on hierarchy",
            "It only affects letter spacing"
          ],
          correctAnswer: "Bold weights draw the eye and create emphasis, while lighter weights appear subtle"
        },
        {
          questionText: "When should designers consider device contexts for size contrast?",
          questionType: "multiple",
          options: [
            "Never, size should always be the same",
            "Before determining how much size contrast is appropriate",
            "Only for mobile devices",
            "Only for desktop layouts"
          ],
          correctAnswer: "Before determining how much size contrast is appropriate"
        },
        // Questions 6-10: True/False
        {
          questionText: "Contrast is merely a technical element and does not influence emotion or aesthetic character.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "You can achieve significant contrast using a single font family by simply scaling text appropriately.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Text transforms like uppercase or lowercase have no effect on contrast and hierarchy.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "High tonal contrast between text and background is essential for accessibility and readability.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Mixing serif and sans serif fonts can balance distinct visual personalities while maintaining cohesion.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for the principle that shapes how typography communicates meaning:",
          questionType: "fillblank",
          correctAnswer: "Contrast",
          ...createBlanks("Contrast", 3)
        },
        {
          questionText: "Complete the word for what designers construct using size variations:",
          questionType: "fillblank",
          correctAnswer: "Hierarchy",
          ...createBlanks("Hierarchy", 4)
        },
        {
          questionText: "Complete the word for the thickness or thinness of letterforms:",
          questionType: "fillblank",
          correctAnswer: "Weight",
          ...createBlanks("Weight", 3)
        },
        {
          questionText: "Complete the word for the visual quality that large display typography can become:",
          questionType: "fillblank",
          correctAnswer: "Centerpiece",
          ...createBlanks("Centerpiece", 4)
        },
        {
          questionText: "Complete the word for the type of fonts that often convey tradition and readability:",
          questionType: "fillblank",
          correctAnswer: "Serif",
          ...createBlanks("Serif", 2)
        }
      ],
      isActive: true
    };

    await Game.create(lesson4Quiz);
    console.log(`✅ Created quiz for: ${lesson4.title}`);
    console.log(`   Game Type: lesson4quiz`);
    console.log(`   Questions: ${lesson4Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 4 quiz:", error);
    process.exit(1);
  }
};

seedLesson4Quiz();