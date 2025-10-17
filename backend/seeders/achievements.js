import mongoose from "mongoose";
import dotenv from "dotenv";
import Achievement from "../models/achievements.js";

// Load environment variables
dotenv.config();

// Achievement data with the sample lesson ID and Cloudinary image URLs
const achievementData = [
  {
    lessonId: "68e3fa7ee6981fcb7ccf5ef1", // Sample lesson ID provided
    levels: [
      {
        tier: "bronze",
        minScore: 60,
        maxScore: 69,
        imageUrl: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1760624876/bronze_medal_zwcpqc.png"
      },
      {
        tier: "silver",
        minScore: 70,
        maxScore: 89,
        imageUrl: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1760624626/silver_medal_wrn4hi.png"
      },
      {
        tier: "gold",
        minScore: 90,
        maxScore: 100,
        imageUrl: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1760624904/gold_medal_ftpbm0.png"
      }
    ]
  }
];

const seedAchievements = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    console.log("📍 MongoDB URI:", process.env.DB_URI ? "Found" : "Not found in .env");
    
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB successfully!");

    console.log("\n🗑️  Clearing existing achievements...");
    // Clear existing achievements for the specific lesson (optional)
    const deleteResult = await Achievement.deleteMany({ 
      lessonId: "68e3fa7ee6981fcb7ccf5ef1" 
    });
    console.log(`   Deleted ${deleteResult.deletedCount} existing achievement(s)`);

    console.log("\n📦 Inserting achievement data...");
    // Insert achievement data
    const inserted = await Achievement.insertMany(achievementData);
    console.log(`✅ Successfully seeded ${inserted.length} achievement configuration(s)!`);
    
    // Display created achievements with details
    console.log("\n🏆 Achievement Details:");
    console.log("═══════════════════════════════════════════════════════════");
    inserted.forEach((achievement, index) => {
      console.log(`\n📚 Achievement #${index + 1}`);
      console.log(`   Lesson ID: ${achievement.lessonId}`);
      console.log(`   Achievement ID: ${achievement._id}`);
      console.log(`   Created At: ${achievement.createdAt}`);
      console.log("\n   🎖️  Levels:");
      achievement.levels.forEach(level => {
        console.log(`\n      ${level.tier.toUpperCase()} Medal`);
        console.log(`      ├─ Score Range: ${level.minScore}-${level.maxScore} points`);
        console.log(`      └─ Image: ${level.imageUrl}`);
      });
    });
    console.log("\n═══════════════════════════════════════════════════════════");

    console.log("\n✨ Seeding completed successfully!");
    console.log("💡 Tip: You can now copy this pattern for other lessons");
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding achievements:");
    console.error("   Error message:", error.message);
    console.error("   Full error:", error);
    process.exit(1);
  }
};

// Run the seeder
console.log("🚀 Starting Achievement Seeder...\n");
seedAchievements();