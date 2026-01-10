import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js"; // Adjust path based on your structure
import dotenv from "dotenv";

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing users (optional - remove if you want to keep existing data)
    await User.deleteMany({});
    console.log("🗑️ Cleared existing users");

    // Sample users data
    const users = [
      {
        username: "johndoe",
        email: "johndoe@example.com",
        password: "Password123!",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        password: "SecurePass456@",
      },
      {
        username: "alexsmith",
        email: "alexsmith@example.com",
        password: "MyPass789#",
      },
      {
        username: "maryjones",
        email: "maryjones@example.com",
        password: "StrongPass321$",
      },
      {
        username: "bobwilson",
        email: "bobwilson@example.com",
        password: "SafePass654%",
      },
    ];

    // Hash passwords and add default values
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        profilePicture: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759649430/user_icon_ze74ys.jpg",
        hobbies: ["Nothing yet."],
      }))
    );

    // Insert users into database
    await User.insertMany(hashedUsers);
    console.log("✅ Successfully seeded users:");
    hashedUsers.forEach((user) => {
      console.log(`   - ${user.username} (${user.email})`);
    });

    console.log("\n📊 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

// Run the seeder
seedUsers();