// models/Badge.js
import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  badgeName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  iconUrl: { type: String, default: "/badges/default.png" },
  criteria: {
    gameType: {
      type: String,
      enum: ["quiz", "kerning", "typography", "overall"],
      required: true
    },
    minScore: { type: Number, default: 0 },
    totalGamesRequired: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

badgeSchema.index({ "criteria.gameType": 1 });

export default mongoose.model("Badge", badgeSchema);
