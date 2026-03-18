import User from "../models/user.js";
import Lesson from "../models/lessons.js";
import Game from "../models/games.js";
import GameScore from "../models/gameScore.js";
import Article from "../models/articles.js";
import cloudinary from "cloudinary";

// ─────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalLessons, totalArticles, totalGames] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments(),
      Article.countDocuments(),
      Game.countDocuments(),
    ]);

    res.status(200).json({ totalUsers, totalLessons, totalArticles, totalGames });
  } catch (error) {
    console.error("❌ getDashboardStats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

// ─────────────────────────────────────────
// GRAPH: lesson completions by date range
// ─────────────────────────────────────────

export const getLessonCompletionsGraph = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Build fixed date boundaries — never mutate these after creation
    const start = startDate
      ? new Date(`${startDate}T00:00:00.000Z`)
      : (() => { const d = new Date(); d.setUTCDate(d.getUTCDate() - 6); d.setUTCHours(0,0,0,0); return d; })();
    const end = endDate
      ? new Date(`${endDate}T23:59:59.999Z`)
      : (() => { const d = new Date(); d.setUTCHours(23,59,59,999); return d; })();

    const lessons = await Lesson.find({ "usersDone.completedAt": { $gte: start, $lte: end } });

    // Build counts map — use a fresh Date object for the loop, never touch start/end
    const counts = {};
    const cursor = new Date(start.getTime()); // clone so start is not mutated
    while (cursor <= end) {
      counts[cursor.toISOString().slice(0, 10)] = 0;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    lessons.forEach(lesson => {
      lesson.usersDone.forEach(entry => {
        const day = entry.completedAt?.toISOString().slice(0, 10);
        if (day && counts[day] !== undefined) counts[day]++;
      });
    });

    const labels = Object.keys(counts);
    const data   = Object.values(counts);

    res.status(200).json({ labels, data });
  } catch (error) {
    console.error("❌ getLessonCompletionsGraph error:", error);
    res.status(500).json({ error: "Failed to fetch lesson completion graph data" });
  }
};

// ─────────────────────────────────────────
// GRAPH: logins by date range
// ─────────────────────────────────────────

export const getLoginsGraph = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate
      ? new Date(`${startDate}T00:00:00.000Z`)
      : (() => { const d = new Date(); d.setUTCDate(d.getUTCDate() - 6); d.setUTCHours(0,0,0,0); return d; })();
    const end = endDate
      ? new Date(`${endDate}T23:59:59.999Z`)
      : (() => { const d = new Date(); d.setUTCHours(23,59,59,999); return d; })();

    const users = await User.find({ updatedAt: { $gte: start, $lte: end } });

    const counts = {};
    const cursor = new Date(start.getTime()); // clone so start is not mutated
    while (cursor <= end) {
      counts[cursor.toISOString().slice(0, 10)] = 0;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    users.forEach(user => {
      const day = user.updatedAt?.toISOString().slice(0, 10);
      if (day && counts[day] !== undefined) counts[day]++;
    });

    const labels = Object.keys(counts);
    const data   = Object.values(counts);

    res.status(200).json({ labels, data });
  } catch (error) {
    console.error("❌ getLoginsGraph error:", error);
    res.status(500).json({ error: "Failed to fetch logins graph data" });
  }
};

// ─────────────────────────────────────────
// TODAY'S REGISTRANTS (paginated)
// ─────────────────────────────────────────

export const getTodayRegistrants = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip  = (page - 1) * limit;

    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd   = new Date(); todayEnd.setHours(23, 59, 59, 999);

    const [users, total] = await Promise.all([
      User.find({ createdAt: { $gte: todayStart, $lte: todayEnd } })
          .select("username email userrole status profilePicture createdAt")
          .skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } }),
    ]);

    res.status(200).json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("❌ getTodayRegistrants error:", error);
    res.status(500).json({ error: "Failed to fetch today's registrants" });
  }
};

// ─────────────────────────────────────────
// USER MANAGEMENT
// ─────────────────────────────────────────

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -token -verificationCode -passwordResetCode").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ getAllUsers error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -token -verificationCode -passwordResetCode");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch achievements from game scores
    const scores = await GameScore.find({ userId: req.params.id }).populate("gameId", "title");

    // Fetch completed lessons with quiz scores
    const lessons = await Lesson.find({ "usersDone.userId": req.params.id }).select("title lessonImage");

    res.status(200).json({ user, scores, completedLessons: lessons });
  } catch (error) {
    console.error("❌ getUserDetail error:", error);
    res.status(500).json({ error: "Failed to fetch user detail" });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.status = user.status === "active" ? "deactivated" : "active";
    await user.save();

    res.status(200).json({ message: `User ${user.status}`, user });
  } catch (error) {
    console.error("❌ toggleUserStatus error:", error);
    res.status(500).json({ error: "Failed to update user status" });
  }
};

// ─────────────────────────────────────────
// LESSON CRUD
// ─────────────────────────────────────────

export const adminGetAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};

export const adminGetLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
};

export const adminCreateLesson = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json({ message: "Lesson created", lesson });
  } catch (error) {
    console.error("❌ adminCreateLesson error:", error);
    res.status(500).json({ error: "Failed to create lesson" });
  }
};

export const adminUpdateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.status(200).json({ message: "Lesson updated", lesson });
  } catch (error) {
    console.error("❌ adminUpdateLesson error:", error);
    res.status(500).json({ error: "Failed to update lesson" });
  }
};

export const adminDeleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    // Remove lesson references from users' lessonQuiz
    await User.updateMany(
      { "lessonQuiz.lessonTitle": lesson.title },
      { $pull: { lessonQuiz: { lessonTitle: lesson.title } } }
    );

    res.status(200).json({ message: "Lesson deleted" });
  } catch (error) {
    console.error("❌ adminDeleteLesson error:", error);
    res.status(500).json({ error: "Failed to delete lesson" });
  }
};

// ─────────────────────────────────────────
// ARTICLE CRUD
// ─────────────────────────────────────────

export const adminGetAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

export const adminGetArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch article" });
  }
};

export const adminCreateArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json({ message: "Article created", article });
  } catch (error) {
    console.error("❌ adminCreateArticle error:", error);
    res.status(500).json({ error: "Failed to create article" });
  }
};

export const adminUpdateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.status(200).json({ message: "Article updated", article });
  } catch (error) {
    console.error("❌ adminUpdateArticle error:", error);
    res.status(500).json({ error: "Failed to update article" });
  }
};

export const adminDeleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.status(200).json({ message: "Article deleted" });
  } catch (error) {
    console.error("❌ adminDeleteArticle error:", error);
    res.status(500).json({ error: "Failed to delete article" });
  }
};

// ─────────────────────────────────────────
// GAME CRUD
// ─────────────────────────────────────────

export const adminGetAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

export const adminGetGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game" });
  }
};

export const adminCreateGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json({ message: "Game created", game });
  } catch (error) {
    console.error("❌ adminCreateGame error:", error);
    res.status(500).json({ error: "Failed to create game" });
  }
};

export const adminUpdateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.status(200).json({ message: "Game updated", game });
  } catch (error) {
    console.error("❌ adminUpdateGame error:", error);
    res.status(500).json({ error: "Failed to update game" });
  }
};

export const adminDeleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: "Game not found" });

    // Remove associated scores
    await GameScore.deleteMany({ gameId: req.params.id });

    res.status(200).json({ message: "Game deleted" });
  } catch (error) {
    console.error("❌ adminDeleteGame error:", error);
    res.status(500).json({ error: "Failed to delete game" });
  }
};

// ─────────────────────────────────────────
// CLOUDINARY UPLOAD
// ─────────────────────────────────────────

export const uploadImage = async (req, res) => {
  try {
    const { folder, imageData } = req.body;

    if (!imageData || !folder) {
      return res.status(400).json({ error: "imageData and folder are required" });
    }

    const result = await cloudinary.v2.uploader.upload(imageData, {
      folder: `typeventure/${folder}`,
      resource_type: "image",
    });

    res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    console.error("❌ uploadImage error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};