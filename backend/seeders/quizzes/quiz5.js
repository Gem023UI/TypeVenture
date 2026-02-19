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

const seedLesson5Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 5 quiz
    await Game.deleteMany({ gameType: "lesson5quiz" });
    console.log("🗑️  Cleared existing Lesson 5 quiz");

    // Get Lesson 5
    const lesson5 = await Lesson.findOne({ title: /V\. Typography Guidelines/ });
    
    if (!lesson5) {
      console.log("⚠️  Lesson 5 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson5Quiz = {
      title: "Quiz: Typography Guidelines and References",
      description: "Test your knowledge of typography as a craft, communication art, and essential design principles!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771503684/066d4a8f-a87c-4abe-90b8-427edf266754.png",
      difficulty: "easy",
      gameType: "lesson5quiz",
      lessonId: lesson5._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "How should typography be treated according to the 'Respect Thy Typography' principle?",
          questionType: "multiple",
          options: [
            "As a decorative effect or gimmick",
            "As an afterthought in design",
            "As a central element in design that communicates meaning",
            "As secondary to images"
          ],
          correctAnswer: "As a central element in design that communicates meaning"
        },
        {
          questionText: "What does 'The Perfect Paragraph' emphasize?",
          questionType: "multiple",
          options: [
            "Decorative typography only",
            "Readability and classical typesetting conventions adapted for screens",
            "Using as many fonts as possible",
            "Ignoring spacing and alignment"
          ],
          correctAnswer: "Readability and classical typesetting conventions adapted for screens"
        },
        {
          questionText: "What topics does the Smashing Magazine typography collection cover?",
          questionType: "multiple",
          options: [
            "Only web font embedding",
            "Only historical context",
            "Historical context, expressive usage, best practices, and web-specific techniques",
            "Only color theory"
          ],
          correctAnswer: "Historical context, expressive usage, best practices, and web-specific techniques"
        },
        {
          questionText: "Why are typographic details like en and em dashes important?",
          questionType: "multiple",
          options: [
            "They are not important at all",
            "They reflect understanding of typography's role in clarity and readability",
            "They only affect print design",
            "They are purely decorative"
          ],
          correctAnswer: "They reflect understanding of typography's role in clarity and readability"
        },
        {
          questionText: "What balance must expressive typography maintain?",
          questionType: "multiple",
          options: [
            "Between cost and quality",
            "Between artistry and functionality without sacrificing communication clarity",
            "Between size and color only",
            "Between traditional and modern fonts"
          ],
          correctAnswer: "Between artistry and functionality without sacrificing communication clarity"
        },
        // Questions 6-10: True/False
        {
          questionText: "Typography should be treated as a secondary element that simply relays text.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Small, informed typographic adjustments can have significant effects on how messages are perceived.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Typography is limited to Latin alphabets and has no global applications.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Typography is both a craft and a form of communication art.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "The visual appearance of type has no effect on how content is interpreted.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the word for what typography balances between visual and informational aspects:",
          questionType: "fillblank",
          correctAnswer: "Functional",
          ...createBlanks("Functional", 4)
        },
        {
          questionText: "Complete the word for the type of typography that involves web font techniques:",
          questionType: "fillblank",
          correctAnswer: "Responsive",
          ...createBlanks("Responsive", 4)
        },
        {
          questionText: "Complete the word for what typography deserves according to best practices:",
          questionType: "fillblank",
          correctAnswer: "Respect",
          ...createBlanks("Respect", 3)
        },
        {
          questionText: "Complete the word for the aspect of typography involving clarity and linguistic precision:",
          questionType: "fillblank",
          correctAnswer: "Etiquette",
          ...createBlanks("Etiquette", 4)
        },
        {
          questionText: "Complete the word for the quality that makes typography not purely decorative:",
          questionType: "fillblank",
          correctAnswer: "Expressive",
          ...createBlanks("Expressive", 4)
        }
      ],
      isActive: true
    };

    await Game.create(lesson5Quiz);
    console.log(`✅ Created quiz for: ${lesson5.title}`);
    console.log(`   Game Type: lesson5quiz`);
    console.log(`   Questions: ${lesson5Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 5 quiz:", error);
    process.exit(1);
  }
};

seedLesson5Quiz();