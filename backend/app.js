const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// ✅ Enable CORS so React (usually on http://localhost:5173) can talk to backend
app.use(cors({
  origin: "http://localhost:5173", // frontend dev server
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Health check route (optional, for debugging)
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
