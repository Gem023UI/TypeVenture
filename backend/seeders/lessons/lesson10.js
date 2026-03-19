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
    description: "At the final island, a mysterious tech entrepreneur wants to launch a new brand called NEO-FLOW. But every brief you receive has a typography problem — headline and body fonts are mismatched, making the brand look unprofessional. Your task is to create a cohesive brand identity by selecting the correct font pairing for each client.",
    instruction: "Each challenge presents a brand with a broken typographic identity — the headline and body fonts conflict, creating visual dissonance. You will choose from three complete brand persona font pairings. Each persona swaps both fonts simultaneously on the live canvas. Select the pairing that creates the most cohesive, professional brand identity aligned with the client's brief. There is one correct answer for each challenge.",
    sections: [],
    quiz: [

      /* ─── Challenge 1: NEO-FLOW ─── */
      {
        type: "brand-pairing",
        question: "NEO-FLOW's current design uses a futuristic cyber headline but Comic Sans for the body text — a jarring mismatch. Choose the font pairing that creates a cohesive, professional tech brand identity.",
        correctAnswer: "The High-Tech Startup",
        explanation: "Orbitron + Roboto creates perfect brand coherence for NEO-FLOW. Both fonts are geometric, digital, and forward-looking — Orbitron gives the headline a futuristic authority while Roboto provides clean, highly legible body text. The Heritage Brand feels too traditional, and the Luxury Boutique feels too fashion-forward for a tech company.",
        brandBackground: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797236/THE_MODULARITY_ISALND_yyeljt.png",
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

      /* ─── Challenge 2: Veridia Bank ─── */
      {
        type: "brand-pairing",
        question: "Veridia Bank's rebrand currently uses a Grunge display font with a decorative script body — completely wrong for financial services. Choose the pairing that communicates trust, reliability, and institutional authority.",
        correctAnswer: "The Heritage Brand",
        explanation: "Playfair Display + Source Sans Pro is the correct pairing for a bank. Playfair Display carries historical weight and trustworthiness, while Source Sans Pro keeps the body text clean and highly readable. The High-Tech pairing feels too startup-ish for a bank, and the Luxury Boutique is too fashion-forward.",
        brandBackground: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797239/THE_INDUSTRY_ISLAND_ptnwzh.png",
        headlineText: "Veridia Bank",
        bodyText: "Your financial future, secured. Over 150 years of trust, integrity, and expert guidance for individuals and institutions.",
        wrongHeadlineFont: "'Permanent Marker', cursive",
        wrongBodyFont:     "'Dancing Script', cursive",
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

      /* ─── Challenge 3: Maison Éclat ─── */
      {
        type: "brand-pairing",
        question: "Maison Éclat is a new luxury fashion boutique. Their current design uses a blocky Slab Serif headline with a heavy Monospaced body font — it looks like a technical manual, not a fashion house. Fix it.",
        correctAnswer: "The Luxury Boutique",
        explanation: "Cormorant Garamond + Montserrat Light is the defining pairing for luxury fashion. The ultra-high-contrast Didone-style Cormorant creates drama and exclusivity in the headline, while Montserrat Light provides elegant, airy body text. The Heritage Brand is too bookish, and the High-Tech Startup pairing is too industrial.",
        brandBackground: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797238/THE_SUMMIT_OD_BRANDING_ISLAND_rhp7ne.png",
        headlineText: "Maison Éclat",
        bodyText: "Crafted for those who understand that true luxury is not worn — it is felt. A new collection, arriving this season.",
        wrongHeadlineFont: "'Rockwell', 'Courier New', serif",
        wrongBodyFont:     "'Roboto Mono', monospace",
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

      /* ─── Challenge 4: ArcLight AI ─── */
      {
        type: "brand-pairing",
        question: "ArcLight AI is an artificial intelligence research lab. Their current design uses an Old English Blackletter headline with a decorative serif body — it looks like a medieval manuscript, not a cutting-edge tech company. Choose the correct pairing.",
        correctAnswer: "The High-Tech Startup",
        explanation: "Orbitron + Roboto is the only pairing that communicates the precision, speed, and digital intelligence of an AI research lab. Orbitron's geometric, circuit-like letterforms directly reference technology, while Roboto's clean neutrality makes technical content highly legible.",
        brandBackground: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797234/THE_ENGINEERING_ISLAND_j75cvx.png",
        headlineText: "ArcLight AI",
        bodyText: "Advancing human potential through intelligent systems. Our models process billions of data points to deliver decisions in milliseconds.",
        wrongHeadlineFont: "'UnifrakturMaguntia', cursive",
        wrongBodyFont:     "'EB Garamond', serif",
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

      /* ─── Challenge 5: Thornwood Publishing ─── */
      {
        type: "brand-pairing",
        question: "Thornwood Publishing is a 90-year-old literary press. Their rebrand currently uses a Futuristic Sci-Fi headline with a Comic Sans body — it looks nothing like a serious publisher. Restore their identity.",
        correctAnswer: "The Heritage Brand",
        explanation: "Playfair Display + Source Sans Pro perfectly suits a literary publisher. Playfair Display's high-contrast, editorial proportions carry the weight of literary tradition, while Source Sans Pro ensures comfortable reading for longer body copy. This pairing says 'we take literature seriously' without feeling stuffy.",
        brandBackground: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797232/THE_ANCIENT_ISLAND_z9rtsh.png",
        headlineText: "Thornwood Publishing",
        bodyText: "For ninety years, we have championed voices that matter. Every book we publish is a commitment to the enduring power of the written word.",
        wrongHeadlineFont: "'Orbitron', sans-serif",
        wrongBodyFont:     "'Comic Sans MS', cursive",
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
    await Lesson.deleteMany({ title: /Lesson X:/ });
    console.log("🗑️  Cleared existing Lesson X");
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