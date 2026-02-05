import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

const kerningGames = [
  {
    title: "Kerning Master: Easy",
    description: "Learn the basics of kerning with simple words. Perfect for beginners!",
    difficulty: "easy",
    gameType: "kerning",
    words: [
      { 
        word: "WAVE", 
        idealKerning: [0, -20, -15] // Spacing between W-A, A-V, V-E
      },
      { 
        word: "TYPE", 
        idealKerning: [0, -10, 0] 
      },
      { 
        word: "LOVE", 
        idealKerning: [0, -15, -10] 
      },
      { 
        word: "AWAY", 
        idealKerning: [-20, -15, 0] 
      },
      { 
        word: "PLAY", 
        idealKerning: [0, -5, 0] 
      }
    ],
    isActive: true
  },
  {
    title: "Kerning Master: Medium",
    description: "Challenge yourself with more complex letter combinations!",
    difficulty: "medium",
    gameType: "kerning",
    words: [
      { 
        word: "TYPOGRAPHY", 
        idealKerning: [0, -10, 0, 0, 0, -5, -10, 0, 0] 
      },
      { 
        word: "VISUAL", 
        idealKerning: [-15, 0, 0, -5, 0] 
      },
      { 
        word: "ADVENTURE", 
        idealKerning: [-20, 0, -10, 0, 0, 0, 0, 0] 
      },
      { 
        word: "CREATIVE", 
        idealKerning: [0, 0, -5, -10, 0, 0, 0] 
      },
      { 
        word: "DESIGN", 
        idealKerning: [0, 0, 0, 0, 0] 
      }
    ],
    isActive: true
  },
  {
    title: "Kerning Master: Hard",
    description: "Master-level kerning challenges. Only for typography experts!",
    difficulty: "hard",
    gameType: "kerning",
    words: [
      { 
        word: "ACKNOWLEDGE", 
        idealKerning: [0, 0, 0, 0, -15, -10, 0, 0, 0, 0] 
      },
      { 
        word: "POWERFUL", 
        idealKerning: [0, -10, -15, 0, 0, 0, 0] 
      },
      { 
        word: "YOUTHFUL", 
        idealKerning: [0, -15, 0, 0, 0, 0, 0] 
      },
      { 
        word: "WAVELENGTH", 
        idealKerning: [-20, -15, -10, 0, 0, 0, 0, 0, 0] 
      },
      { 
        word: "TYPOGRAPHY", 
        idealKerning: [0, -10, 0, 0, 0, -5, -10, 0, 0] 
      }
    ],
    isActive: true
  }
];

const seedGames = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/typeventure");
    console.log("✅ Connected to MongoDB");

    // Clear existing games (optional - remove if you want to keep existing data)
    await Game.deleteMany({ gameType: "kerning" });
    console.log("🗑️  Cleared existing kerning games");

    // Insert new games
    const insertedGames = await Game.insertMany(kerningGames);
    console.log(`✅ Successfully seeded ${insertedGames.length} kerning games:`);
    insertedGames.forEach(game => {
      console.log(`   - ${game.title} (${game.difficulty})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding games:", error);
    process.exit(1);
  }
};

// Run the seeder
seedGames();