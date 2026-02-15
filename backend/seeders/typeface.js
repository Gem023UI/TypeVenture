import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

// Temporary Cloudinary image for all fonts
const TEMP_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png";

// Helper function to create blanks in font names
const createBlanks = (fontName, numberOfBlanks) => {
  const letters = fontName.split('');
  const letterIndices = [];
  
  // Get indices of all letters (not spaces or special characters)
  letters.forEach((char, index) => {
    if (/[a-zA-Z]/.test(char)) {
      letterIndices.push(index);
    }
  });
  
  // Randomly select positions to blank out
  const blankedPositions = [];
  const shuffled = [...letterIndices].sort(() => 0.5 - Math.random());
  const blanksToCreate = Math.min(numberOfBlanks, shuffled.length);
  
  for (let i = 0; i < blanksToCreate; i++) {
    blankedPositions.push(shuffled[i]);
  }
  
  // Create the display string with blanks
  const displayArray = letters.map((char, index) => {
    if (blankedPositions.includes(index)) {
      return '_';
    }
    return char;
  });
  
  // Get the missing letters in order
  const missingLetters = blankedPositions
    .sort((a, b) => a - b)
    .map(pos => letters[pos].toUpperCase());
  
  return {
    displayText: displayArray.join(''),
    missingLetters: missingLetters,
    blankedPositions: blankedPositions.sort((a, b) => a - b)
  };
};

const typefaceGames = [
  {
    title: "Guess the Typeface: Easy",
    description: "Test your knowledge of popular and widely-used fonts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "easy",
    gameType: "typeface",
    questions: [
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Poppins",
        ...createBlanks("Poppins", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Helvetica",
        ...createBlanks("Helvetica", 3)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Times New Roman",
        ...createBlanks("Times New Roman", 4)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Arial",
        ...createBlanks("Arial", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Georgia",
        ...createBlanks("Georgia", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Roboto",
        ...createBlanks("Roboto", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Comic Sans MS",
        ...createBlanks("Comic Sans MS", 3)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Courier New",
        ...createBlanks("Courier New", 3)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Verdana",
        ...createBlanks("Verdana", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Montserrat",
        ...createBlanks("Montserrat", 3)
      }
    ],
    isActive: true
  },
  {
    title: "Guess the Typeface: Medium",
    description: "Challenge yourself with less common but recognizable fonts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "medium",
    gameType: "typeface",
    questions: [
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Futura",
        ...createBlanks("Futura", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Gotham",
        ...createBlanks("Gotham", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Bodoni",
        ...createBlanks("Bodoni", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Caslon",
        ...createBlanks("Caslon", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Frutiger",
        ...createBlanks("Frutiger", 3)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Rockwell",
        ...createBlanks("Rockwell", 3)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Gill Sans",
        ...createBlanks("Gill Sans", 3)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Proxima Nova",
        ...createBlanks("Proxima Nova", 4)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Mrs Eaves",
        ...createBlanks("Mrs Eaves", 3)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "DIN",
        ...createBlanks("DIN", 1)
      }
    ],
    isActive: true
  },
  {
    title: "Guess the Typeface: Hard",
    description: "Master-level font identification for typography experts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "hard",
    gameType: "typeface",
    questions: [
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Sabon",
        ...createBlanks("Sabon", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Interstate",
        ...createBlanks("Interstate", 4)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Akzidenz Grotesk",
        ...createBlanks("Akzidenz Grotesk", 5)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Hoefler Text",
        ...createBlanks("Hoefler Text", 4)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "FF Meta",
        ...createBlanks("FF Meta", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Optima",
        ...createBlanks("Optima", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Thesis",
        ...createBlanks("Thesis", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Neutraface",
        ...createBlanks("Neutraface", 4)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Archer",
        ...createBlanks("Archer", 2)
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Filosofia",
        ...createBlanks("Filosofia", 3)
      }
    ],
    isActive: true
  }
];

const seedTypefaceGames = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing typeface games (optional)
    await Game.deleteMany({ gameType: "typeface" });
    console.log("🗑️  Cleared existing typeface games");

    // Insert new games
    const insertedGames = await Game.insertMany(typefaceGames);
    console.log(`✅ Successfully seeded ${insertedGames.length} typeface games:`);
    insertedGames.forEach(game => {
      console.log(`   - ${game.title} (${game.difficulty}) - ${game.questions.length} questions`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding typeface games:", error);
    process.exit(1);
  }
};

// Run the seeder
seedTypefaceGames();