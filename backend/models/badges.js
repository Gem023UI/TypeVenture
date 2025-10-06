import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  badgeName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  iconUrl: { type: String, required: true },
  criteria: {
    gameType: {
      type: String,
      enum: ["quiz", "typography", "trial"],
      required: true,
    },
    minScore: { type: Number, default: 0 },
    totalGamesRequired: { type: Number, default: 1 },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Badge", badgeSchema);
