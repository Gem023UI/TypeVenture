import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB Connected for Font Selection Seeder");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

const fontSelectionGames = [
  // ============= EASY DIFFICULTY - 5 QUESTIONS =============
  {
    title: "Font Selection: Tech Startup Logo",
    description: "Choose the best font for a modern tech startup logo",
    difficulty: "easy",
    gameType: "fontselection",
    purpose: "Create a logo for a modern tech startup",
    theme: "Technology, Innovation, Future",
    atmosphere: "Professional, Clean, Modern",
    context: "B2B SaaS company targeting enterprise clients",
    explanation: "Helvetica Neue offers the clean, modern aesthetic that tech startups need while maintaining professional credibility. Its geometric precision and neutral character make it perfect for technology brands.",
    correctAnswer: "Helvetica Neue",
    options: [
      {
        fontName: "Helvetica Neue",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/helvetica-sample.png"
      },
      {
        fontName: "Comic Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/comic-sample.png"
      },
      {
        fontName: "Times New Roman",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/times-sample.png"
      },
      {
        fontName: "Brush Script",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/brush-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Children's Book Title",
    description: "Pick the perfect font for a children's picture book",
    difficulty: "easy",
    gameType: "fontselection",
    purpose: "Design the title for a children's picture book",
    theme: "Playful, Friendly, Fun",
    atmosphere: "Cheerful, Inviting, Warm",
    context: "Book for ages 3-7 about a friendly monster",
    explanation: "Comic Sans, while often criticized in professional design, is actually perfect for children's materials. Its informal, hand-drawn quality makes it approachable and easy for young readers to decode.",
    correctAnswer: "Comic Sans",
    options: [
      {
        fontName: "Comic Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/comic-sample.png"
      },
      {
        fontName: "Garamond",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/garamond-sample.png"
      },
      {
        fontName: "Futura",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/futura-sample.png"
      },
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Law Firm Business Card",
    description: "Select a trustworthy font for a law firm's business card",
    difficulty: "easy",
    gameType: "fontselection",
    purpose: "Design a business card for a law firm",
    theme: "Trust, Authority, Tradition",
    atmosphere: "Professional, Serious, Established",
    context: "Century-old firm specializing in corporate law",
    explanation: "Times New Roman conveys tradition, authority, and professionalism—essential qualities for a law firm. Its long history and association with printed legal documents makes it immediately recognizable and trustworthy.",
    correctAnswer: "Times New Roman",
    options: [
      {
        fontName: "Times New Roman",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/times-sample.png"
      },
      {
        fontName: "Papyrus",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/papyrus-sample.png"
      },
      {
        fontName: "Chalkboard",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/chalkboard-sample.png"
      },
      {
        fontName: "Comic Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/comic-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Organic Bakery Sign",
    description: "Choose a warm font for an artisan bakery storefront",
    difficulty: "easy",
    gameType: "fontselection",
    purpose: "Create signage for an organic artisan bakery",
    theme: "Natural, Handmade, Authentic",
    atmosphere: "Warm, Welcoming, Rustic",
    context: "Small neighborhood bakery using traditional methods",
    explanation: "Brush Script's handwritten quality perfectly captures the artisanal, handcrafted nature of a bakery. Its flowing, organic forms evoke warmth and authenticity, making customers feel they're getting something made with care.",
    correctAnswer: "Brush Script",
    options: [
      {
        fontName: "Brush Script",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/brush-sample.png"
      },
      {
        fontName: "Courier",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/courier-sample.png"
      },
      {
        fontName: "Arial",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/arial-sample.png"
      },
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Sports Event Poster",
    description: "Pick a bold font for a boxing match poster",
    difficulty: "easy",
    gameType: "fontselection",
    purpose: "Design a poster for a boxing championship",
    theme: "Power, Energy, Excitement",
    atmosphere: "Bold, Dynamic, Intense",
    context: "Major sporting event needing high visibility",
    explanation: "Impact lives up to its name with maximum boldness and visibility. Its compressed, heavy letterforms command attention and convey strength—perfect for sports events where you need to grab attention quickly.",
    correctAnswer: "Impact",
    options: [
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      },
      {
        fontName: "Georgia",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/georgia-sample.png"
      },
      {
        fontName: "Palatino",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/palatino-sample.png"
      },
      {
        fontName: "Brush Script",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/brush-sample.png"
      }
    ],
    isActive: true
  },

  // ============= MEDIUM DIFFICULTY - 5 QUESTIONS =============
  {
    title: "Font Selection: Luxury Fashion Magazine",
    description: "Select an elegant font for a high-end fashion editorial",
    difficulty: "medium",
    gameType: "fontselection",
    purpose: "Design headlines for a luxury fashion magazine",
    theme: "Elegance, Sophistication, Haute Couture",
    atmosphere: "Refined, Exclusive, Timeless",
    context: "Editorial spread featuring Paris Fashion Week",
    explanation: "Bodoni epitomizes fashion typography with its dramatic contrast between thick and thin strokes. Its vertical stress and geometric construction create an elegant, high-fashion aesthetic that's been used by Vogue and other luxury publications for decades.",
    correctAnswer: "Bodoni",
    options: [
      {
        fontName: "Bodoni",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/bodoni-sample.png"
      },
      {
        fontName: "Arial Black",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/arial-black-sample.png"
      },
      {
        fontName: "Courier New",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/courier-sample.png"
      },
      {
        fontName: "Verdana",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/verdana-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Literary Novel Cover",
    description: "Choose a classic font for a literary fiction book",
    difficulty: "medium",
    gameType: "fontselection",
    purpose: "Design the cover for a Pulitzer Prize-winning novel",
    theme: "Literature, Intelligence, Depth",
    atmosphere: "Thoughtful, Classic, Sophisticated",
    context: "Contemporary literary fiction about family dynamics",
    explanation: "Garamond is the quintessential book typeface, designed for extended reading. Its classical proportions, excellent readability, and literary associations make it perfect for serious fiction. It signals substance and craftsmanship.",
    correctAnswer: "Garamond",
    options: [
      {
        fontName: "Garamond",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/garamond-sample.png"
      },
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      },
      {
        fontName: "Comic Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/comic-sample.png"
      },
      {
        fontName: "Stencil",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/stencil-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Minimalist Architecture Firm",
    description: "Pick a clean font for a contemporary architecture studio",
    difficulty: "medium",
    gameType: "fontselection",
    purpose: "Create branding for a minimalist architecture firm",
    theme: "Minimalism, Geometry, Precision",
    atmosphere: "Clean, Modern, Sophisticated",
    context: "Firm known for Bauhaus-inspired residential designs",
    explanation: "Futura's geometric construction and perfect circles make it ideal for architecture branding. Built on simple geometric shapes, it embodies the modernist principle of form following function, resonating perfectly with architectural aesthetics.",
    correctAnswer: "Futura",
    options: [
      {
        fontName: "Futura",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/futura-sample.png"
      },
      {
        fontName: "Old English",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/old-english-sample.png"
      },
      {
        fontName: "Brush Script",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/brush-sample.png"
      },
      {
        fontName: "Papyrus",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/papyrus-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Vintage Jazz Club Poster",
    description: "Select a period-appropriate font for a 1920s jazz club",
    difficulty: "medium",
    gameType: "fontselection",
    purpose: "Design promotional materials for a vintage jazz venue",
    theme: "Art Deco, Jazz Age, Nostalgia",
    atmosphere: "Glamorous, Historic, Sophisticated",
    context: "Speakeasy-style club featuring 1920s music",
    explanation: "Copperplate Gothic captures the Art Deco era perfectly with its geometric forms and elegant all-caps design. Popular in the 1920s, it evokes the glamour and sophistication of the Jazz Age while maintaining excellent readability.",
    correctAnswer: "Copperplate Gothic",
    options: [
      {
        fontName: "Copperplate Gothic",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/copperplate-sample.png"
      },
      {
        fontName: "Helvetica",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/helvetica-sample.png"
      },
      {
        fontName: "Comic Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/comic-sample.png"
      },
      {
        fontName: "Arial",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/arial-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Eco-Friendly Product Packaging",
    description: "Choose a natural-feeling font for sustainable products",
    difficulty: "medium",
    gameType: "fontselection",
    purpose: "Design packaging for an eco-friendly skincare line",
    theme: "Nature, Sustainability, Wellness",
    atmosphere: "Organic, Authentic, Calming",
    context: "Products made with natural ingredients and minimal processing",
    explanation: "Gill Sans has a humanist quality with slightly organic forms that feel natural and approachable. Its clean lines suggest purity and simplicity, while its warmth conveys the authentic, handcrafted nature of eco-friendly products.",
    correctAnswer: "Gill Sans",
    options: [
      {
        fontName: "Gill Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/gill-sans-sample.png"
      },
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      },
      {
        fontName: "Stencil",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/stencil-sample.png"
      },
      {
        fontName: "Old English",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/old-english-sample.png"
      }
    ],
    isActive: true
  },

  // ============= HARD DIFFICULTY - 5 QUESTIONS =============
  {
    title: "Font Selection: Cryptocurrency Platform UI",
    description: "Pick a trustworthy yet modern font for fintech",
    difficulty: "hard",
    gameType: "fontselection",
    purpose: "Design the interface for a cryptocurrency trading platform",
    theme: "Technology, Trust, Innovation, Finance",
    atmosphere: "Professional, Secure, Cutting-edge",
    context: "Platform handling billions in transactions, need to balance innovation with trustworthiness",
    explanation: "GT America strikes the perfect balance between innovation and stability for fintech. Its geometric rationality suggests algorithmic precision, while its subtle warmth humanizes complex financial technology. Used by Coinbase and other fintech leaders.",
    correctAnswer: "GT America",
    options: [
      {
        fontName: "GT America",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/gt-america-sample.png"
      },
      {
        fontName: "Papyrus",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/papyrus-sample.png"
      },
      {
        fontName: "Brush Script",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/brush-sample.png"
      },
      {
        fontName: "Times New Roman",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/times-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Museum Exhibition Signage",
    description: "Select a font for a contemporary art museum",
    difficulty: "hard",
    gameType: "fontselection",
    purpose: "Design wayfinding and exhibition labels for MoMA-style museum",
    theme: "Art, Culture, Clarity, Modernism",
    atmosphere: "Neutral, Sophisticated, Timeless",
    context: "Exhibition featuring both historical and contemporary works requiring typographic neutrality",
    explanation: "Akzidenz-Grotesk is the proto-Helvetica, offering even greater neutrality and objectivity. Museums use it because it disappears into the background, never competing with the artwork while maintaining perfect clarity—exactly what exhibition design requires.",
    correctAnswer: "Akzidenz-Grotesk",
    options: [
      {
        fontName: "Akzidenz-Grotesk",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/akzidenz-sample.png"
      },
      {
        fontName: "Curlz",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/curlz-sample.png"
      },
      {
        fontName: "Comic Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/comic-sample.png"
      },
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Academic Journal Typography",
    description: "Choose a scholarly font for peer-reviewed research",
    difficulty: "hard",
    gameType: "fontselection",
    purpose: "Set body text for a prestigious scientific journal",
    theme: "Scholarship, Clarity, Authority, Tradition",
    atmosphere: "Academic, Serious, Readable",
    context: "Journal publishing groundbreaking research, read for hours by academics worldwide",
    explanation: "Minion is specifically engineered for extended reading in academic contexts. Its generous x-height, open counters, and classical proportions reduce eye strain during long reading sessions. Used by Nature, Science, and top academic publishers for its perfect balance of authority and readability.",
    correctAnswer: "Minion",
    options: [
      {
        fontName: "Minion",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/minion-sample.png"
      },
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      },
      {
        fontName: "Chalkboard",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/chalkboard-sample.png"
      },
      {
        fontName: "Marker Felt",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/marker-felt-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Luxury Watch Advertisement",
    description: "Pick an exclusive font for haute horlogerie marketing",
    difficulty: "hard",
    gameType: "fontselection",
    purpose: "Create print ads for Swiss luxury watches ($50K+ price point)",
    theme: "Luxury, Craftsmanship, Heritage, Exclusivity",
    atmosphere: "Elegant, Timeless, Refined, Prestigious",
    context: "Century-old watchmaker targeting ultra-high-net-worth collectors",
    explanation: "Sabon was designed specifically for fine printing and luxury applications. Its Renaissance proportions and exceptional craftsmanship mirror the values of haute horlogerie. The font's subtlety and refinement signal exclusivity without ostentation—perfect for brands where quiet confidence matters more than loud statements.",
    correctAnswer: "Sabon",
    options: [
      {
        fontName: "Sabon",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/sabon-sample.png"
      },
      {
        fontName: "Arial",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/arial-sample.png"
      },
      {
        fontName: "Comic Sans",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/comic-sample.png"
      },
      {
        fontName: "Papyrus",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/papyrus-sample.png"
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection: Meditation App Interface",
    description: "Select a calming font for mindfulness technology",
    difficulty: "hard",
    gameType: "fontselection",
    purpose: "Design UI for a meditation and mindfulness mobile app",
    theme: "Wellness, Calm, Balance, Mindfulness",
    atmosphere: "Peaceful, Gentle, Centered, Harmonious",
    context: "App for reducing anxiety through guided meditation, must feel calming not clinical",
    explanation: "GT Sectra combines warmth with clarity in a way that feels both human and slightly spiritual. Its soft serifs and generous spacing create a sense of breathing room and calm. Unlike corporate sans-serifs, it has personality without being distracting—perfect for wellness applications where typography itself must feel meditative.",
    correctAnswer: "GT Sectra",
    options: [
      {
        fontName: "GT Sectra",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/gt-sectra-sample.png"
      },
      {
        fontName: "Impact",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/impact-sample.png"
      },
      {
        fontName: "Stencil",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/stencil-sample.png"
      },
      {
        fontName: "Arial Black",
        fontImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1737619200/arial-black-sample.png"
      }
    ],
    isActive: true
  }
];

const seedFontSelectionGames = async () => {
  try {
    await connectDB();

    console.log("🗑️  Deleting existing font selection games...");
    await Game.deleteMany({ gameType: "fontselection" });

    console.log("🌱 Seeding font selection games...");
    const result = await Game.insertMany(fontSelectionGames);

    console.log("✅ Font selection games seeded successfully!");
    console.log(`📊 Total games created: ${result.length}`);
    console.log(`   - Easy: ${result.filter(g => g.difficulty === 'easy').length} games`);
    console.log(`   - Medium: ${result.filter(g => g.difficulty === 'medium').length} games`);
    console.log(`   - Hard: ${result.filter(g => g.difficulty === 'hard').length} games`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedFontSelectionGames();