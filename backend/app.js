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
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("Body:", req.body);
  console.log("Files:", req.files || req.file);
  next();
});

// Routes
app.use("/api/user", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: "Route not found",
    method: req.method,
    path: req.url,
    availableRoutes: [
      "POST /api/user/register",
      "POST /api/user/login"
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

module.exports = app;