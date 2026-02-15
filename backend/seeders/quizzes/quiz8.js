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

const seedLesson8Quiz = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing lesson 8 quiz
    await Game.deleteMany({ gameType: "lesson8quiz" });
    console.log("🗑️  Cleared existing Lesson 8 quiz");

    // Get Lesson 8
    const lesson8 = await Lesson.findOne({ title: /VIII\. The Importance and Use/ });
    
    if (!lesson8) {
      console.log("⚠️  Lesson 8 not found. Please seed lessons first.");
      process.exit(1);
    }

    const lesson8Quiz = {
      title: "Quiz: The Importance and Use of Typography in Print and Digital Design",
      description: "Test your knowledge of typography's evolution, print vs. digital applications, and readability principles!",
      gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
      difficulty: "easy",
      gameType: "lesson8quiz",
      lessonId: lesson8._id,
      quizQuestions: [
        // Questions 1-5: Multiple Choice
        {
          questionText: "When did typography initially emerge with movable letterpress printing?",
          questionType: "multiple",
          options: [
            "In the 1300s",
            "In the 1440s with Johannes Gutenberg",
            "In the 1600s",
            "In the 1800s"
          ],
          correctAnswer: "In the 1440s with Johannes Gutenberg"
        },
        {
          questionText: "Why are serif fonts preferred in printed design contexts?",
          questionType: "multiple",
          options: [
            "They look more modern",
            "They are easier to produce",
            "Their serifs guide the eye horizontally and reduce visual fatigue",
            "They use less ink"
          ],
          correctAnswer: "Their serifs guide the eye horizontally and reduce visual fatigue"
        },
        {
          questionText: "Why do sans-serif fonts dominate digital typography?",
          questionType: "multiple",
          options: [
            "They are older than serif fonts",
            "They display more clearly on screens with clean, scalable forms",
            "They are more expensive",
            "They only work on mobile devices"
          ],
          correctAnswer: "They display more clearly on screens with clean, scalable forms"
        },
        {
          questionText: "Which fonts are commonly used for digital platforms?",
          questionType: "multiple",
          options: [
            "Only Times New Roman",
            "Arial, Helvetica, Verdana, Open Sans, Lato, Montserrat, Roboto",
            "Only decorative fonts",
            "Only monospace fonts"
          ],
          correctAnswer: "Arial, Helvetica, Verdana, Open Sans, Lato, Montserrat, Roboto"
        },
        {
          questionText: "What must digital typography consider beyond print typography?",
          questionType: "multiple",
          options: [
            "Only font color",
            "Screen resolution, interaction design, navigation, and UI context",
            "Only font size",
            "Only printing costs"
          ],
          correctAnswer: "Screen resolution, interaction design, navigation, and UI context"
        },
        // Questions 6-10: True/False
        {
          questionText: "Typography is both an applied art and a technical practice.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "What works well in print always translates effectively to digital contexts.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "The Bauhaus school emphasized readability, function, and visual clarity in typography.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          questionText: "Typography is static and does not evolve with technology.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "False"
        },
        {
          questionText: "Serif fonts like Times New Roman and Garamond are commonly used in print body text.",
          questionType: "truefalse",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        // Questions 11-15: Fill in the Blank
        {
          questionText: "Complete the name of the inventor of movable letterpress printing:",
          questionType: "fillblank",
          correctAnswer: "Gutenberg",
          ...createBlanks("Gutenberg", 4)
        },
        {
          questionText: "Complete the word for the small strokes at the ends of letterforms:",
          questionType: "fillblank",
          correctAnswer: "Serifs",
          ...createBlanks("Serifs", 3)
        },
        {
          questionText: "Complete the word for how easily content can be comprehended with minimal effort:",
          questionType: "fillblank",
          correctAnswer: "Readability",
          ...createBlanks("Readability", 4)
        },
        {
          questionText: "Complete the word for the type of fonts that render crisply on screens:",
          questionType: "fillblank",
          correctAnswer: "Sans-serif",
          ...createBlanks("Sans-serif", 4)
        },
        {
          questionText: "Complete the word for what typography practices do with cultural and technological demands:",
          questionType: "fillblank",
          correctAnswer: "Evolve",
          ...createBlanks("Evolve", 3)
        }
      ],
      isActive: true
    };

    await Game.create(lesson8Quiz);
    console.log(`✅ Created quiz for: ${lesson8.title}`);
    console.log(`   Game Type: lesson8quiz`);
    console.log(`   Questions: ${lesson8Quiz.quizQuestions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Lesson 8 quiz:", error);
    process.exit(1);
  }
};

seedLesson8Quiz();