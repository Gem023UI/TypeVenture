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

const seedLesson3Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 3 quiz
    await Game.deleteMany({ gameType: "lesson3quiz" });
    console.log("🗑️  Cleared existing Lesson 3 quiz");

    // Get Lesson 3
    const lesson3 = await Lesson.findOne({ title: /III\. Material Design 3/ });
    
    if (!lesson3) {
      console.log("⚠️  Lesson 3 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson3Quiz = {
      title: "Quiz: Material Design 3 – Applying Type",
      description: "Test your knowledge of Material Design 3 typography system and how to apply type roles effectively!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771503684/066d4a8f-a87c-4abe-90b8-427edf266754.png",
      difficulty: "easy",
      gameType: "lesson3quiz",
      lessonId: lesson3._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "How many key typography roles does Material Design 3 organize text styles into?",
          questionType: "multiple",
          options: [
            "Three roles",
            "Four roles",
            "Five roles",
            "Six roles"
          ],
          correctAnswer: "Five roles"
        },
        {
          questionText: "Which typography role is designed for the most prominent and large-scale content?",
          questionType: "multiple",
          options: [
            "Headline",
            "Display",
            "Title",
            "Body"
          ],
          correctAnswer: "Display"
        },
        {
          questionText: "What is the primary purpose of headline styles in Material Design 3?",
          questionType: "multiple",
          options: [
            "To display the largest text on the page",
            "To guide users' attention hierarchically and help them scan content",
            "To label small interface elements",
            "To create readable paragraphs"
          ],
          correctAnswer: "To guide users' attention hierarchically and help them scan content"
        },
        {
          questionText: "Which typography role is meant for small interface elements like button text and captions?",
          questionType: "multiple",
          options: [
            "Title",
            "Body",
            "Label",
            "Display"
          ],
          correctAnswer: "Label"
        },
        {
          questionText: "What is the main emphasis for body text styles?",
          questionType: "multiple",
          options: [
            "Visual expressiveness",
            "Creating impact",
            "Legibility and comfort for extended reading",
            "Drawing immediate attention"
          ],
          correctAnswer: "Legibility and comfort for extended reading"
        },
        // Questions 6-10: True/False
        {
          questionText: "Display text is suitable for long passages of text.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Title styles create distinct but moderate emphasis to guide users through sections.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Material Design 3 encourages designers to choose type roles based on content function rather than just size.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Label styles are the largest text in the typography scale.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Consistent line height and weight across body text results in a cohesive reading experience.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for the text role used for high-impact statements:",
          questionType: "fillblank",
          correctAnswer: "Display",
          ...createBlanks("Display", 3)
        },
        {
          questionText: "Complete the word for the text role that introduces major sections:",
          questionType: "fillblank",
          correctAnswer: "Headline",
          ...createBlanks("Headline", 3)
        },
        {
          questionText: "Complete the word for the text role used for section headers:",
          questionType: "fillblank",
          correctAnswer: "Title",
          ...createBlanks("Title", 2)
        },
        {
          questionText: "Complete the word for the text role essential for readable paragraphs:",
          questionType: "fillblank",
          correctAnswer: "Body",
          ...createBlanks("Body", 2)
        },
        {
          questionText: "Complete the word for the text role used for button text and captions:",
          questionType: "fillblank",
          correctAnswer: "Label",
          ...createBlanks("Label", 2)
        }
      ],
      isActive: true
    };

    await Game.create(lesson3Quiz);
    console.log(`✅ Created quiz for: ${lesson3.title}`);
    console.log(`   Game Type: lesson3quiz`);
    console.log(`   Questions: ${lesson3Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 3 quiz:", error);
    process.exit(1);
  }
};

seedLesson3Quiz();