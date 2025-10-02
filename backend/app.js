const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();

// ✅ Allowed origins: local dev + deployed frontend (from env variable)
const allowedOrigins = [
  "http://localhost:5173",                // local dev
  process.env.FRONTEND_URL                // e.g. https://your-frontend.vercel.app
].filter(Boolean); // removes undefined if FRONTEND_URL not set

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/user", userRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
