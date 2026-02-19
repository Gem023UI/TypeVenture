import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

// Temporary Cloudinary image for all fonts
const TEMP_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png";

const Poppins = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771408928/7a798de1-0570-4954-8cb2-7a8db9058bd5.png";
const Helvetica = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771408964/84d33db6-2947-4b5f-9125-655f0458b5ff.png";
const TimesNewRoman = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771462841/cea18fd3-8191-4be2-95bc-525afc4fc6bb.png";
const Arial = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771462978/9352dd9f-419b-4c33-8824-2d1fac6ee0ed.png";
const Georgia = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771463279/425a4993-c768-40f3-969d-c8c9dfb63288.png";
const Roboto = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771463387/3c1837b3-0914-49cc-83aa-e08e6c529a33.png";
const ComicSansMS = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464449/2a9be064-6139-4a75-802d-2fb54b31df61.png";
const CourierNew = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464708/5f37b33e-e55a-4dbc-821a-7121e6b62a85.png";
const Verdana = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464778/d9d588db-d621-4016-8842-8595b6ae3809.png";
const Montserrat = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464862/d07de65f-3889-4c28-bd4b-602a86c581cd.png";
const Futura = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464887/178f3b3a-f1c2-43a1-a85c-00b1f53e76ab.png";
const Gotham = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464991/7e744be3-3aab-4945-ae0a-4db9c89d4571.png";
const Bodoni = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771465011/c4bd755a-1411-44b9-afda-d08955984081.png";
const Caslon = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771465392/1cf18297-e143-46df-9725-df66ab297ebc.png";
const Frutiger = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771465436/d390ff29-0fc3-4b7a-a169-b9c596c824c1.png";
const Rockwell = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496572/c068a21f-c9e1-4d0d-ab43-52e3b172f491.png";
const GillSans = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496617/70fa2b53-68d6-41fe-a6eb-cdb51d6c5916.png";
const ProximaNova = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496697/0dc5cf53-29cc-4f44-87c8-8797f90acbc3.png";
const MrsEaves = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496806/f9c420b3-6cd4-4c5b-8a6a-b9d607b76cfe.png";
const DIN = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496851/0ba89d29-6f2b-45f9-b2a0-c22de138ae95.png";
const Sabon = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496877/acf146b1-8f6c-4059-9e43-f12170bb99cf.png";
const Interstate = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496945/46e6b886-18d0-4deb-9a59-c8cb9dc5071d.png";
const AkzidenzGrotesk = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496975/b9ee42ec-ecd3-46d0-8e72-916d47930e7c.png";
const HoeflerText = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497072/1119dda8-ae80-4ea2-87dc-7b3cb4927821.png";
const FFMeta = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497118/57673fc4-6f1b-4db0-89cd-30b0a43e0932.png";
const Optima = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497146/96c76285-c3d2-4d8a-9341-f2c379d4fcbb.png";
const Thesis = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497246/37200cb7-64c9-402d-a334-517c40147ed7.png";
const Neutraface = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497265/8f624093-165f-4926-a7b2-9a700d5b2552.png";
const Archer = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497314/0f718815-fec3-44f4-bc82-267d69f77dcb.png";
const Filosofia = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497344/2f94c930-da69-44f4-8ef0-4b190d75287a.png";

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
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771499582/b41a5385-5810-44a3-87ee-a3cd65da04ea.png",
    difficulty: "easy",
    gameType: "typeface",
    questions: [
      {
        imageUrl: Poppins,
        correctAnswer: "Poppins",
        ...createBlanks("Poppins", 2)
      },
      {
        imageUrl: Helvetica,
        correctAnswer: "Helvetica",
        ...createBlanks("Helvetica", 3)
      },
      {
        imageUrl: TimesNewRoman,
        correctAnswer: "Times New Roman",
        ...createBlanks("Times New Roman", 4)
      },
      {
        imageUrl: Arial,
        correctAnswer: "Arial",
        ...createBlanks("Arial", 2)
      },
      {
        imageUrl: Georgia,
        correctAnswer: "Georgia",
        ...createBlanks("Georgia", 2)
      },
      {
        imageUrl: Roboto,
        correctAnswer: "Roboto",
        ...createBlanks("Roboto", 2)
      },
      {
        imageUrl: ComicSansMS,
        correctAnswer: "Comic Sans MS",
        ...createBlanks("Comic Sans MS", 3)
      },
      {
        imageUrl: CourierNew,
        correctAnswer: "Courier New",
        ...createBlanks("Courier New", 3)
      },
      {
        imageUrl: Verdana,
        correctAnswer: "Verdana",
        ...createBlanks("Verdana", 2)
      },
      {
        imageUrl: Montserrat,
        correctAnswer: "Montserrat",
        ...createBlanks("Montserrat", 3)
      }
    ],
    isActive: true
  },
  {
    title: "Guess the Typeface: Medium",
    description: "Challenge yourself with less common but recognizable fonts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771499582/b41a5385-5810-44a3-87ee-a3cd65da04ea.png",
    difficulty: "medium",
    gameType: "typeface",
    questions: [
      {
        imageUrl: Futura,
        correctAnswer: "Futura",
        ...createBlanks("Futura", 2)
      },
      {
        imageUrl: Gotham,
        correctAnswer: "Gotham",
        ...createBlanks("Gotham", 2)
      },
      {
        imageUrl: Bodoni,
        correctAnswer: "Bodoni",
        ...createBlanks("Bodoni", 2)
      },
      {
        imageUrl: Caslon,
        correctAnswer: "Caslon",
        ...createBlanks("Caslon", 2)
      },
      {
        imageUrl: Frutiger,
        correctAnswer: "Frutiger",
        ...createBlanks("Frutiger", 3)
      },
      {
        imageUrl: Rockwell,
        correctAnswer: "Rockwell",
        ...createBlanks("Rockwell", 3)
      },
      {
        imageUrl: GillSans,
        correctAnswer: "Gill Sans",
        ...createBlanks("Gill Sans", 3)
      },
      {
        imageUrl: ProximaNova,
        correctAnswer: "Proxima Nova",
        ...createBlanks("Proxima Nova", 4)
      },
      {
        imageUrl: MrsEaves,
        correctAnswer: "Mrs Eaves",
        ...createBlanks("Mrs Eaves", 3)
      },
      {
        imageUrl: DIN,
        correctAnswer: "DIN",
        ...createBlanks("DIN", 1)
      }
    ],
    isActive: true
  },
  {
    title: "Guess the Typeface: Hard",
    description: "Master-level font identification for typography experts!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771499582/b41a5385-5810-44a3-87ee-a3cd65da04ea.png",
    difficulty: "hard",
    gameType: "typeface",
    questions: [
      {
        imageUrl: Sabon,
        correctAnswer: "Sabon",
        ...createBlanks("Sabon", 2)
      },
      {
        imageUrl: Interstate,
        correctAnswer: "Interstate",
        ...createBlanks("Interstate", 4)
      },
      {
        imageUrl: AkzidenzGrotesk,
        correctAnswer: "Akzidenz Grotesk",
        ...createBlanks("Akzidenz Grotesk", 5)
      },
      {
        imageUrl: HoeflerText,
        correctAnswer: "Hoefler Text",
        ...createBlanks("Hoefler Text", 4)
      },
      {
        imageUrl: FFMeta,
        correctAnswer: "FF Meta",
        ...createBlanks("FF Meta", 2)
      },
      {
        imageUrl: Optima,
        correctAnswer: "Optima",
        ...createBlanks("Optima", 2)
      },
      {
        imageUrl: Thesis,
        correctAnswer: "Thesis",
        ...createBlanks("Thesis", 2)
      },
      {
        imageUrl: Neutraface,
        correctAnswer: "Neutraface",
        ...createBlanks("Neutraface", 4)
      },
      {
        imageUrl: Archer,
        correctAnswer: "Archer",
        ...createBlanks("Archer", 2)
      },
      {
        imageUrl: Filosofia,
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