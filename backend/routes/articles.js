import express from "express";
import { getAllArticles, getArticleById } from "../controllers/articles.js";

const router = express.Router();

// Public routes — no token required
router.get("/", getAllArticles);
router.get("/:id", getArticleById);

export default router;