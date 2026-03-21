import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

// Replace each PLACEHOLDER_BG with the actual Cloudinary URL for that scenario once uploaded
const PLACEHOLDER_BG = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773966455/b60cffde-5955-4138-9404-70851fc8061c.png";

const lessons = [
  {
    title: "Lesson 9: The Font-Size Fortress",
    difficulty: "Advanced",
    completionTime: "~25 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797235/THE_FONT-SIZE_FORTRESS_ISLAND_flfmvc.png",
    youtubeUrl: "",
    description: "You arrive at the Fortress of Logistics, where the island's power grid is controlled. But the system manual on the screen is completely broken — every piece of text is the same size. Fix the visual hierarchy before the engineers lose the grid.",
    instruction: "Each scenario presents a broken document where all text elements are the same size (16px). Drag each text element to arrange them vertically from largest to smallest, then use the font-size slider to set each element to the correct size. The system will grade you on both accurate sizing and correct top-to-bottom hierarchy.",
    sections: [],
    quiz: [

      /* ═══════════════════════════════════════
         SCENARIO 1 — Emergency Manual
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "The Island Power Grid Emergency Manual has been flattened — every line is 16px. Drag and resize each element so engineers can instantly find the Emergency Shutoff.",
        correctAnswer: "correct",
        explanation: "Title (48px) anchors the document, Subtitle (24px) organizes sections, Body (16px) delivers detail, and Alert text demands immediate attention through bold uppercase treatment. Hierarchy saves lives in emergencies.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["title", "subtitle", "body", "alert"],
        textLayers: [
          {
            text:           "⚡ POWER GRID CONTROL SYSTEM",
            role:           "title",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Section 4: Emergency Procedures",
            role:           "subtitle",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#a3e0ff",
            targetCase:     "normal",
          },
          {
            text:           "To safely shut down the system, follow the steps below in order. Ensure all personnel are at a safe distance before proceeding.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "⚠ EMERGENCY SHUTOFF ACTIVATED",
            role:           "alert",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#ff4444",
            targetCase:     "uppercase",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 2 — Flash Sale Page
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "A flash sale page is failing to convert customers. The discount, product name, and price all look identical. Fix the hierarchy so shoppers immediately see the deal.",
        correctAnswer: "correct",
        explanation: "The discount (48px) must dominate as the hero element. Product name (28px) follows, then price (24px), then description (16px). Visual weight guides the eye to the most important selling point first.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["discount", "productName", "price", "description"],
        textLayers: [
          {
            text:           "🔥 70% OFF",
            role:           "discount",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#fbbf24",
            targetCase:     "normal",
          },
          {
            text:           "Wireless Noise-Cancelling Headphones",
            role:           "productName",
            targetFontSize: 28,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "₱1,499 (from ₱4,999)",
            role:           "price",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#a3e0ff",
            targetCase:     "normal",
          },
          {
            text:           "Experience immersive sound with long-lasting battery life and premium comfort.",
            role:           "description",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 3 — Breaking News Article
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "A major breaking news story is being ignored because all text looks the same. Fix the hierarchy so readers immediately grasp the urgency of the headline.",
        correctAnswer: "correct",
        explanation: "A bold headline (52px) stops the scroll. The subheadline (26px) adds context. Body (16px) delivers the story. Caption (12px) is a supporting detail. This is the foundation of editorial typography.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["headline", "subheadline", "body", "caption"],
        textLayers: [
          {
            text:           "Massive Earthquake Hits Coastal City",
            role:           "headline",
            targetFontSize: 52,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Thousands evacuated as rescue operations begin",
            role:           "subheadline",
            targetFontSize: 26,
            targetWeight:   "Medium",
            targetColor:    "#a3e0ff",
            targetCase:     "normal",
          },
          {
            text:           "A 7.8 magnitude earthquake struck early this morning, causing widespread damage and forcing residents to evacuate immediately.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "Rescue teams search through collapsed buildings",
            role:           "caption",
            targetFontSize: 12,
            targetWeight:   "Regular",
            targetColor:    "#9ca3af",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 4 — Food Delivery App
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "Users of a food delivery app are abandoning orders because the 'Order Now' button is visually lost. Establish hierarchy so the call-to-action is unmistakable.",
        correctAnswer: "correct",
        explanation: "The CTA (32px, Bold) is the most important action element and must dominate. Restaurant name (24px) establishes context, menu item (18px) shows what's ordered, and details (14px) provide supporting info.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["cta", "title", "subtitle", "caption"],
        textLayers: [
          {
            text:           "Order Now",
            role:           "cta",
            targetFontSize: 32,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Juan's Grill House",
            role:           "title",
            targetFontSize: 24,
            targetWeight:   "Bold",
            targetColor:    "#a3e0ff",
            targetCase:     "normal",
          },
          {
            text:           "Chicken Inasal Meal",
            role:           "subtitle",
            targetFontSize: 18,
            targetWeight:   "Medium",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "Served with rice, atchara, and unlimited soup",
            role:           "caption",
            targetFontSize: 14,
            targetWeight:   "Regular",
            targetColor:    "#9ca3af",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 5 — Online Lesson Module
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "Students are confused by an online lesson with no visual separation between sections. Establish a clear typographic structure so learners can follow the content flow.",
        correctAnswer: "correct",
        explanation: "The lesson title (48px) frames the entire module. Section headers (28px) divide topics clearly. Body (16px) delivers the lesson content. Key terms (bold) stand out as reference points without disrupting reading flow.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["title", "sectionHeader", "body", "keyTerms"],
        textLayers: [
          {
            text:           "Introduction to Typography",
            role:           "title",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Understanding Font Categories",
            role:           "sectionHeader",
            targetFontSize: 28,
            targetWeight:   "Medium",
            targetColor:    "#a3e0ff",
            targetCase:     "normal",
          },
          {
            text:           "Typography plays a crucial role in visual communication. It helps convey meaning, establish tone, and improve readability in design.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "Serif • Sans Serif • Display",
            role:           "keyTerms",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#fbbf24",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 6 — Prescription Guide
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "Patients are misreading a prescription guide because critical warnings blend in with regular text. Restructure the hierarchy to make warnings impossible to miss.",
        correctAnswer: "correct",
        explanation: "Warning text (Red, Bold, Uppercase) must stand apart from everything else — it carries the highest urgency. Dosage (20px Bold) is next in importance. Instructions (16px) deliver detail. Notes (14px) are supplementary.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["warning", "dosage", "instructions", "notes"],
        textLayers: [
          {
            text:           "⚠ TAKE ONLY AS PRESCRIBED",
            role:           "warning",
            targetFontSize: 20,
            targetWeight:   "Bold",
            targetColor:    "#ff4444",
            targetCase:     "uppercase",
          },
          {
            text:           "Take 1 tablet twice daily",
            role:           "dosage",
            targetFontSize: 20,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Drink plenty of water and take medication after meals to avoid stomach irritation.",
            role:           "instructions",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "Store in a cool, dry place",
            role:           "notes",
            targetFontSize: 14,
            targetWeight:   "Regular",
            targetColor:    "#9ca3af",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 7 — Hotel Directory Board
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "Hotel guests are wandering hallways because the directory board shows all information at the same visual weight. Fix the wayfinding hierarchy so guests find their rooms instantly.",
        correctAnswer: "correct",
        explanation: "Floor number (48px) is the primary navigation anchor — it must be seen from a distance. Room range (28px) provides the secondary filter. Direction (20px) gives the action step. Additional info (14px) supports without competing.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["floor", "roomRange", "direction", "info"],
        textLayers: [
          {
            text:           "Level 3",
            role:           "floor",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Rooms 301 – 320",
            role:           "roomRange",
            targetFontSize: 28,
            targetWeight:   "Medium",
            targetColor:    "#a3e0ff",
            targetCase:     "normal",
          },
          {
            text:           "← Left Wing",
            role:           "direction",
            targetFontSize: 20,
            targetWeight:   "Medium",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "Elevator and stairs available",
            role:           "info",
            targetFontSize: 14,
            targetWeight:   "Regular",
            targetColor:    "#9ca3af",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 8 — Concert Poster
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "A concert poster is failing to generate buzz because the artist name, date, and venue all fight for equal attention. Make the artist the undeniable star of the poster.",
        correctAnswer: "correct",
        explanation: "The artist name (50px Bold) is the hero — it's what people come to see. Date (28px) is the second decision point. Venue (22px) answers 'where'. Details (16px) fill in the rest. This is standard concert poster hierarchy.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["artist", "date", "venue", "details"],
        textLayers: [
          {
            text:           "The Midnight Waves",
            role:           "artist",
            targetFontSize: 50,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "April 18, 2026",
            role:           "date",
            targetFontSize: 28,
            targetWeight:   "Medium",
            targetColor:    "#a3e0ff",
            targetCase:     "normal",
          },
          {
            text:           "Manila Open Grounds",
            role:           "venue",
            targetFontSize: 22,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "Gates open at 6:00 PM",
            role:           "details",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#9ca3af",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 9 — Business Pitch Deck
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "Investors are losing focus during a startup pitch because all slide text looks equally important. Rebuild the hierarchy so the key insight dominates every slide.",
        correctAnswer: "correct",
        explanation: "The slide title (40px) sets the topic. The key point (26px) is the insight investors must remember. Supporting text (18px) provides the evidence. Footnotes (12px) offer sourcing without competing for attention.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["title", "keyPoint", "supporting", "footnote"],
        textLayers: [
          {
            text:           "Market Expansion Strategy",
            role:           "title",
            targetFontSize: 40,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Increase customer reach by 40%",
            role:           "keyPoint",
            targetFontSize: 26,
            targetWeight:   "Bold",
            targetColor:    "#fbbf24",
            targetCase:     "normal",
          },
          {
            text:           "By leveraging digital platforms and targeted marketing, the company can expand into new regions and attract a broader audience.",
            role:           "supporting",
            targetFontSize: 18,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "Data based on 2025 projections",
            role:           "footnote",
            targetFontSize: 12,
            targetWeight:   "Regular",
            targetColor:    "#9ca3af",
            targetCase:     "normal",
          },
        ],
      },

      /* ═══════════════════════════════════════
         SCENARIO 10 — Car Assembly Guide
      ═══════════════════════════════════════ */
      {
        type: "hierarchy-builder",
        question: "Assembly errors keep occurring because workers can't distinguish steps from warnings and tips. Establish a clear typographic hierarchy that prevents mistakes on the production floor.",
        correctAnswer: "correct",
        explanation: "Step numbers (32px Bold) are the primary navigation anchors — workers scan for them first. Instructions (18px) deliver the action. Warnings (Red Bold) must stand out to prevent damage or injury. Tips (14px) offer supplementary guidance.",
        canvasImage: PLACEHOLDER_BG,
        availableRoles: ["step", "instruction", "warning", "tips"],
        textLayers: [
          {
            text:           "Step 4",
            role:           "step",
            targetFontSize: 32,
            targetWeight:   "Bold",
            targetColor:    "#ffffff",
            targetCase:     "normal",
          },
          {
            text:           "Attach the front axle assembly to the chassis frame using M12 bolts.",
            role:           "instruction",
            targetFontSize: 18,
            targetWeight:   "Regular",
            targetColor:    "#d1d5db",
            targetCase:     "normal",
          },
          {
            text:           "⚠ DO NOT OVERTIGHTEN — risk of thread damage",
            role:           "warning",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#ff4444",
            targetCase:     "uppercase",
          },
          {
            text:           "Use a torque wrench set to 85 Nm for best results",
            role:           "tips",
            targetFontSize: 14,
            targetWeight:   "Regular",
            targetColor:    "#9ca3af",
            targetCase:     "normal",
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
    await Lesson.deleteMany({ title: /Lesson 9:/ });
    console.log("🗑️  Cleared existing Lesson 9");
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