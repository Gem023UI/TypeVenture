import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

const lessons = [
  {
    title: "Lesson 10: The Summit of Branding",
    difficulty: "Expert",
    completionTime: "~30 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797238/THE_SUMMIT_OD_BRANDING_ISLAND_rhp7ne.png",
    youtubeUrl: "",
    description: "At the final island, a mysterious tech entrepreneur wants to launch a new brand called NEO-FLOW. But the brief you receive has a typography problem — headline and body fonts are mismatched, making the brand look unprofessional. Your task is to create a cohesive brand identity by selecting the correct font pairing for the client.",
    instruction: "The challenge presents a brand with a broken typographic identity — the headline and body fonts conflict, creating visual dissonance. You will choose from three complete brand persona font pairings. Each persona swaps both fonts simultaneously on the live canvas. Select the pairing that creates the most cohesive, professional brand identity aligned with the client's brief. There is one correct answer.",
    sections: [],
    quiz: [

      /* ─── Challenge: NEO-FLOW ─── */
      {
        type: "brand-pairing",
        question: "NEO-FLOW's current design uses a futuristic cyber headline but Comic Sans for the body text — a jarring mismatch. Choose the font pairing that creates a cohesive, professional tech brand identity.",
        correctAnswer: "The High-Tech Startup",
        explanation: "Orbitron + Roboto creates perfect brand coherence for NEO-FLOW. Both fonts are geometric, digital, and forward-looking — Orbitron gives the headline a futuristic authority while Roboto provides clean, highly legible body text. The Heritage Brand feels too traditional, and the Luxury Boutique feels too fashion-forward for a tech company.",
        brandBackground: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773966621/d053b79a-3bfe-459f-838b-b4c2a780bfa4.png",
        headlineText: "NEO-FLOW",
        bodyText: "We are transforming the way people connect through cutting-edge AI technology and seamless integration.",
        wrongHeadlineFont: "'Orbitron', sans-serif",
        wrongBodyFont: "'Comic Sans MS', cursive",
        brandPersonas: [
          {
            personaTitle: "The Heritage Brand",
            headlineFont: "'Playfair Display', serif",
            bodyFont:     "'Source Sans Pro', sans-serif",
            vibe:         "Trust, Reliability, Tradition",
          },
          {
            personaTitle: "The High-Tech Startup",
            headlineFont: "'Orbitron', sans-serif",
            bodyFont:     "'Roboto', sans-serif",
            vibe:         "Innovation, Speed, Digital Technology",
          },
          {
            personaTitle: "The Luxury Boutique",
            headlineFont: "'Cormorant Garamond', serif",
            bodyFont:     "'Montserrat', sans-serif",
            vibe:         "Elegance, Exclusivity, Premium",
          },
        ],
      },

    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");
    await Lesson.deleteMany({ title: /Lesson 10:/ });
    console.log("🗑️  Cleared existing Lesson 10");
    const inserted = await Lesson.insertMany(lessons);
    console.log(`📚 Seeded ${inserted.length} lessons successfully`);
    for (const l of inserted) console.log(`   • ${l.title} (${l.quiz.length} quiz items)`);
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seed();