import api from "./axiosConfig";

// ─── Dashboard ───────────────────────────
export const fetchAdminStats = async () => {
  const res = await api.get("/api/admin/stats");
  return res.data;
};

export const fetchLessonCompletionsGraph = async (startDate, endDate) => {
  const res = await api.get("/api/admin/graph/completions", { params: { startDate, endDate } });
  return res.data;
};

export const fetchLoginsGraph = async (startDate, endDate) => {
  const res = await api.get("/api/admin/graph/logins", { params: { startDate, endDate } });
  return res.data;
};

export const fetchTodayRegistrants = async (page = 1, limit = 5) => {
  const res = await api.get("/api/admin/registrants/today", { params: { page, limit } });
  return res.data;
};

// ─── Users ───────────────────────────────
export const fetchAllUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

export const fetchUserDetail = async (userId) => {
  const res = await api.get(`/api/admin/users/${userId}`);
  return res.data;
};

export const toggleUserStatus = async (userId) => {
  const res = await api.patch(`/api/admin/users/${userId}/toggle`);
  return res.data;
};

export const updateUserRole = async (userId, role) => {
  const res = await api.patch(`/api/admin/users/${userId}/role`, { role });
  return res.data;
};

// ─── Lessons ─────────────────────────────
export const adminFetchAllLessons = async () => {
  const res = await api.get("/api/admin/lessons");
  return res.data;
};

export const adminFetchLessonById = async (id) => {
  const res = await api.get(`/api/admin/lessons/${id}`);
  return res.data;
};

export const adminCreateLesson = async (data) => {
  const res = await api.post("/api/admin/lessons", data);
  return res.data;
};

export const adminUpdateLesson = async (id, data) => {
  const res = await api.put(`/api/admin/lessons/${id}`, data);
  return res.data;
};

export const adminDeleteLesson = async (id) => {
  const res = await api.delete(`/api/admin/lessons/${id}`);
  return res.data;
};

// ─── Articles ────────────────────────────
export const adminFetchAllArticles = async () => {
  const res = await api.get("/api/admin/articles");
  return res.data;
};

export const adminFetchArticleById = async (id) => {
  const res = await api.get(`/api/admin/articles/${id}`);
  return res.data;
};

export const adminCreateArticle = async (data) => {
  const res = await api.post("/api/admin/articles", data);
  return res.data;
};

export const adminUpdateArticle = async (id, data) => {
  const res = await api.put(`/api/admin/articles/${id}`, data);
  return res.data;
};

export const adminDeleteArticle = async (id) => {
  const res = await api.delete(`/api/admin/articles/${id}`);
  return res.data;
};

// ─── Games ───────────────────────────────
export const adminFetchAllGames = async () => {
  const res = await api.get("/api/admin/games");
  return res.data;
};

export const adminFetchGameById = async (id) => {
  const res = await api.get(`/api/admin/games/${id}`);
  return res.data;
};

export const adminCreateGame = async (data) => {
  const res = await api.post("/api/admin/games", data);
  return res.data;
};

export const adminUpdateGame = async (id, data) => {
  const res = await api.put(`/api/admin/games/${id}`, data);
  return res.data;
};

export const adminDeleteGame = async (id) => {
  const res = await api.delete(`/api/admin/games/${id}`);
  return res.data;
};

// ─── Cloudinary Upload ───────────────────
export const adminUploadImage = async (imageData, folder) => {
  const res = await api.post("/api/admin/upload", { imageData, folder });
  return res.data;
};

// ─── PDF Report Data ─────────────────────
export const fetchPdfUsersData = async () => {
  const res = await api.get("/api/admin/pdf/users");
  return res.data;
};

export const fetchPdfLessonsData = async () => {
  const res = await api.get("/api/admin/pdf/lessons");
  return res.data;
};

export const fetchPdfGamesData = async () => {
  const res = await api.get("/api/admin/pdf/games");
  return res.data;
};