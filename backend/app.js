import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import lessonsRoutes from "./routes/lessons.js";
import gameRoutes from "./routes/games.js";

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

// app.options('*', cors()); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`📥 ${new Date().toISOString()}`);
  console.log(`${req.method} ${req.url}`);
  console.log(`Body:`, req.body);
  console.log(`Params:`, req.params);
  console.log(`${"=".repeat(50)}\n`);
  next();
});

// Routes - Order matters!
console.log("🔧 Registering routes...");
app.use("/api/user", userRoutes);
console.log("✅ User routes registered");

app.use("/api/lessons", lessonsRoutes);
console.log("✅ Lessons routes registered");

app.use("/api/games", gameRoutes);
console.log("✅ Game routes registered");

// Health check
app.get("/", (req, res) => {
  res.json({ 
    status: "running",
    message: "API is running...",
    endpoints: {
      user: "/api/user",
      lessons: "/api/lessons",
      games: "/api/games"
    }
  });
});

// Test endpoint to verify server is running
app.get("/api/test", (req, res) => {
  res.json({ 
    success: true,
    message: "Server is responding",
    timestamp: new Date().toISOString()
  });
});

// 404 handler - This catches unmatched routes
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: "Route not found",
    method: req.method,
    path: req.url,
    availableRoutes: [
      "POST /api/user/register",
      "POST /api/user/login",
      "POST /api/user/send-verification-code",
      "GET /api/test",
      "GET /api/lessons",
      "GET /api/games",
      "GET /api/games/:id",
      "POST /api/games/score",
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("💥 Error occurred:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

console.log("✨ App configuration complete");

export default app;