import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { uploadToCloudinary } from "../utils/multer.js";
import User from "../models/user.js";
import { 
  generateVerificationCode, 
  sendVerificationEmail, 
  sendVerificationSuccessEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail
} from "../utils/emailVerify.js";

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password -token');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("📦 USER FETCHED:", user);

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        hobbies: user.hobbies,
        isVerified: user.isVerified,
        userrole: user.userrole,    
        createdAt: user.createdAt ? user.createdAt.toISOString() : null,
      },
    });
  } catch (err) {
    console.error("❌ Get user error:", err);
    res.status(500).json({
      error: "Failed to fetch user",
      details: err.message,
    });
  }
};

// REGISTER
export const registerUser = async (req, res) => {
  console.log("🔵 Register endpoint hit");

  try {
    let { username, email, password, userrole, profilePicture, hobbies } = req.body;

    if (!username || username.length < 5) {
      return res.status(400).json({ error: "Username must be at least 5 characters long" });
    }

    if (/\s/.test(username)) {
      return res.status(400).json({ error: "Username cannot contain spaces" });
    }

    const existingUserByUsername = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    if (existingUserByUsername) {
      return res.status(400).json({ error: "Username already taken" });
    }

    email = validator.normalizeEmail(email);
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?\":{}|<>]).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters and contain at least 1 symbol (e.g. ! @ # $)",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultProfilePicture = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759649430/user_icon_ze74ys.jpg";
    const defaultHobbies = ["None yet."];

    profilePicture = defaultProfilePicture;

    if (typeof hobbies === "string") {
      try {
        hobbies = JSON.parse(hobbies);
      } catch (e) {
        hobbies = defaultHobbies;
      }
    }

    if (!hobbies || !Array.isArray(hobbies) || hobbies.length === 0) {
      hobbies = defaultHobbies;
    }

    console.log("🔍 FINAL VALUES BEFORE SAVING:");
    console.log("  username:", username);
    console.log("  email:", email);
    console.log("  profilePicture:", profilePicture);
    console.log("  hobbies:", hobbies);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userrole: userrole || "user",
      profilePicture,
      hobbies,
    });

    await newUser.save();
      console.log("User registered successfully:", username);

      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
          hobbies: newUser.hobbies,
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
      return res.status(400).json({ error: "No existing email" });
    }

    // Block deactivated users from logging in
    if (user.status === "deactivated") {
      return res.status(403).json({
        error: "Your account has been deactivated. Please contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email, userrole: user.userrole },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    user.token = token;
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        hobbies: user.hobbies,
        isVerified: user.isVerified,
        userrole: user.userrole,
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

// EDIT PROFILE
export const editProfile = async (req, res) => {
  console.log("🟡 Incoming body fields:", req.body);

  try {
    const { userId, currentPassword, newPassword, hobbies, username, email } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }
      user.username = username;
      console.log("✅ Username updated to:", username);
    }

    if (req.body.email && req.body.email !== user.email) {
      const existingEmail = await User.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already in use" });
      }
      user.email = email;
      console.log("✅ Email updated to:", email);
    }

    if (newPassword && newPassword.trim() !== "") {
      if (!currentPassword || currentPassword.trim() === "") {
        return res.status(400).json({ error: "Current password is required to set new password" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          error: "New password must be at least 6 characters long and contain at least 1 symbol",
        });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      console.log("✅ Password updated");
    }

    if (hobbies !== undefined) {
      try {
        const parsedHobbies = typeof hobbies === "string" ? JSON.parse(hobbies) : hobbies;
        user.hobbies = Array.isArray(parsedHobbies) ? parsedHobbies : [];
        console.log("✅ Hobbies updated:", user.hobbies);
      } catch (e) {
        console.error("Error parsing hobbies:", e);
      }
    }

    if (req.file && req.file.buffer) {
      try {
        user.profilePicture = await uploadToCloudinary(
          req.file.buffer,
          req.file.mimetype,
          "typeventure/profile pictures"
        );
        console.log("✅ Profile picture updated:", user.profilePicture);
      } catch (uploadError) {
        console.error("❌ Cloudinary upload error:", uploadError);
        return res.status(500).json({
          error: "Failed to upload profile picture",
          details: uploadError.message,
        });
      }
    }

    await user.save();
    console.log("✅ Profile updated successfully:", user.username);

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        hobbies: user.hobbies,
      },
    });
  } catch (err) {
    console.error("❌ Edit profile error:", err);
    res.status(500).json({
      error: "Profile update failed",
      details: err.message,
    });
  }
};

// DEACTIVATE ACCOUNT
export const deleteAccount = async (req, res) => {
  console.log("🔴 Delete/Deactivate account endpoint hit");

  try {
    const { userId, username, password } = req.body;

    if (!userId || !username || !password) {
      return res.status(400).json({ 
        error: "User ID, username, and password are required" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.username !== username) {
      return res.status(400).json({ error: "Username does not match" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    // Deactivate instead of delete
    user.status = "deactivated";
    await user.save();
    console.log("✅ Account deactivated:", user.username);

    res.json({
      success: true,
      message: "Account deactivated successfully"
    });

  } catch (err) {
    console.error("❌ Deactivate account error:", err);
    res.status(500).json({
      error: "Account deactivation failed",
      details: err.message,
    });
  }
};

// SEND VERIFICATION CODE
export const sendVerificationCode = async (req, res) => {
  console.log("📧 Send verification code endpoint hit");
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = expiresAt;
    await user.save();
    await sendVerificationEmail(user.email, user.username, verificationCode);
    console.log("✅ Verification code sent to:", user.email);
    res.json({
      message: "Verification code sent to your email",
      expiresIn: "15 minutes"
    });
  } catch (err) {
    console.error("❌ Send verification code error:", err);
    res.status(500).json({
      error: "Failed to send verification code",
      details: err.message,
    });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  console.log("✅ Verify email endpoint hit");
  try {
    const { userId, code } = req.body;
    if (!userId || !code) {
      return res.status(400).json({ error: "User ID and verification code are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }
    if (!user.verificationCode) {
      return res.status(400).json({ error: "No verification code found. Please request a new code." });
    }
    if (new Date() > user.verificationCodeExpires) {
      return res.status(400).json({ error: "Verification code expired. Please request a new code." });
    }
    if (user.verificationCode !== code.trim()) {
      return res.status(400).json({ error: "Invalid verification code" });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();
    await sendVerificationSuccessEmail(user.email, user.username);
    console.log("✅ Email verified for:", user.email);
    res.json({
      message: "Email verified successfully!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("❌ Verify email error:", err);
    res.status(500).json({
      error: "Email verification failed",
      details: err.message,
    });
  }
};

// SEND PASSWORD RESET CODE
export const sendPasswordResetCode = async (req, res) => {
  console.log("🔑 Send password reset code endpoint hit");
  
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ 
        error: "No account found with this email address",
        accountExists: false
      });
    }
    
    const resetCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    
    user.passwordResetCode = resetCode;
    user.passwordResetExpires = expiresAt;
    await user.save();
    
    await sendPasswordResetEmail(user.email, user.username, resetCode);
    
    console.log("✅ Password reset code sent to:", user.email);
    
    res.json({
      message: "Password reset code sent to your email",
      email: user.email,
      expiresIn: "15 minutes"
    });
    
  } catch (err) {
    console.error("❌ Send password reset code error:", err);
    res.status(500).json({
      error: "Failed to send password reset code",
      details: err.message,
    });
  }
};

// VERIFY PASSWORD RESET CODE AND RESET PASSWORD
export const resetPassword = async (req, res) => {
  console.log("🔓 Reset password endpoint hit");
  
  try {
    const { email, code, newPassword } = req.body;
    
    if (!email || !code || !newPassword) {
      return res.status(400).json({ 
        error: "Email, code, and new password are required" 
      });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (!user.passwordResetCode) {
      return res.status(400).json({ 
        error: "No password reset code found. Please request a new code." 
      });
    }
    
    if (new Date() > user.passwordResetExpires) {
      return res.status(400).json({ 
        error: "Password reset code expired. Please request a new code." 
      });
    }
    
    if (user.passwordResetCode !== code.trim()) {
      return res.status(400).json({ error: "Invalid reset code" });
    }
    
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?\":{}|<>]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long and contain at least 1 symbol",
      });
    }
    
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();
    
    await sendPasswordResetSuccessEmail(user.email, user.username);
    
    console.log("✅ Password reset successfully for:", user.email);
    
    res.json({
      message: "Password reset successfully!",
      success: true
    });
    
  } catch (err) {
    console.error("❌ Reset password error:", err);
    res.status(500).json({
      error: "Password reset failed",
      details: err.message,
    });
  }
};