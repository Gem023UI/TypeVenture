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

const seedLesson10Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 10 quiz
    await Game.deleteMany({ gameType: "lesson10quiz" });
    console.log("🗑️  Cleared existing Lesson 10 quiz");

    // Get Lesson 10
    const lesson10 = await Lesson.findOne({ title: /^X\. An Essay on Typography/ });
    
    if (!lesson10) {
      console.log("⚠️  Lesson 10 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson10Quiz = {
      title: "Quiz: An Essay on Typography",
      description: "Test your knowledge of Eric Gill's influential 1931 book on typography, craft, and philosophical outlook!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson10quiz",
      lessonId: lesson10._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "Who wrote An Essay on Typography?",
          questionType: "multiple",
          options: [
            "Robert Bringhurst",
            "Eric Gill",
            "Johannes Gutenberg",
            "Paul Rand"
          ],
          correctAnswer: "Eric Gill"
        },
        {
          questionText: "When was An Essay on Typography first published?",
          questionType: "multiple",
          options: [
            "1921",
            "1931",
            "1941",
            "1951"
          ],
          correctAnswer: "1931"
        },
        {
          questionText: "What typeface was the original edition of An Essay on Typography set in?",
          questionType: "multiple",
          options: [
            "Helvetica",
            "Times New Roman",
            "Joanna",
            "Garamond"
          ],
          correctAnswer: "Joanna"
        },
        {
          questionText: "What does Gill emphasize about typography according to the book?",
          questionType: "multiple",
          options: [
            "It should prioritize machine efficiency over craft",
            "It should be rooted in humanity and mindful engagement with craft",
            "It should avoid historical influences",
            "It should focus only on commercial success"
          ],
          correctAnswer: "It should be rooted in humanity and mindful engagement with craft"
        },
        {
          questionText: "What qualities should good typography integrate according to Gill?",
          questionType: "multiple",
          options: [
            "Only modern aesthetics",
            "Clarity, proportion, and harmony",
            "Maximum decoration",
            "Commercial appeal only"
          ],
          correctAnswer: "Clarity, proportion, and harmony"
        },
        // Questions 6-10: True/False
        {
          questionText: "Eric Gill was not only a type designer but also a sculptor, engraver, and writer.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Paul Rand described An Essay on Typography as 'timeless and absorbing.'",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Gill believed that mechanization never compromised the soul of typographic work.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Typography according to Gill carries a moral dimension.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Gill's Joanna typeface was designed for visual comfort and human readability.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the last name of the author of An Essay on Typography:",
          questionType: "fillblank",
          correctAnswer: "Gill",
          ...createBlanks("Gill", 2)
        },
        {
          questionText: "Complete the name of Gill's typeface used in the original edition:",
          questionType: "fillblank",
          correctAnswer: "Joanna",
          ...createBlanks("Joanna", 3)
        },
        {
          questionText: "Complete the word for the movement that influenced Gill's perspective:",
          questionType: "fillblank",
          correctAnswer: "Arts and Crafts",
          ...createBlanks("Arts and Crafts", 5)
        },
        {
          questionText: "Complete the word for what typography is more than according to Gill:",
          questionType: "fillblank",
          correctAnswer: "Arrangement",
          ...createBlanks("Arrangement", 4)
        },
        {
          questionText: "Complete the word for what letterforms should reflect:",
          questionType: "fillblank",
          correctAnswer: "Rhythm",
          ...createBlanks("Rhythm", 3)
        }
      ],
      isActive: true
    };

    await Game.create(lesson10Quiz);
    console.log(`✅ Created quiz for: ${lesson10.title}`);
    console.log(`   Game Type: lesson10quiz`);
    console.log(`   Questions: ${lesson10Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 10 quiz:", error);
    process.exit(1);
  }
};

seedLesson10Quiz();