import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import lessonsRoutes from "./routes/lessons.js";
import gameRoutes from "./routes/games.js";
import adminRoutes from "./routes/admin.js";
import articleRoutes from "./routes/articles.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://type-venture.vercel.app",
  /\.trycloudflare\.com$/
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(allowed =>
      typeof allowed === "string" ? allowed === origin : allowed.test(origin)
    );
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "ngx-skip-browser-warning"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`📥 ${new Date().toISOString()}`);
  console.log(`${req.method} ${req.url}`);
  console.log(`${"=".repeat(50)}\n`);
  next();
});

console.log("🔧 Registering routes...");
app.use("/api/user",     userRoutes);    console.log("✅ User routes registered");
app.use("/api/lessons",  lessonsRoutes); console.log("✅ Lessons routes registered");
app.use("/api/games",    gameRoutes);    console.log("✅ Game routes registered");
app.use("/api/admin",    adminRoutes);   console.log("✅ Admin routes registered");
app.use("/api/articles", articleRoutes); console.log("✅ Article routes registered");

app.get("/", (req, res) => {
  res.json({ status: "running", message: "API is running..." });
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Server is responding", timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found", method: req.method, path: req.url });
});

app.use((err, req, res, next) => {
  console.error("💥 Error occurred:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

console.log("✨ App configuration complete");
export default app;