import mongoose from "mongoose";
import Score from "./models/scores.js"; // Adjust path to your model
import dotenv from "dotenv";

dotenv.config();

const sampleScores = [
  {
    username: "john_doe",
    gameType: "quiz",
    lessonNumber: 1,
    score: 85,
    completedAt: new Date("2024-10-01")
  },
  {
    username: "john_doe",
    gameType: "typography",
    lessonNumber: 2,
    score: 92,
    completedAt: new Date("2024-10-02")
  },
  {
    username: "jane_smith",
    gameType: "quiz",
    lessonNumber: 1,
    score: 78,
    completedAt: new Date("2024-10-03")
  },
  {
    username: "jane_smith",
    gameType: "trial",
    lessonNumber: 3,
    score: 95,
    completedAt: new Date("2024-10-04")
  },
  {
    username: "typing_master",
    gameType: "typography",
    lessonNumber: 1,
    score: 100,
    completedAt: new Date("2024-10-05")
  },
  {
    username: "typing_master",
    gameType: "quiz",
    lessonNumber: 2,
    score: 88,
    completedAt: new Date("2024-10-06")
  },
  {
    username: "speed_demon",
    gameType: "trial",
    lessonNumber: 1,
    score: 75,
    completedAt: new Date("2024-10-07")
  },
  {
    username: "quiz_pro",
    gameType: "quiz",
    lessonNumber: 1,
    score: 98,
    completedAt: new Date("2024-10-08")
  }
];

const seedScores = async () => {
  await mongoose.connect(process.env.DB_URI);
  await Score.insertMany(sampleScores);
  console.log("✅ Seeded sample scores");
  process.exit(0);
};

seedScores();