const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const validator = require("validator"); // npm install validator

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // --- VALIDATIONS ---
    if (!username || username.length < 5) {
      return res.status(400).json({ error: "Username must be at least 5 characters long" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Sanitize and validate email
    email = validator.normalizeEmail(email);
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Password strength: min 6 chars + at least 1 symbol
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Password must be at least 6 characters long and contain at least 1 symbol" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePictureUrl = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "TypeVenture/profile pictures",
        use_filename: true,
        unique_filename: false,
        resource_type: "image",
      });
      profilePictureUrl = uploadResult.secure_url;

      fs.unlinkSync(req.file.path); // remove temp file
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

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
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
