import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";
import {
  getDashboardStats,
  getLessonCompletionsGraph,
  getLoginsGraph,
  getTodayRegistrants,
  getAllUsers,
  getUserDetail,
  toggleUserStatus,
  updateUserRole,
  adminGetAllLessons,
  adminGetLessonById,
  adminCreateLesson,
  adminUpdateLesson,
  adminDeleteLesson,
  adminGetAllArticles,
  adminGetArticleById,
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticle,
  adminGetAllGames,
  adminGetGameById,
  adminCreateGame,
  adminUpdateGame,
  adminDeleteGame,
  uploadImage,
  getPdfUsersData,
  getPdfLessonsData,
  getPdfGamesData,
} from "../controllers/admin.js";

const router = express.Router();

// All admin routes require token + admin role
router.use(verifyToken, verifyAdmin);

// Dashboard
router.get("/stats",               getDashboardStats);
router.get("/graph/completions",   getLessonCompletionsGraph);
router.get("/graph/logins",        getLoginsGraph);
router.get("/registrants/today",   getTodayRegistrants);

// Users
router.get("/users",               getAllUsers);
router.get("/users/:id",           getUserDetail);
router.patch("/users/:id/toggle",  toggleUserStatus);
router.patch("/users/:id/role",    updateUserRole);

// Lessons
router.get("/lessons",             adminGetAllLessons);
router.get("/lessons/:id",         adminGetLessonById);
router.post("/lessons",            adminCreateLesson);
router.put("/lessons/:id",         adminUpdateLesson);
router.delete("/lessons/:id",      adminDeleteLesson);

// Articles
router.get("/articles",            adminGetAllArticles);
router.get("/articles/:id",        adminGetArticleById);
router.post("/articles",           adminCreateArticle);
router.put("/articles/:id",        adminUpdateArticle);
router.delete("/articles/:id",     adminDeleteArticle);

// Games
router.get("/games",               adminGetAllGames);
router.get("/games/:id",           adminGetGameById);
router.post("/games",              adminCreateGame);
router.put("/games/:id",           adminUpdateGame);
router.delete("/games/:id",        adminDeleteGame);

// PDF Report Data
router.get("/pdf/users",   getPdfUsersData);
router.get("/pdf/lessons", getPdfLessonsData);
router.get("/pdf/games",   getPdfGamesData);

// Cloudinary upload
router.post("/upload",             uploadImage);

export default router;