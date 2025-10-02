const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();

// Allowed origins: local + deployed frontend
const allowedOrigins = [
  "http://localhost:5173",                // local dev
  process.env.FRONTEND_URL,               // e.g. https://type-venture.vercel.app
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    // Check against allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error("❌ CORS blocked request from:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
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
