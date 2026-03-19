import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

const lessons = [
  {
    title: "Lesson 9: The Font-Size Fortress",
    difficulty: "Advanced",
    completionTime: "~25 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797235/THE_FONT-SIZE_FORTRESS_ISLAND_flfmvc.png",
    youtubeUrl: "",
    description: "You arrive at the Fortress of Logistics, where the island's power grid is controlled. But the system manual on the screen is completely broken — every piece of text is the same size. Fix the visual hierarchy before the engineers lose the grid.",
    instruction: "Each challenge presents a broken document where all text elements are the same size and weight — there is no visual hierarchy. Your job is to assign the correct role (Title, Subtitle, Body, or Alert) to each text element. Once all elements are correctly assigned, the hierarchy snaps into place and the document becomes readable. Assign carefully — the engineers are depending on you.",
    sections: [],
    quiz: [

      /* ─── Challenge 1: Emergency Manual ─── */
      {
        type: "hierarchy-builder",
        question: "The Island Power Grid Emergency Manual has been flattened — every line is 16px Regular. Assign the correct typographic role to each text element so engineers can find the Emergency Shutoff instantly.",
        correctAnswer: "correct",
        explanation: "A clear hierarchy makes critical information scannable. The Title anchors the document, Subtitles organize sections, Body delivers detail, and Alert text demands immediate attention through color and uppercase treatment.",
        availableRoles: ["title", "subtitle", "body", "alert"],
        textLayers: [
          {
            text:           "ISLAND POWER GRID EMERGENCY MANUAL",
            role:           "title",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#111111",
            targetCase:     "normal",
          },
          {
            text:           "System Overview",
            role:           "subtitle",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#333333",
            targetCase:     "normal",
          },
          {
            text:           "This manual provides instructions for managing the island's power grid. Follow all procedures carefully to maintain safe operations.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#555555",
            targetCase:     "normal",
          },
          {
            text:           "Safety Procedures",
            role:           "subtitle",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#333333",
            targetCase:     "normal",
          },
          {
            text:           "Always ensure all safety protocols are followed before performing any maintenance on the power system.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#555555",
            targetCase:     "normal",
          },
          {
            text:           "EMERGENCY SHUTOFF — ACTIVATE IMMEDIATELY",
            role:           "alert",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#dc2626",
            targetCase:     "uppercase",
          },
        ],
      },

      /* ─── Challenge 2: Festival Poster ─── */
      {
        type: "hierarchy-builder",
        question: "A music festival poster has been flattened — the headliner, supporting acts, date, and fine print all look identical. Restore the hierarchy so festivalgoers can read it in three seconds.",
        correctAnswer: "correct",
        explanation: "Visual hierarchy guides the reader's eye in order of importance. The headliner must dominate, supporting acts follow, the date gives context, and fine print stays subordinate.",
        availableRoles: ["title", "subtitle", "body", "alert"],
        textLayers: [
          {
            text:           "NEON HORIZON FESTIVAL 2025",
            role:           "title",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#111111",
            targetCase:     "normal",
          },
          {
            text:           "Featuring: The Static Waves · Luna Drift · Echo Park",
            role:           "subtitle",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#333333",
            targetCase:     "normal",
          },
          {
            text:           "Saturday, August 16 · Sunset Grounds, Manila · Doors open 5PM",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#555555",
            targetCase:     "normal",
          },
          {
            text:           "SOLD OUT — LAST TICKETS AT THE DOOR",
            role:           "alert",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#dc2626",
            targetCase:     "uppercase",
          },
        ],
      },

      /* ─── Challenge 3: App Onboarding Screen ─── */
      {
        type: "hierarchy-builder",
        question: "A mobile app onboarding screen has no hierarchy — the app name, feature headline, description, and warning notice are all the same size. Fix it so new users understand the screen instantly.",
        correctAnswer: "correct",
        explanation: "In UI design, hierarchy tells users what to read first. The app name establishes identity, the feature headline communicates value, body text explains detail, and alert text flags anything requiring action.",
        availableRoles: ["title", "subtitle", "body", "alert"],
        textLayers: [
          {
            text:           "TypeVenture",
            role:           "title",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#111111",
            targetCase:     "normal",
          },
          {
            text:           "Master Typography Through Play",
            role:           "subtitle",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#333333",
            targetCase:     "normal",
          },
          {
            text:           "Complete island challenges, earn points, and unlock the secrets of professional typography design — one lesson at a time.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#555555",
            targetCase:     "normal",
          },
          {
            text:           "VERIFY YOUR EMAIL TO UNLOCK ALL LESSONS",
            role:           "alert",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#dc2626",
            targetCase:     "uppercase",
          },
        ],
      },

      /* ─── Challenge 4: Restaurant Menu ─── */
      {
        type: "hierarchy-builder",
        question: "A restaurant menu has been printed with all text at the same size — the menu category, dish name, description, and allergen notice are indistinguishable. Fix the hierarchy.",
        correctAnswer: "correct",
        explanation: "Menu hierarchy guides the diner from category to dish to detail. The category title anchors the section, the dish name draws attention, body text describes the food, and alert text protects diners with important safety notices.",
        availableRoles: ["title", "subtitle", "body", "alert"],
        textLayers: [
          {
            text:           "MAIN COURSES",
            role:           "title",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#111111",
            targetCase:     "normal",
          },
          {
            text:           "Grilled Sea Bass with Citrus Butter",
            role:           "subtitle",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#333333",
            targetCase:     "normal",
          },
          {
            text:           "Pan-seared sea bass served on a bed of saffron risotto, finished with a lemon-caper butter sauce and micro herbs.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#555555",
            targetCase:     "normal",
          },
          {
            text:           "CONTAINS: FISH, DAIRY, GLUTEN",
            role:           "alert",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#dc2626",
            targetCase:     "uppercase",
          },
        ],
      },

      /* ─── Challenge 5: News Article ─── */
      {
        type: "hierarchy-builder",
        question: "A breaking news article has been formatted with no hierarchy — the headline, section subheading, article body, and breaking news label are all 16px Regular. Restore proper typographic order.",
        correctAnswer: "correct",
        explanation: "News hierarchy is the foundation of editorial design. The headline captures attention, subheadings organize the story, body text delivers the detail, and alert labels like 'BREAKING' signal urgency and news priority.",
        availableRoles: ["title", "subtitle", "body", "alert"],
        textLayers: [
          {
            text:           "Island Power Grid Restored After 12-Hour Outage",
            role:           "title",
            targetFontSize: 48,
            targetWeight:   "Bold",
            targetColor:    "#111111",
            targetCase:     "normal",
          },
          {
            text:           "Engineering Team Credits Typography Training Program",
            role:           "subtitle",
            targetFontSize: 24,
            targetWeight:   "Medium",
            targetColor:    "#333333",
            targetCase:     "normal",
          },
          {
            text:           "The island's power grid was fully restored at 3:42 AM after a team of engineers successfully identified the Emergency Shutoff protocol in the newly redesigned manual. Officials credit the clarity of the manual's visual hierarchy for enabling rapid response.",
            role:           "body",
            targetFontSize: 16,
            targetWeight:   "Regular",
            targetColor:    "#555555",
            targetCase:     "normal",
          },
          {
            text:           "BREAKING NEWS",
            role:           "alert",
            targetFontSize: 16,
            targetWeight:   "Bold",
            targetColor:    "#dc2626",
            targetCase:     "uppercase",
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
    await Lesson.deleteMany({ title: /Lesson IX/ });
    console.log("🗑️  Cleared existing Lesson IX");
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