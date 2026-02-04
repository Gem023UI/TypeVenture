import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  token: { type: String },
  hobbies: { type: [String], default: [] },
  
  // Email verification fields
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  verificationCodeExpires: { type: Date },
  
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;