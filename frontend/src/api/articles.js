import api from "./axiosConfig";

// Fetch all articles (public — no token needed)
export const fetchAllArticles = async () => {
  try {
    const response = await api.get("/api/articles");
    return response.data;
  } catch (error) {
    console.error("Error in fetchAllArticles:", error);
    throw error;
  }
};

// Fetch single article by ID (public — no token needed)
export const fetchArticleById = async (id) => {
  try {
    const response = await api.get(`/api/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchArticleById:", error);
    throw error;
  }
};