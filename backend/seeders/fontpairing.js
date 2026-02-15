import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

// Temporary Cloudinary image for all font pairs
const TEMP_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png";

const fontPairingGames = [
  {
    title: "Font Pairing Master: Easy",
    description: "Learn classic font combinations that always work together!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "easy",
    gameType: "fontpairing",
    questions: [
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Helvetica",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Georgia",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Georgia" },
          { pairImage: TEMP_IMAGE, pairName: "Comic Sans" },
          { pairImage: TEMP_IMAGE, pairName: "Papyrus" },
          { pairImage: TEMP_IMAGE, pairName: "Impact" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Playfair Display",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Open Sans",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Open Sans" },
          { pairImage: TEMP_IMAGE, pairName: "Times New Roman" },
          { pairImage: TEMP_IMAGE, pairName: "Courier" },
          { pairImage: TEMP_IMAGE, pairName: "Verdana" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Montserrat",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Merriweather",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Merriweather" },
          { pairImage: TEMP_IMAGE, pairName: "Arial" },
          { pairImage: TEMP_IMAGE, pairName: "Tahoma" },
          { pairImage: TEMP_IMAGE, pairName: "Calibri" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Roboto",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Roboto Slab",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Roboto Slab" },
          { pairImage: TEMP_IMAGE, pairName: "Helvetica" },
          { pairImage: TEMP_IMAGE, pairName: "Century Gothic" },
          { pairImage: TEMP_IMAGE, pairName: "Futura" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Oswald",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Lato",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Lato" },
          { pairImage: TEMP_IMAGE, pairName: "Georgia" },
          { pairImage: TEMP_IMAGE, pairName: "Rockwell" },
          { pairImage: TEMP_IMAGE, pairName: "Garamond" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Raleway",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Lora",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Lora" },
          { pairImage: TEMP_IMAGE, pairName: "Arial" },
          { pairImage: TEMP_IMAGE, pairName: "Trebuchet MS" },
          { pairImage: TEMP_IMAGE, pairName: "Verdana" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Poppins",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Source Serif Pro",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Source Serif Pro" },
          { pairImage: TEMP_IMAGE, pairName: "Courier New" },
          { pairImage: TEMP_IMAGE, pairName: "Impact" },
          { pairImage: TEMP_IMAGE, pairName: "Comic Sans" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Bebas Neue",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Open Sans",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Open Sans" },
          { pairImage: TEMP_IMAGE, pairName: "Times" },
          { pairImage: TEMP_IMAGE, pairName: "Georgia" },
          { pairImage: TEMP_IMAGE, pairName: "Palatino" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Futura",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Baskerville",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Baskerville" },
          { pairImage: TEMP_IMAGE, pairName: "Arial" },
          { pairImage: TEMP_IMAGE, pairName: "Helvetica" },
          { pairImage: TEMP_IMAGE, pairName: "Verdana" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "PT Sans",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "PT Serif",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "PT Serif" },
          { pairImage: TEMP_IMAGE, pairName: "Tahoma" },
          { pairImage: TEMP_IMAGE, pairName: "Trebuchet" },
          { pairImage: TEMP_IMAGE, pairName: "Century Gothic" }
        ]
      }
    ],
    isActive: true
  },
  {
    title: "Font Pairing Master: Medium",
    description: "Discover sophisticated font combinations for modern design!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "medium",
    gameType: "fontpairing",
    questions: [
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Didot",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Avenir",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Avenir" },
          { pairImage: TEMP_IMAGE, pairName: "Arial" },
          { pairImage: TEMP_IMAGE, pairName: "Helvetica" },
          { pairImage: TEMP_IMAGE, pairName: "Verdana" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Proxima Nova",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Minion Pro",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Minion Pro" },
          { pairImage: TEMP_IMAGE, pairName: "Times" },
          { pairImage: TEMP_IMAGE, pairName: "Georgia" },
          { pairImage: TEMP_IMAGE, pairName: "Cambria" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Gotham",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Hoefler Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Hoefler Text" },
          { pairImage: TEMP_IMAGE, pairName: "Garamond" },
          { pairImage: TEMP_IMAGE, pairName: "Baskerville" },
          { pairImage: TEMP_IMAGE, pairName: "Palatino" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Brandon Grotesque",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Freight Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Freight Text" },
          { pairImage: TEMP_IMAGE, pairName: "Times New Roman" },
          { pairImage: TEMP_IMAGE, pairName: "Courier" },
          { pairImage: TEMP_IMAGE, pairName: "Georgia" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Neutraface",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Caslon",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Caslon" },
          { pairImage: TEMP_IMAGE, pairName: "Arial" },
          { pairImage: TEMP_IMAGE, pairName: "Helvetica" },
          { pairImage: TEMP_IMAGE, pairName: "Tahoma" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Museo Sans",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Museo Slab",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Museo Slab" },
          { pairImage: TEMP_IMAGE, pairName: "Rockwell" },
          { pairImage: TEMP_IMAGE, pairName: "Courier" },
          { pairImage: TEMP_IMAGE, pairName: "Clarendon" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Gill Sans",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Joanna",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Joanna" },
          { pairImage: TEMP_IMAGE, pairName: "Times" },
          { pairImage: TEMP_IMAGE, pairName: "Georgia" },
          { pairImage: TEMP_IMAGE, pairName: "Palatino" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Aktiv Grotesk",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Lyon Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Lyon Text" },
          { pairImage: TEMP_IMAGE, pairName: "Garamond" },
          { pairImage: TEMP_IMAGE, pairName: "Baskerville" },
          { pairImage: TEMP_IMAGE, pairName: "Bembo" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Circular",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Tiempos Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Tiempos Text" },
          { pairImage: TEMP_IMAGE, pairName: "Times" },
          { pairImage: TEMP_IMAGE, pairName: "Cambria" },
          { pairImage: TEMP_IMAGE, pairName: "Georgia" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "DIN",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Miller",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Miller" },
          { pairImage: TEMP_IMAGE, pairName: "Garamond" },
          { pairImage: TEMP_IMAGE, pairName: "Caslon" },
          { pairImage: TEMP_IMAGE, pairName: "Baskerville" }
        ]
      }
    ],
    isActive: true
  },
  {
    title: "Font Pairing Master: Hard",
    description: "Master expert-level font pairing for editorial and brand design!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "hard",
    gameType: "fontpairing",
    questions: [
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Maison Neue",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Chronicle Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Chronicle Text" },
          { pairImage: TEMP_IMAGE, pairName: "Minion Pro" },
          { pairImage: TEMP_IMAGE, pairName: "Garamond Premier" },
          { pairImage: TEMP_IMAGE, pairName: "Adobe Caslon" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Freight Sans",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Freight Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Freight Text" },
          { pairImage: TEMP_IMAGE, pairName: "Lyon Text" },
          { pairImage: TEMP_IMAGE, pairName: "Miller Text" },
          { pairImage: TEMP_IMAGE, pairName: "Tiempos Text" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Canela",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Basis Grotesque",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Basis Grotesque" },
          { pairImage: TEMP_IMAGE, pairName: "Akzidenz Grotesk" },
          { pairImage: TEMP_IMAGE, pairName: "Aktiv Grotesk" },
          { pairImage: TEMP_IMAGE, pairName: "Suisse Int'l" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Graphik",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Lyon Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Lyon Text" },
          { pairImage: TEMP_IMAGE, pairName: "Harriet Text" },
          { pairImage: TEMP_IMAGE, pairName: "Chronicle Text" },
          { pairImage: TEMP_IMAGE, pairName: "Miller Text" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "GT America",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "GT Super",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "GT Super" },
          { pairImage: TEMP_IMAGE, pairName: "Publico Text" },
          { pairImage: TEMP_IMAGE, pairName: "Tiempos Text" },
          { pairImage: TEMP_IMAGE, pairName: "Lyon Text" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Atlas Grotesk",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Kepler",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Kepler" },
          { pairImage: TEMP_IMAGE, pairName: "Warnock" },
          { pairImage: TEMP_IMAGE, pairName: "Arno" },
          { pairImage: TEMP_IMAGE, pairName: "Jenson" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Styrene",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Tiempos Text",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Tiempos Text" },
          { pairImage: TEMP_IMAGE, pairName: "Lyon Text" },
          { pairImage: TEMP_IMAGE, pairName: "Miller Text" },
          { pairImage: TEMP_IMAGE, pairName: "Chronicle Text" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Neue Haas Unica",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Lyon Display",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Lyon Display" },
          { pairImage: TEMP_IMAGE, pairName: "Surveyor Display" },
          { pairImage: TEMP_IMAGE, pairName: "Publico Headline" },
          { pairImage: TEMP_IMAGE, pairName: "Miller Display" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "ABC Diatype",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "ABC Monument",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "ABC Monument" },
          { pairImage: TEMP_IMAGE, pairName: "Druk" },
          { pairImage: TEMP_IMAGE, pairName: "GT Sectra" },
          { pairImage: TEMP_IMAGE, pairName: "Saol Display" }
        ]
      },
      {
        givenFontImage: TEMP_IMAGE,
        givenFontName: "Suisse Int'l",
        correctPairImage: TEMP_IMAGE,
        correctPairName: "Suisse Works",
        options: [
          { pairImage: TEMP_IMAGE, pairName: "Suisse Works" },
          { pairImage: TEMP_IMAGE, pairName: "Pitch" },
          { pairImage: TEMP_IMAGE, pairName: "Lyon Text" },
          { pairImage: TEMP_IMAGE, pairName: "Tiempos Headline" }
        ]
      }
    ],
    isActive: true
  }
];

const seedFontPairingGames = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing font pairing games (optional)
    await Game.deleteMany({ gameType: "fontpairing" });
    console.log("🗑️  Cleared existing font pairing games");

    // Insert new games
    const insertedGames = await Game.insertMany(fontPairingGames);
    console.log(`✅ Successfully seeded ${insertedGames.length} font pairing games:`);
    insertedGames.forEach(game => {
      console.log(`   - ${game.title} (${game.difficulty}) - ${game.questions.length} questions`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding font pairing games:", error);
    process.exit(1);
  }
};

// Run the seeder
seedFontPairingGames();