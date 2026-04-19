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
    const start = startDate ? new Date(startDate) : (() => { const d = new Date(); d.setDate(d.getDate() - 6); d.setHours(0,0,0,0); return d; })();
    const end   = endDate   ? new Date(endDate)   : (() => { const d = new Date(); d.setHours(23,59,59,999); return d; })();

    const lessons = await Lesson.find({ "usersDone.completedAt": { $gte: start, $lte: end } });

    // Count completions per day
    const counts = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      counts[d.toISOString().slice(0, 10)] = 0;
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
    const start = startDate ? new Date(startDate) : (() => { const d = new Date(); d.setDate(d.getDate() - 6); d.setHours(0,0,0,0); return d; })();
    const end   = endDate   ? new Date(endDate)   : (() => { const d = new Date(); d.setHours(23,59,59,999); return d; })();

    // We'll track updatedAt as a proxy for login activity
    const users = await User.find({ updatedAt: { $gte: start, $lte: end } });

    const counts = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      counts[d.toISOString().slice(0, 10)] = 0;
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
    if (!user) return res.status(404).json({ error: "User not found." });

    user.status = user.status === "deactivated" ? "active" : "deactivated";
    await user.save();

    return res.json({ message: "Status updated.", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to toggle user status." });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Must be 'user' or 'admin'." });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.userrole = role;
    await user.save();

    console.log(`✅ Role updated for ${user.username} → ${role}`);
    res.status(200).json({ message: `Role updated to ${role}`, user });
  } catch (error) {
    console.error("❌ updateUserRole error:", error);
    res.status(500).json({ error: "Failed to update user role" });
  }
};

// ─────────────────────────────────────────
// LESSON CRUD  (drop-in replacement for the lesson section of admin.js)
// ─────────────────────────────────────────

export const adminGetAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    res.status(200).json(lessons);
  } catch (error) {
    console.error("❌ adminGetAllLessons error:", error);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};

export const adminGetLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.status(200).json(lesson);
  } catch (error) {
    console.error("❌ adminGetLessonById error:", error);
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
};

export const adminCreateLesson = async (req, res) => {
  try {
    // Accept only the fields defined on the schema — never trust the client
    // to not send _id, usersDone, createdAt, etc.
    const {
      title,
      lessonImage,
      difficulty,
      completionTime,
      youtubeUrl,
      description,
      instruction,
      sections,
      quiz,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Lesson title is required." });
    }

    const lesson = new Lesson({
      title:          title.trim(),
      lessonImage:    lessonImage    || "",
      difficulty:     difficulty     || "Beginner",
      completionTime: completionTime || "~15 min",
      youtubeUrl:     youtubeUrl     || "",
      description:    description    || "",
      instruction:    instruction    || "",
      sections:       sections       || [],
      quiz:           quiz           || [],
    });

    await lesson.save();
    res.status(201).json({ message: "Lesson created", lesson });
  } catch (error) {
    console.error("❌ adminCreateLesson error:", error);
    res.status(500).json({ error: "Failed to create lesson", details: error.message });
  }
};

export const adminUpdateLesson = async (req, res) => {
  try {
    const {
      title,
      lessonImage,
      difficulty,
      completionTime,
      youtubeUrl,
      description,
      instruction,
      sections,
      quiz,
    } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ error: "Lesson title cannot be empty." });
    }

    // Only set the fields we explicitly allow — usersDone, createdAt, __v
    // are intentionally excluded so they can never be overwritten by the client.
    const updatePayload = {
      ...(title          !== undefined && { title: title.trim() }),
      ...(lessonImage    !== undefined && { lessonImage }),
      ...(difficulty     !== undefined && { difficulty }),
      ...(completionTime !== undefined && { completionTime }),
      ...(youtubeUrl     !== undefined && { youtubeUrl }),
      ...(description    !== undefined && { description }),
      ...(instruction    !== undefined && { instruction }),
      ...(sections       !== undefined && { sections }),
      ...(quiz           !== undefined && { quiz }),
    };

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { $set: updatePayload },
      { new: true, runValidators: true }
    );

    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.status(200).json({ message: "Lesson updated", lesson });
  } catch (error) {
    console.error("❌ adminUpdateLesson error:", error);
    res.status(500).json({ error: "Failed to update lesson", details: error.message });
  }
};

export const adminDeleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    // Best-effort cleanup — remove the lesson from users' quiz records.
    // If this fails we still return success (lesson is already deleted).
    try {
      await User.updateMany(
        { "lessonQuiz.lessonTitle": lesson.title },
        { $pull: { lessonQuiz: { lessonTitle: lesson.title } } }
      );
    } catch (cleanupErr) {
      console.error("⚠️ lessonQuiz cleanup failed (non-fatal):", cleanupErr);
    }

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

// ─────────────────────────────────────────
// PDF REPORT DATA
// ─────────────────────────────────────────

export const getPdfUsersData = async (req, res) => {
  try {
    const allUsers = await User.find().select("userrole createdAt").sort({ createdAt: 1 });

    const adminCount = allUsers.filter(u => u.userrole === "admin").length;
    const userCount  = allUsers.filter(u => u.userrole === "user").length;

    // Group registrations by date
    const countsByDate = {};
    allUsers.forEach(u => {
      const day = u.createdAt?.toISOString().slice(0, 10);
      if (day) countsByDate[day] = (countsByDate[day] || 0) + 1;
    });

    const labels = Object.keys(countsByDate);
    const data   = Object.values(countsByDate);

    res.status(200).json({ labels, data, adminCount, userCount, totalUsers: allUsers.length });
  } catch (error) {
    console.error("❌ getPdfUsersData error:", error);
    res.status(500).json({ error: "Failed to fetch users PDF data" });
  }
};

export const getPdfLessonsData = async (req, res) => {
  try {
    const lessons = await Lesson.find().select("title description usersDone").sort({ createdAt: 1 });
    const allUsers = await User.find().select("lessonQuiz");

    const lessonStats = lessons.map(lesson => {
      const completionCount = lesson.usersDone?.length || 0;

      // Collect scores for this lesson from all users
      const scores = [];
      allUsers.forEach(u => {
        const entry = u.lessonQuiz?.find(lq => lq.lessonTitle === lesson.title);
        if (entry && typeof entry.lessonScore === "number") scores.push(entry.lessonScore);
      });

      const avgScore = scores.length
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

      return {
        title:           lesson.title,
        description:     lesson.description,
        completionCount,
        avgScore,
      };
    });

    res.status(200).json({ lessonStats });
  } catch (error) {
    console.error("❌ getPdfLessonsData error:", error);
    res.status(500).json({ error: "Failed to fetch lessons PDF data" });
  }
};

export const getPdfGamesData = async (req, res) => {
  try {
    const games      = await Game.find().select("title gameType difficulty");
    const allScores  = await GameScore.find().populate("gameId", "gameType");

    // Games played per day
    const countsByDate = {};
    allScores.forEach(s => {
      const day = s.completedAt?.toISOString().slice(0, 10);
      if (day) countsByDate[day] = (countsByDate[day] || 0) + 1;
    });
    const dateLabels = Object.keys(countsByDate).sort();
    const dateData   = dateLabels.map(d => countsByDate[d]);

    // Players per game category
    const categoryMap = {};
    allScores.forEach(s => {
      const type = s.gameId?.gameType || "unknown";
      categoryMap[type] = (categoryMap[type] || 0) + 1;
    });
    const categoryLabels = Object.keys(categoryMap);
    const categoryData   = categoryLabels.map(c => categoryMap[c]);

    // Difficulty breakdown
    const easy   = games.filter(g => g.difficulty === "easy").length;
    const medium = games.filter(g => g.difficulty === "medium").length;
    const hard   = games.filter(g => g.difficulty === "hard").length;

    // Achievements
    const totalAchievements     = allScores.filter(s => s.achievement !== "none").length;
    const usersWithAchievements = new Set(
      allScores.filter(s => s.achievement !== "none").map(s => s.userId.toString())
    ).size;

    res.status(200).json({
      dateLabels,
      dateData,
      categoryLabels,
      categoryData,
      totalGames: games.length,
      easy, medium, hard,
      totalAchievements,
      usersWithAchievements,
    });
  } catch (error) {
    console.error("❌ getPdfGamesData error:", error);
    res.status(500).json({ error: "Failed to fetch games PDF data" });
  }
};