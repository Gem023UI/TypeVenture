import mongoose from "mongoose";
import dotenv from "dotenv";
import Badge from "../models/badges.js"; // ✅ Ensure this matches your filename exactly (case-sensitive)

dotenv.config({ path: "./.env" });

const badgeImage =
  "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759657904/badge_kys4wo.png";

const badges = [
  {
    badgeName: "The Typo Newbie",
    description:
      "Every great designer starts with a single letter. Welcome to TypeVenture!",
    iconUrl: badgeImage,
    criteria: { gameType: "overall", minScore: 0 },
  },
  {
    badgeName: "Kerning Apprentice",
    description:
      "You’ve learned that even a pixel’s difference can define perfection.",
    iconUrl: badgeImage,
    criteria: { gameType: "kerning", minScore: 70 },
  },
  {
    badgeName: "Typographic Technician",
    description:
      "Your eye for rhythm and flow is sharper than ever.",
    iconUrl: badgeImage,
    criteria: { gameType: "typography", minScore: 70 },
  },
  {
    badgeName: "Color Sensei",
    description:
      "You see contrast not just in hues — but in harmony.",
    iconUrl: badgeImage,
    criteria: { gameType: "typography", minScore: 80 },
  },
  {
    badgeName: "Quiz Scholar",
    description:
      "You’ve proven your knowledge goes beyond design — it’s in your mind.",
    iconUrl: badgeImage,
    criteria: { gameType: "quiz", minScore: 90 },
  },
  {
    badgeName: "Consistent Climber",
    description:
      "Progress is your font of choice — bold, steady, and refined.",
    iconUrl: badgeImage,
    criteria: { gameType: "overall", minScore: 70, totalGamesRequired: 5 },
  },
  {
    badgeName: "Detail Detective",
    description:
      "You spot details others miss — the mark of a true typographer.",
    iconUrl: badgeImage,
    criteria: { gameType: "overall", totalGamesRequired: 3 },
  },
  {
    badgeName: "Type Virtuoso",
    description:
      "Precision, balance, and beauty — you’ve mastered the art of type.",
    iconUrl: badgeImage,
    criteria: { gameType: "overall", minScore: 90 },
  },
  {
    badgeName: "Journey Complete",
    description:
      "You’ve traversed the typographic landscape and emerged a master.",
    iconUrl: badgeImage,
    criteria: { gameType: "overall", totalGamesRequired: 10 },
  },
  {
    badgeName: "The Type Scholar",
    description:
      "Growth through practice — you’ve evolved from learner to leader.",
    iconUrl: badgeImage,
    criteria: { gameType: "overall", minScore: 0 },
  },
];

const seedBadges = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB Connected...");

    await Badge.deleteMany({});
    console.log("🧹 Cleared old badges");

    await Badge.insertMany(badges);
    console.log("🏅 Successfully seeded 10 badges into the database!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding badges:", error);
    process.exit(1);
  }
};

seedBadges();
