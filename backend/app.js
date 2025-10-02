const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://type-venture.vercel.app"
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
