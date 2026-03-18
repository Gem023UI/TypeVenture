import Article from "../models/articles.js";

// GET all active articles (public — no auth required)
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isActive: true })
      .select("title subtitle author readTime featuredImage publishedAt")
      .sort({ publishedAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ getAllArticles error:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

// GET single article by ID (public — no auth required)
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id, isActive: true });

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error("❌ getArticleById error:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
};