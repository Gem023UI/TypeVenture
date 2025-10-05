import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import validator from "validator";

// REGISTER
export const registerUser = async (req, res) => {
  console.log("🔵 Register endpoint hit");

  try {
    let { username, email, password } = req.body;

    // ✅ Basic username validation
    if (!username || username.length < 5) {
      return res.status(400).json({ error: "Username must be at least 5 characters long" });
    }

    // ✅ No spaces allowed
    if (/\s/.test(username)) {
      return res.status(400).json({ error: "Username cannot contain spaces" });
    }

    // ✅ Check if username already exists (case-insensitive)
    const existingUserByUsername = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    if (existingUserByUsername) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // ✅ Normalize & validate email
    email = validator.normalizeEmail(email);
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // ✅ Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // ✅ Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long and contain at least 1 symbol",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: "", // empty by default
    });

    await newUser.save();
    console.log("✅ User registered successfully:", username);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({
      error: "Registration failed",
      details: err.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  console.log("🔵 Login endpoint hit");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    // ✅ Store JWT in user document
    user.token = token;
    await user.save();

    // ✅ Send token and user info to front-end
    res.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({
      error: "Login failed",
      details: err.message,
    });
  }
};