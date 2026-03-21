import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

// Background images — replace each URL with the actual Cloudinary upload once available
// Mapped by scenario order from the PDF
const BG = {
  neoflow:   "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083735/4e4d70e8-b205-422c-adc6-c5a1ed5ed01c.png",        // Image 1 — AI brain (667x668)
  coffee1:   "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083750/746fd30e-7096-48cf-9264-f01bb9479158.png",      // Image 2 — steaming coffee cup (668x668)
  luxury:    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083767/3523c0c7-f398-4b75-8de4-737c713037b3.png",       // Image 3 — pearls/silk (667x670)
  eco:       "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083794/f9651a44-6646-4343-9ae0-8b453ac9c67c.png",         // Image 4 — green leaves (670x671)
  fitness:   "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083810/7593f2bc-88b1-4405-9b09-e446cadbc856.png",   // Image 5 — treadmill hologram (1004x667)
  gallery:   "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083832/4786eae3-5749-41cf-9965-080a38a9bdd3.png",          // Image 6 — art gallery interior (1008x671)
  gaming:    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083838/119551a8-beab-4190-a9a4-9227fb501acc.png",       // Image 7 — sci-fi battle scene (1000x671)
  cafe:      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083863/9b319e30-1faa-4e37-b12a-6539c8651a7a.png",          // Image 8 — cozy cafe latte (445x671)
  ai:        "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774083902/e92fd020-0e0d-4a73-94e8-42305acd6452.png",        // Image 9 — blue tech cityscape (998x670)
  hotel:     "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774085020/a73aebb2-77bb-42ac-a1f2-e510a19adacc.png",       // Image 10 — luxury hotel interior (1008x674)
};

// Existing canvas bg used as temporary placeholder for all
const TEMP = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773966621/d053b79a-3bfe-459f-838b-b4c2a780bfa4.png";

const lessons = [
  {
    title: "Lesson 10: The Summit of Branding",
    difficulty: "Expert",
    completionTime: "~30 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797238/THE_SUMMIT_OD_BRANDING_ISLAND_rhp7ne.png",
    youtubeUrl: "",
    description: "At the final island, you will design cohesive brand identities for 10 different clients. Each scenario presents a broken typographic system — mismatched fonts, wrong sizes, poor spacing. Use the full typography workbench to fix the brand and create a professional, emotionally resonant identity.",
    instruction: "Each challenge presents a brand with a broken typographic identity. Using the tools provided, select the right font pairing, adjust font sizes, kerning, leading, tracking, and alignment, and position the text elements to create a cohesive brand design. Your work is graded on 10 typography principles. You have 60 seconds per scenario.",
    sections: [],
    quiz: [

      /* ═══════════════════════════════════════
         SCENARIO 1 — NEO-FLOW Tech Startup
         BG: AI brain digital — dark, futuristic
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "NEO-FLOW's poster starts with Orbitron headline but Comic Sans body text — a jarring mismatch. Fix the typography to create a cohesive, futuristic tech brand identity.",
        correctAnswer: "The High-Tech Startup",
        explanation: "Orbitron + Roboto creates perfect brand coherence — both are geometric and digital. Orbitron gives the headline futuristic authority; Roboto provides clean, legible body text. Target: Kerning -5%, Leading 48px, Tracking 0%, Left alignment.",
        brandBackground: BG.neoflow, // replace with BG.neoflow
        headlineText: "NEO-FLOW",
        bodyText: "Experience next-gen AI solutions today.",
        wrongHeadlineFont: "'Orbitron', sans-serif",
        wrongBodyFont: "'Comic Sans MS', cursive",
        brandPersonas: [
          { personaTitle: "The Heritage Brand",    headlineFont: "'Playfair Display', serif",    bodyFont: "'Source Sans 3', sans-serif", vibe: "Trust, Reliability, Tradition" },
          { personaTitle: "The High-Tech Startup", headlineFont: "'Orbitron', sans-serif",        bodyFont: "'Roboto', sans-serif",         vibe: "Innovation, Speed, Digital Technology" },
          { personaTitle: "The Luxury Boutique",   headlineFont: "'Cormorant Garamond', serif",   bodyFont: "'Montserrat', sans-serif",     vibe: "Elegance, Exclusivity, Premium" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 2 — Heritage Coffee Shop
         BG: steaming coffee cup — warm, artisanal
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "The Daily Bean coffee shop uses cold, mechanical typography that clashes with the warm artisanal aesthetic. Choose and refine the font pairing that communicates warmth and craftsmanship.",
        correctAnswer: "Heritage Coffee Shop",
        explanation: "Playfair Display + Source Sans 3 — the serif headline communicates tradition and quality, while Source Sans 3 keeps the body readable and approachable. Target: Kerning 0%, Leading 44px, Left alignment, warm tone.",
        brandBackground: BG.coffee1, // replace with BG.coffee1
        headlineText: "The Daily Bean",
        bodyText: "Warm, carefully roasted coffee. Brewed to Perfection.",
        wrongHeadlineFont: "'Roboto Mono', monospace",
        wrongBodyFont: "'Arial', sans-serif",
        brandPersonas: [
          { personaTitle: "Heritage Coffee Shop",  headlineFont: "'Playfair Display', serif",  bodyFont: "'Source Sans 3', sans-serif", vibe: "Warm, Trustworthy, Artisanal" },
          { personaTitle: "Modern Tech Brand",     headlineFont: "'Exo 2', sans-serif",         bodyFont: "'Roboto', sans-serif",         vibe: "Cold, Digital, Mechanical" },
          { personaTitle: "Luxury Minimalist",     headlineFont: "'Cormorant Garamond', serif", bodyFont: "'Montserrat', sans-serif",     vibe: "Cool, Refined, Distant" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 3 — Luxury Fashion Boutique
         BG: pearls & silk — elegant, light
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "LUXE & CO. is using a playful rounded font that makes this luxury fashion boutique look cheap. Select and refine the pairing that communicates elegance and exclusivity.",
        correctAnswer: "Luxury Fashion Boutique",
        explanation: "Cormorant Garamond + Montserrat Light — the high-contrast serif headline feels couture and refined; Montserrat Light adds a contemporary, airy body text. Target: Kerning -2%, Leading 50px, Center alignment, luxury tone.",
        brandBackground: BG.luxury, // replace with BG.luxury
        headlineText: "LUXE & CO.",
        bodyText: "Handcrafted timeless pieces. Elegance Redefined.",
        wrongHeadlineFont: "'Fredoka One', cursive",
        wrongBodyFont: "'Comic Sans MS', cursive",
        brandPersonas: [
          { personaTitle: "Luxury Fashion Boutique", headlineFont: "'Cormorant Garamond', serif", bodyFont: "'Montserrat', sans-serif",     vibe: "Luxury, Elegant, Exclusive" },
          { personaTitle: "Tech Startup",            headlineFont: "'Orbitron', sans-serif",       bodyFont: "'Roboto', sans-serif",          vibe: "Futuristic, Cold, Digital" },
          { personaTitle: "Friendly Retail",         headlineFont: "'Quicksand', sans-serif",      bodyFont: "'Lato', sans-serif",            vibe: "Casual, Approachable, Generic" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 4 — Eco Skincare Brand
         BG: green leaves with dew — organic, calm
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "Green Glow skincare is using sharp, angular fonts that feel artificial. Select the pairing that communicates natural, organic, and gentle qualities.",
        correctAnswer: "Eco Skincare Brand",
        explanation: "Quicksand + Lora — Quicksand's gentle rounded forms mirror nature's soft shapes, while Lora adds a warm, trustworthy serif touch to body text. Target: Kerning -1%, Leading 42px, Center alignment, organic tone.",
        brandBackground: BG.eco, // replace with BG.eco
        headlineText: "Green Glow",
        bodyText: "Sustainably sourced, gentle. Nature in Every Drop.",
        wrongHeadlineFont: "'Impact', sans-serif",
        wrongBodyFont: "'Courier Prime', monospace",
        brandPersonas: [
          { personaTitle: "Eco Skincare Brand",  headlineFont: "'Quicksand', sans-serif", bodyFont: "'Lora', serif",           vibe: "Organic, Natural, Calm" },
          { personaTitle: "Corporate Brand",     headlineFont: "'Oswald', sans-serif",    bodyFont: "'Roboto', sans-serif",    vibe: "Cold, Corporate, Stiff" },
          { personaTitle: "Luxury Cosmetics",    headlineFont: "'Playfair Display', serif", bodyFont: "'Montserrat', sans-serif", vibe: "Formal, Distant, Rigid" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 5 — Futuristic Fitness App
         BG: treadmill with hologram body scan — energetic
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "FitPulse is using a disconnected cursive font that feels slow and passive. Fix the typography so the brand communicates energy, motion, and AI-powered fitness.",
        correctAnswer: "Futuristic Fitness App",
        explanation: "Exo 2 + Roboto — Exo 2's geometric design feels athletic and forward-moving; Roboto keeps the body text crisp and efficient. Target: Kerning -3%, Leading 44px, Left alignment, energetic/modern tone.",
        brandBackground: BG.fitness, // replace with BG.fitness
        headlineText: "FitPulse",
        bodyText: "AI workouts and analytics. Track. Train. Transform.",
        wrongHeadlineFont: "'Dancing Script', cursive",
        wrongBodyFont: "'Times New Roman', serif",
        brandPersonas: [
          { personaTitle: "Futuristic Fitness App", headlineFont: "'Exo 2', sans-serif",           bodyFont: "'Roboto', sans-serif",    vibe: "Energetic, Modern, Tech-Driven" },
          { personaTitle: "Heritage Wellness",      headlineFont: "'Playfair Display', serif",      bodyFont: "'Lora', serif",           vibe: "Calm, Traditional, Slow" },
          { personaTitle: "Casual Sports",          headlineFont: "'Fredoka One', cursive",         bodyFont: "'Quicksand', sans-serif", vibe: "Playful, Relaxed, Amateur" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 6 — Art Gallery
         BG: clean white gallery interior — premium, curated
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "Artium gallery's current branding uses a slab serif headline and Comic Sans body. Visitors don't take it seriously. Choose a pairing that communicates curatorial prestige.",
        correctAnswer: "Art Gallery",
        explanation: "Playfair Display + Lato — the high-contrast serif communicates cultural authority and aesthetic discernment, while Lato provides clean, neutral body text that lets the art speak. Target: Kerning -1%, Leading 48px, Left alignment, premium tone.",
        brandBackground: BG.gallery, // replace with BG.gallery
        headlineText: "Artium",
        bodyText: "Exceptional works by local and international artists. Contemporary & Classic.",
        wrongHeadlineFont: "'Roboto Slab', serif",
        wrongBodyFont: "'Comic Sans MS', cursive",
        brandPersonas: [
          { personaTitle: "Art Gallery",       headlineFont: "'Playfair Display', serif", bodyFont: "'Lato', sans-serif",         vibe: "Premium, Curated, Cultural" },
          { personaTitle: "Tech Startup",      headlineFont: "'Orbitron', sans-serif",    bodyFont: "'Roboto', sans-serif",       vibe: "Futuristic, Cold, Digital" },
          { personaTitle: "Kids Creative Hub", headlineFont: "'Fredoka One', cursive",    bodyFont: "'Nunito', sans-serif",       vibe: "Playful, Colourful, Informal" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 7 — Gaming Startup
         BG: sci-fi battle scene — dynamic, dark
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "HyperQuest is using dull Times New Roman and Roboto Slab that make this action-packed gaming brand feel like a textbook. Make the typography match the energy of the game.",
        correctAnswer: "Gaming Startup",
        explanation: "Orbitron + Exo 2 — Orbitron creates an authoritative sci-fi headline presence; Exo 2 maintains the futuristic energy in body text while staying readable. Target: Kerning -5%, Leading 50px, Left alignment, dynamic/techy tone.",
        brandBackground: BG.gaming, // replace with BG.gaming
        headlineText: "HyperQuest",
        bodyText: "Multiplayer experience. Leaderboards. Play Beyond Limits.",
        wrongHeadlineFont: "'Times New Roman', serif",
        wrongBodyFont: "'Roboto Slab', serif",
        brandPersonas: [
          { personaTitle: "Gaming Startup",   headlineFont: "'Orbitron', sans-serif",       bodyFont: "'Exo 2', sans-serif",         vibe: "Dynamic, Techy, Futuristic" },
          { personaTitle: "Heritage Brand",   headlineFont: "'Playfair Display', serif",    bodyFont: "'Libre Baskerville', serif",  vibe: "Traditional, Slow, Conservative" },
          { personaTitle: "Wellness Brand",   headlineFont: "'Quicksand', sans-serif",      bodyFont: "'Lato', sans-serif",          vibe: "Calm, Gentle, Wrong Genre" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 8 — Modern Cafe
         BG: cozy cafe latte art — friendly, warm
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "Brew & Bean café has flat, lifeless typography that doesn't invite customers in. The space is cozy and modern — the fonts should feel the same.",
        correctAnswer: "Modern Cafe",
        explanation: "Montserrat Bold + Quicksand — Montserrat Bold gives the headline strong, modern confidence while Quicksand's soft rounded body text creates a warm, welcoming feeling. Target: Kerning -2%, Leading 44px, Center alignment, friendly/modern tone.",
        brandBackground: BG.cafe, // replace with BG.cafe
        headlineText: "Brew & Bean",
        bodyText: "Fresh beans, cozy pastries. Coffee With Soul.",
        wrongHeadlineFont: "'Courier Prime', monospace",
        wrongBodyFont: "'Arial', sans-serif",
        brandPersonas: [
          { personaTitle: "Modern Cafe",    headlineFont: "'Montserrat', sans-serif",  bodyFont: "'Quicksand', sans-serif",  vibe: "Friendly, Modern, Approachable" },
          { personaTitle: "Luxury Dining",  headlineFont: "'Cormorant Garamond', serif", bodyFont: "'Lato', sans-serif",     vibe: "Cold, Formal, Exclusive" },
          { personaTitle: "Tech Brand",     headlineFont: "'Orbitron', sans-serif",    bodyFont: "'Roboto', sans-serif",     vibe: "Digital, Futuristic, Wrong Tone" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 9 — AI Consulting
         BG: blue digital tech cityscape — professional, futuristic
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "NeuralNext AI consulting currently uses Comic Sans — an amateurish choice that destroys credibility. Build a typographic identity that communicates intelligence and innovation.",
        correctAnswer: "AI Consulting",
        explanation: "Orbitron + Roboto — Orbitron establishes technological authority in the headline; Roboto's clean humanist design makes the body text feel professional and efficient. Target: Kerning -4%, Leading 48px, Left alignment, futuristic/professional tone.",
        brandBackground: BG.ai, // replace with BG.ai
        headlineText: "NeuralNext",
        bodyText: "AI solutions for efficiency and insight. Innovate with Intelligence.",
        wrongHeadlineFont: "'Comic Sans MS', cursive",
        wrongBodyFont: "'Comic Sans MS', cursive",
        brandPersonas: [
          { personaTitle: "AI Consulting",   headlineFont: "'Orbitron', sans-serif",       bodyFont: "'Roboto', sans-serif",         vibe: "Futuristic, Professional, Digital" },
          { personaTitle: "Law Firm",        headlineFont: "'EB Garamond', serif",          bodyFont: "'Libre Baskerville', serif",   vibe: "Traditional, Formal, Conservative" },
          { personaTitle: "Artisan Market",  headlineFont: "'Pacifico', cursive",           bodyFont: "'Lato', sans-serif",           vibe: "Casual, Handcrafted, Wrong Tone" },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 10 — High-End Hotel
         BG: luxury hotel interior with lake view — elegant, serene
      ═══════════════════════════════════════ */
      {
        type: "brand-pairing",
        question: "The Azure Heights is a 5-star hotel using rounded fonts and Arial that strip away all sense of luxury. Create a typographic identity worthy of a premium hospitality brand.",
        correctAnswer: "High-End Hotel",
        explanation: "Cormorant Garamond + Montserrat Light — Cormorant Garamond's thin, high-contrast serifs communicate refined luxury; Montserrat Light adds sophisticated, airy body text. Target: Kerning -2%, Leading 50px, Center alignment, elegant/luxurious tone.",
        brandBackground: BG.hotel, // replace with BG.hotel
        headlineText: "The Azure Heights",
        bodyText: "Luxury rooms, fine dining, personalized service. Experience Elegance.",
        wrongHeadlineFont: "'Fredoka One', cursive",
        wrongBodyFont: "'Arial', sans-serif",
        brandPersonas: [
          { personaTitle: "High-End Hotel",  headlineFont: "'Cormorant Garamond', serif",  bodyFont: "'Montserrat', sans-serif",  vibe: "Elegant, Luxurious, Premium" },
          { personaTitle: "Budget Hostel",   headlineFont: "'Fredoka One', cursive",       bodyFont: "'Nunito', sans-serif",      vibe: "Casual, Cheap, Informal" },
          { personaTitle: "Tech Hotel",      headlineFont: "'Exo 2', sans-serif",          bodyFont: "'Roboto', sans-serif",      vibe: "Digital, Impersonal, Cold" },
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