import mongoose from "mongoose";

const lessonQuizSchema = new mongoose.Schema({
  lessonTitle:     { type: String, required: true },
  lessonScore:     { type: Number, required: true, default: 0 },
  lessonCompleted: { type: Boolean, default: false },
  completedAt:     { type: Date, default: Date.now },
}, { _id: false });

const userSchema = new mongoose.Schema({
  username:   { type: String, required: true, unique: true, trim: true },
  userrole: {type: String, required: true, default: "user"},
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },
  profilePicture: { type: String },
  token:      { type: String },
  hobbies:    { type: [String], default: [] },

  isVerified:              { type: Boolean, default: false },
  verificationCode:        { type: String },
  verificationCodeExpires: { type: Date },

  passwordResetCode:    { type: String },
  passwordResetExpires: { type: Date },

  /* quiz scores per lesson */
  lessonQuiz: [lessonQuizSchema],

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;