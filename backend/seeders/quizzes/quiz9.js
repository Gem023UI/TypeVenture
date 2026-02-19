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

const seedLesson9Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 9 quiz
    await Game.deleteMany({ gameType: "lesson9quiz" });
    console.log("🗑️  Cleared existing Lesson 9 quiz");

    // Get Lesson 9
    const lesson9 = await Lesson.findOne({ title: /IX\. The Elements of Typographic Style/ });
    
    if (!lesson9) {
      console.log("⚠️  Lesson 9 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson9Quiz = {
      title: "Quiz: The Elements of Typographic Style",
      description: "Test your knowledge of Bringhurst's landmark typography book covering craft, harmony, and design principles!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771503684/066d4a8f-a87c-4abe-90b8-427edf266754.png",
      difficulty: "easy",
      gameType: "lesson9quiz",
      lessonId: lesson9._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "Who wrote The Elements of Typographic Style?",
          questionType: "multiple",
          options: [
            "Johannes Gutenberg",
            "Robert Bringhurst",
            "Eric Gill",
            "Paul Rand"
          ],
          correctAnswer: "Robert Bringhurst"
        },
        {
          questionText: "When was The Elements of Typographic Style first published?",
          questionType: "multiple",
          options: [
            "1972",
            "1982",
            "1992",
            "2002"
          ],
          correctAnswer: "1992"
        },
        {
          questionText: "What writing style guide does the book's title deliberately reference?",
          questionType: "multiple",
          options: [
            "The Chicago Manual of Style",
            "The Elements of Style by Strunk & White",
            "AP Stylebook",
            "MLA Handbook"
          ],
          correctAnswer: "The Elements of Style by Strunk & White"
        },
        {
          questionText: "What is typographic harmony according to Bringhurst?",
          questionType: "multiple",
          options: [
            "Using as many fonts as possible",
            "Letterforms and text blocks fitting together naturally and pleasurably",
            "Only using serif fonts",
            "Ignoring visual balance"
          ],
          correctAnswer: "Letterforms and text blocks fitting together naturally and pleasurably"
        },
        {
          questionText: "How should typography relate to content according to the book?",
          questionType: "multiple",
          options: [
            "Typography should dominate the content",
            "Typography should reflect the nature and tone of the text",
            "Typography should be purely decorative",
            "Typography should ignore the text's meaning"
          ],
          correctAnswer: "Typography should reflect the nature and tone of the text"
        },
        // Questions 6-10: True/False
        {
          questionText: "The book is often called the 'typographer's bible' for its depth and influence.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Typography according to Bringhurst is a set of arbitrary rules.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "The book explores both technical practice and cultural and historical insights.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Later editions include material on digital typography.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "The book is only useful for print designers and has no relevance to digital typography.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the last name of the author of The Elements of Typographic Style:",
          questionType: "fillblank",
          correctAnswer: "Bringhurst",
          ...createBlanks("Bringhurst", 4)
        },
        {
          questionText: "Complete the word for the design principle involving proportion and balance:",
          questionType: "fillblank",
          correctAnswer: "Harmony",
          ...createBlanks("Harmony", 3)
        },
        {
          questionText: "Complete the word for the vertical spacing between lines of text:",
          questionType: "fillblank",
          correctAnswer: "Leading",
          ...createBlanks("Leading", 3)
        },
        {
          questionText: "Complete the word for what typography becomes when choices reflect intention:",
          questionType: "fillblank",
          correctAnswer: "Interpretive",
          ...createBlanks("Interpretive", 5)
        },
        {
          questionText: "Complete the word describing the book's approach to typography:",
          questionType: "fillblank",
          correctAnswer: "Holistic",
          ...createBlanks("Holistic", 4)
        }
      ],
      isActive: true
    };

    await Game.create(lesson9Quiz);
    console.log(`✅ Created quiz for: ${lesson9.title}`);
    console.log(`   Game Type: lesson9quiz`);
    console.log(`   Questions: ${lesson9Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 9 quiz:", error);
    process.exit(1);
  }
};

seedLesson9Quiz();