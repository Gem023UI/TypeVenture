import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

// Temporary Cloudinary image for all fonts
const TEMP_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png";

const typefaceGames = [
  {
    title: "Guess the Typeface: Easy",
    description: "Test your knowledge of popular and widely-used fonts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png",
    difficulty: "easy",
    gameType: "typeface",
    questions: [
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Poppins",
        options: ["Poppins", "Roboto", "Open Sans", "Lato"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Helvetica",
        options: ["Helvetica", "Arial", "Verdana", "Calibri"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Times New Roman",
        options: ["Times New Roman", "Georgia", "Garamond", "Baskerville"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Arial",
        options: ["Arial", "Helvetica", "Verdana", "Tahoma"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Georgia",
        options: ["Georgia", "Times New Roman", "Palatino", "Cambria"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Roboto",
        options: ["Roboto", "Open Sans", "Lato", "Montserrat"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Comic Sans MS",
        options: ["Comic Sans MS", "Marker Felt", "Chalkboard", "Bradley Hand"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Courier New",
        options: ["Courier New", "Monaco", "Consolas", "Menlo"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Verdana",
        options: ["Verdana", "Arial", "Tahoma", "Trebuchet MS"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Montserrat",
        options: ["Montserrat", "Raleway", "Nunito", "Quicksand"]
      }
    ],
    isActive: true
  },
  {
    title: "Guess the Typeface: Medium",
    description: "Challenge yourself with less common but recognizable fonts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png",
    difficulty: "medium",
    gameType: "typeface",
    questions: [
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Futura",
        options: ["Futura", "Avant Garde", "Century Gothic", "Gill Sans"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Gotham",
        options: ["Gotham", "Proxima Nova", "Brandon Grotesque", "Avenir"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Bodoni",
        options: ["Bodoni", "Didot", "Walbaum", "Moderno"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Caslon",
        options: ["Caslon", "Baskerville", "Bembo", "Plantin"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Frutiger",
        options: ["Frutiger", "Myriad", "Segoe", "Univers"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Rockwell",
        options: ["Rockwell", "Clarendon", "Courier", "Memphis"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Gill Sans",
        options: ["Gill Sans", "Optima", "Syntax", "Frutiger"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Proxima Nova",
        options: ["Proxima Nova", "Gotham", "Avenir", "Brandon Grotesque"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Mrs Eaves",
        options: ["Mrs Eaves", "Baskerville", "Caslon", "Bembo"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "DIN",
        options: ["DIN", "Akzidenz-Grotesk", "Franklin Gothic", "Trade Gothic"]
      }
    ],
    isActive: true
  },
  {
    title: "Guess the Typeface: Hard",
    description: "Master-level font identification for typography experts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png",
    difficulty: "hard",
    gameType: "typeface",
    questions: [
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Sabon",
        options: ["Sabon", "Garamond", "Caslon", "Janson"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Interstate",
        options: ["Interstate", "Highway Gothic", "DIN", "Clearview"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Akzidenz-Grotesk",
        options: ["Akzidenz-Grotesk", "Helvetica", "Univers", "Franklin Gothic"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Hoefler Text",
        options: ["Hoefler Text", "Mrs Eaves", "Sabon", "Minion"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "FF Meta",
        options: ["FF Meta", "FF Din", "Thesis", "Scala Sans"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Optima",
        options: ["Optima", "Syntax", "Pascal", "Meridien"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Thesis",
        options: ["Thesis", "FF Meta", "Scala", "Quadraat"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Neutraface",
        options: ["Neutraface", "Avenir", "Futura", "Avant Garde"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Archer",
        options: ["Archer", "Rockwell", "Clarendon", "Egyptienne"]
      },
      {
        imageUrl: TEMP_IMAGE,
        correctAnswer: "Filosofia",
        options: ["Filosofia", "Didot", "Bodoni", "Walbaum"]
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