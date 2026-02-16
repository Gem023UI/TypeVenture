import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

// Temporary placeholder for font sample images
const TEMP_FONT_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png";

const fontSelectionGames = [
  {
    title: "Font Selection Challenge: Easy",
    description: "Choose the most appropriate font for common design scenarios!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "easy",
    gameType: "fontselection",
    questions: [
      {
        questionText: "Select the most appropriate font",
        purpose: "Children's Storybook Cover",
        theme: "Playful and Friendly",
        atmosphere: "Cheerful and Welcoming",
        context: "A fairy tale story for ages 5-8",
        correctAnswer: "Comic Sans MS",
        explanation: "Comic Sans MS, while often criticized in professional design, is actually appropriate for children's materials due to its playful, friendly, and easily readable characteristics.",
        options: [
          { fontName: "Comic Sans MS", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Times New Roman", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Arial Black", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Courier New", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Wedding Invitation",
        theme: "Elegant and Romantic",
        atmosphere: "Formal and Sophisticated",
        context: "Traditional church wedding ceremony",
        correctAnswer: "Script/Calligraphy Font",
        explanation: "Script or calligraphy fonts convey elegance, romance, and formality, making them perfect for traditional wedding invitations.",
        options: [
          { fontName: "Script/Calligraphy Font", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Arial", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Impact", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Courier New", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Tech Startup Website",
        theme: "Modern and Clean",
        atmosphere: "Professional and Innovative",
        context: "SaaS product landing page",
        correctAnswer: "Roboto",
        explanation: "Roboto is a modern sans-serif that's clean, professional, and optimized for digital screens, making it ideal for tech websites.",
        options: [
          { fontName: "Roboto", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Papyrus", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Times New Roman", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Brush Script", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Restaurant Menu",
        theme: "Appetizing and Readable",
        atmosphere: "Casual and Inviting",
        context: "Family-friendly Italian restaurant",
        correctAnswer: "Georgia",
        explanation: "Georgia is a serif font that's highly readable and has a warm, inviting quality perfect for restaurant menus.",
        options: [
          { fontName: "Georgia", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Impact", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Stencil", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Webdings", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Business Report",
        theme: "Professional and Clear",
        atmosphere: "Formal and Trustworthy",
        context: "Annual corporate financial report",
        correctAnswer: "Times New Roman",
        explanation: "Times New Roman is a classic, professional serif font that conveys authority and trust, perfect for business documents.",
        options: [
          { fontName: "Times New Roman", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Comic Sans MS", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Jokerman", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Curlz MT", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Fitness Gym Poster",
        theme: "Bold and Energetic",
        atmosphere: "Motivational and Strong",
        context: "New Year gym membership promotion",
        correctAnswer: "Impact",
        explanation: "Impact is a bold, strong font that conveys power and energy, making it perfect for fitness and sports marketing.",
        options: [
          { fontName: "Impact", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Garamond", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Brush Script", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Book Antiqua", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Coffee Shop Menu Board",
        theme: "Cozy and Artisanal",
        atmosphere: "Warm and Authentic",
        context: "Handcrafted specialty coffee shop",
        correctAnswer: "Handwritten/Script Font",
        explanation: "Handwritten or script fonts create a personal, artisanal feel that matches the handcrafted nature of specialty coffee.",
        options: [
          { fontName: "Handwritten/Script Font", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Arial Black", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Courier New", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Tahoma", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Email Newsletter",
        theme: "Friendly and Readable",
        atmosphere: "Approachable and Clear",
        context: "Monthly company newsletter to employees",
        correctAnswer: "Arial",
        explanation: "Arial is a clean, highly readable sans-serif that renders well on screens and is universally accessible for email.",
        options: [
          { fontName: "Arial", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Blackletter", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Stencil", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Mistral", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Blog Post Content",
        theme: "Readable and Comfortable",
        atmosphere: "Relaxed and Informative",
        context: "Long-form article about travel experiences",
        correctAnswer: "Lora/Merriweather",
        explanation: "Serif fonts like Lora or Merriweather are designed for comfortable reading of long-form content on screens.",
        options: [
          { fontName: "Lora/Merriweather", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Wide Latin", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Broadway", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Cooper Black", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Product Label",
        theme: "Simple and Informative",
        atmosphere: "Clean and Trustworthy",
        context: "Organic food packaging",
        correctAnswer: "Helvetica",
        explanation: "Helvetica is neutral, clean, and highly legible, making it perfect for product labels where clarity is essential.",
        options: [
          { fontName: "Helvetica", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Chiller", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Curlz MT", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Jokerman", fontImage: TEMP_FONT_IMAGE }
        ]
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection Challenge: Medium",
    description: "Master font selection for more nuanced design scenarios!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "medium",
    gameType: "fontselection",
    questions: [
      {
        questionText: "Select the most appropriate font",
        purpose: "Luxury Fashion Brand Logo",
        theme: "High-End and Exclusive",
        atmosphere: "Sophisticated and Minimalist",
        context: "Premium designer clothing brand targeting affluent customers",
        correctAnswer: "Didot/Bodoni",
        explanation: "Didot and Bodoni are elegant serif fonts with high contrast and refined details, perfect for luxury fashion branding.",
        options: [
          { fontName: "Didot/Bodoni", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Comic Sans MS", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Papyrus", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Cooper Black", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Law Firm Website",
        theme: "Traditional and Authoritative",
        atmosphere: "Professional and Established",
        context: "Century-old law firm specializing in corporate law",
        correctAnswer: "Garamond/Baskerville",
        explanation: "Classic serif fonts like Garamond or Baskerville convey tradition, authority, and professionalism ideal for legal services.",
        options: [
          { fontName: "Garamond/Baskerville", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Brush Script", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Impact", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Bauhaus", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Music Festival Poster",
        theme: "Energetic and Bold",
        atmosphere: "Exciting and Youthful",
        context: "Electronic dance music festival for young adults",
        correctAnswer: "Display/Decorative Font",
        explanation: "Bold, decorative display fonts capture attention and convey the energetic, creative atmosphere of music festivals.",
        options: [
          { fontName: "Display/Decorative Font", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Times New Roman", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Calibri", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Georgia", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Science Journal Article",
        theme: "Academic and Precise",
        atmosphere: "Formal and Scholarly",
        context: "Peer-reviewed research publication",
        correctAnswer: "Computer Modern/Latin Modern",
        explanation: "Computer Modern and Latin Modern are the standard fonts for academic and scientific publications, ensuring precision and readability.",
        options: [
          { fontName: "Computer Modern/Latin Modern", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Freestyle Script", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Magneto", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Ravie", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Vintage Barbershop Sign",
        theme: "Classic and Masculine",
        atmosphere: "Nostalgic and Traditional",
        context: "Old-school barber shop with 1920s theme",
        correctAnswer: "Rockwell/Clarendon",
        explanation: "Slab serif fonts like Rockwell convey strength, masculinity, and vintage charm perfect for traditional barbershops.",
        options: [
          { fontName: "Rockwell/Clarendon", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Lucida Handwriting", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Segoe UI", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Century Gothic", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Mobile Banking App Interface",
        theme: "Modern and Trustworthy",
        atmosphere: "Secure and User-Friendly",
        context: "Digital banking app for millennials",
        correctAnswer: "San Francisco/Roboto",
        explanation: "System fonts like San Francisco (iOS) and Roboto (Android) ensure consistency, readability, and trust in mobile interfaces.",
        options: [
          { fontName: "San Francisco/Roboto", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Old English", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Algerian", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Stencil", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Eco-Friendly Product Packaging",
        theme: "Natural and Organic",
        atmosphere: "Sustainable and Authentic",
        context: "Zero-waste personal care products",
        correctAnswer: "Avenir/Brandon Grotesque",
        explanation: "Clean, geometric sans-serifs with humanist qualities convey modernity and natural simplicity ideal for eco-brands.",
        options: [
          { fontName: "Avenir/Brandon Grotesque", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Showcard Gothic", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Harrington", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Elephant", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Horror Movie Poster",
        theme: "Dark and Unsettling",
        atmosphere: "Eerie and Suspenseful",
        context: "Psychological thriller film marketing",
        correctAnswer: "Distressed/Gothic Font",
        explanation: "Distressed or gothic fonts create unease and tension, perfect for horror and thriller genres.",
        options: [
          { fontName: "Distressed/Gothic Font", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Candara", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Comic Sans MS", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Calibri", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Art Gallery Exhibition Catalog",
        theme: "Refined and Contemporary",
        atmosphere: "Artistic and Sophisticated",
        context: "Modern art museum exhibition",
        correctAnswer: "Futura/Avant Garde",
        explanation: "Geometric sans-serifs like Futura convey modernity, precision, and artistic sophistication ideal for contemporary art contexts.",
        options: [
          { fontName: "Futura/Avant Garde", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Kristen ITC", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Courier New", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Tempus Sans ITC", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Real Estate Brochure",
        theme: "Upscale and Trustworthy",
        atmosphere: "Professional and Aspirational",
        context: "Luxury property development marketing",
        correctAnswer: "Proxima Nova/Gotham",
        explanation: "Modern, professional sans-serifs like Proxima Nova project trustworthiness and sophistication for premium real estate.",
        options: [
          { fontName: "Proxima Nova/Gotham", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Jokerman", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Snap ITC", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Vladimir Script", fontImage: TEMP_FONT_IMAGE }
        ]
      }
    ],
    isActive: true
  },
  {
    title: "Font Selection Challenge: Hard",
    description: "Expert-level font selection for complex design scenarios!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png",
    difficulty: "hard",
    gameType: "fontselection",
    questions: [
      {
        questionText: "Select the most appropriate font",
        purpose: "Financial Times Newspaper Redesign",
        theme: "Authoritative and Traditional",
        atmosphere: "Serious and Established",
        context: "Century-old financial newspaper maintaining heritage while modernizing",
        correctAnswer: "Financier/Charter",
        explanation: "Serif fonts designed for financial publishing like Financier balance traditional authority with modern readability for extended reading.",
        options: [
          { fontName: "Financier/Charter", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Bauhaus 93", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Curlz MT", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Marker Felt", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Pharmaceutical Drug Information Leaflet",
        theme: "Clear and Medical",
        atmosphere: "Trustworthy and Legible",
        context: "Critical health information for diverse age groups",
        correctAnswer: "Univers/Frutiger",
        explanation: "Swiss sans-serifs like Univers and Frutiger were designed for maximum legibility and clarity, essential for medical information.",
        options: [
          { fontName: "Univers/Frutiger", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Broadway", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Pristina", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Magneto", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Michelin-Star Restaurant Identity",
        theme: "Elegant and Exclusive",
        atmosphere: "Refined and Premium",
        context: "Three-star fine dining establishment with French cuisine",
        correctAnswer: "Didot/Sabon",
        explanation: "High-contrast classic serifs like Didot convey luxury, refinement, and French sophistication appropriate for haute cuisine.",
        options: [
          { fontName: "Didot/Sabon", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Impact", fontImage: TEMP_FONT_IMAGE },
          { fontName: "OCR A", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Stencil", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "University Press Academic Book",
        theme: "Scholarly and Classical",
        atmosphere: "Intellectual and Timeless",
        context: "Philosophy monograph for academic audience",
        correctAnswer: "Bembo/Caslon",
        explanation: "Renaissance humanist serifs like Bembo and Caslon have centuries of use in scholarly publishing and convey intellectual gravitas.",
        options: [
          { fontName: "Bembo/Caslon", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Playbill", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Chiller", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Algerian", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Japanese Whisky Brand Identity",
        theme: "Premium and Cultural",
        atmosphere: "Traditional yet Modern",
        context: "Luxury Japanese whisky competing globally",
        correctAnswer: "Minion Pro/Trajan",
        explanation: "Refined serifs that balance Eastern restraint with Western luxury appeal, like Minion or Trajan, bridge cultural sophistication.",
        options: [
          { fontName: "Minion Pro/Trajan", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Comic Sans MS", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Hobo Std", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Kristen ITC", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Aerospace Engineering Manual",
        theme: "Technical and Precise",
        atmosphere: "Scientific and Authoritative",
        context: "Critical technical documentation for aircraft maintenance",
        correctAnswer: "DIN/Interstate",
        explanation: "Technical fonts like DIN were designed for engineering documentation, ensuring clarity and precision in technical contexts.",
        options: [
          { fontName: "DIN/Interstate", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Brush Script", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Mistral", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Viner Hand ITC", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Literary Fiction Book Cover",
        theme: "Artistic and Contemplative",
        atmosphere: "Sophisticated and Evocative",
        context: "Award-winning literary novel for adult readers",
        correctAnswer: "Mrs Eaves/Hoefler Text",
        explanation: "Refined transitional serifs like Mrs Eaves combine elegance with readability, perfect for literary fiction that values aesthetics.",
        options: [
          { fontName: "Mrs Eaves/Hoefler Text", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Wide Latin", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Elephant", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Showcard Gothic", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Swiss Watch Brand Campaign",
        theme: "Precision and Luxury",
        atmosphere: "Timeless and Impeccable",
        context: "Heritage watchmaker emphasizing craftsmanship",
        correctAnswer: "Akzidenz Grotesk/Helvetica",
        explanation: "Swiss neo-grotesques like Akzidenz represent precision, neutrality, and timeless design—core values of Swiss watchmaking.",
        options: [
          { fontName: "Akzidenz Grotesk/Helvetica", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Papyrus", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Rage Italic", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Ravie", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Museum Wayfinding System",
        theme: "Clear and Accessible",
        atmosphere: "Universal and Functional",
        context: "International art museum with diverse visitors",
        correctAnswer: "Gill Sans/Johnston",
        explanation: "Humanist sans-serifs like Gill Sans combine excellent legibility with warmth, ideal for public wayfinding systems.",
        options: [
          { fontName: "Gill Sans/Johnston", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Old English Text", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Blackadder ITC", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Harrington", fontImage: TEMP_FONT_IMAGE }
        ]
      },
      {
        questionText: "Select the most appropriate font",
        purpose: "Investment Bank Annual Report",
        theme: "Corporate and Conservative",
        atmosphere: "Serious and Trustworthy",
        context: "Fortune 500 financial institution shareholder report",
        correctAnswer: "FF Meta/The Sans",
        explanation: "Professional, neutral sans-serifs like FF Meta project corporate stability and modernity without drawing attention away from data.",
        options: [
          { fontName: "FF Meta/The Sans", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Freestyle Script", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Jokerman", fontImage: TEMP_FONT_IMAGE },
          { fontName: "Snap ITC", fontImage: TEMP_FONT_IMAGE }
        ]
      }
    ],
    isActive: true
  }
];

const seedFontSelectionGames = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing font selection games
    await Game.deleteMany({ gameType: "fontselection" });
    console.log("🗑️  Cleared existing font selection games");

    // Insert new games
    const insertedGames = await Game.insertMany(fontSelectionGames);
    console.log(`✅ Successfully seeded ${insertedGames.length} font selection games:`);
    insertedGames.forEach(game => {
      console.log(`   - ${game.title} (${game.difficulty}) - ${game.questions.length} questions`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding font selection games:", error);
    process.exit(1);
  }
};

seedFontSelectionGames();