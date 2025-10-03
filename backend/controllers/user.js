const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const validator = require("validator");

// REGISTER
exports.registerUser = async (req, res) => {
  console.log("🔵 Register endpoint hit");
  console.log("📦 Request body:", req.body);
  console.log("📁 File received:", req.file);

  try {
    let { username, email, password } = req.body;

    // --- VALIDATIONS ---
    if (!username || username.length < 5) {
      console.log("❌ Username validation failed");
      return res.status(400).json({ error: "Username must be at least 5 characters long" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("❌ Username already exists");
      return res.status(400).json({ error: "Username already taken" });
    }

    // Sanitize and validate email
    email = validator.normalizeEmail(email);
    if (!validator.isEmail(email)) {
      console.log("❌ Email validation failed");
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Password strength: min 6 chars + at least 1 symbol
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      console.log("❌ Password validation failed");
      return res.status(400).json({ 
        error: "Password must be at least 6 characters long and contain at least 1 symbol" 
      });
    }

    // hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePictureUrl = "";
    if (req.file) {
      console.log("📤 Uploading to Cloudinary...");
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "TypeVenture/profile pictures",
        use_filename: true,
        unique_filename: false,
        resource_type: "image",
      });
      profilePictureUrl = uploadResult.secure_url;
      console.log("✅ Uploaded:", profilePictureUrl);

      fs.unlinkSync(req.file.path); // remove temp file
    }

    console.log("💾 Saving user to database...");
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
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
      details: err.message 
    });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  console.log("🔵 Login endpoint hit");
  console.log("📦 Request body:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
    }

    // check user
    console.log("🔍 Looking up user:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // compare password
    console.log("🔐 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // generate token
    console.log("🎫 Generating JWT token...");
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    console.log("✅ Login successful:", user.username);
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
      details: err.message 
    });
  }
};