import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetchAllArticles, adminDeleteArticle } from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DEFAULT_IMG = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

const AdminArticles = () => {
  const navigate = useNavigate();
  const [articles, setArticles]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting]     = useState(false);

  useEffect(() => {
    adminFetchAllArticles()
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      await adminDeleteArticle(deleteModal._id);
      setArticles(prev => prev.filter(a => a._id !== deleteModal._id));
      setDeleteModal(null);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <MainLayout>
      <div className="admin-section-wrapper">

        <button className="admin-back-btn" onClick={() => navigate("/admin")}>
          ← Back to Admin
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">Articles</h1>
          <p className="admin-page-sub">{articles.length} articles available</p>
        </div>

        <button className="admin-create-btn" onClick={() => navigate("/adminarticles/new")}>
          + Add Article
        </button>

        {loading ? (
          <div className="admin-loading">Loading articles…</div>
        ) : (
          <div className="admin-cards-grid">
            {articles.map(article => (
              <div key={article._id} className="admin-card">
                <img
                  src={article.featuredImage || DEFAULT_IMG}
                  alt={article.title}
                  className="admin-card-img"
                  onError={e => { e.target.src = DEFAULT_IMG; }}
                />
                <div className="admin-card-body">
                  <p className="admin-card-title">{article.title}</p>
                  <span className="admin-card-meta">{article.author} · {article.readTime}</span>
                </div>
                <div className="admin-card-actions">
                  <button className="admin-btn-edit" onClick={() => navigate(`/adminarticles/${article._id}`)}>
                    Edit
                  </button>
                  <button className="admin-btn-delete" onClick={() => setDeleteModal(article)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {deleteModal && (
          <div className="admin-modal-backdrop" onClick={() => setDeleteModal(null)}>
            <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
              <div className="admin-modal-emoji">🗑️</div>
              <h2 className="admin-modal-title">Delete Article?</h2>
              <p className="admin-modal-text">
                Are you sure you want to delete <strong>"{deleteModal.title}"</strong>? This action cannot be undone.
              </p>
              <div className="admin-modal-actions">
                <button className="admin-modal-confirm-btn" onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Deleting…" : "Yes, Delete"}
                </button>
                <button className="admin-modal-cancel-btn" onClick={() => setDeleteModal(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default AdminArticles;