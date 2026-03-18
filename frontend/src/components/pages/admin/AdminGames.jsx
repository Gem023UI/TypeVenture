import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetchAllGames, adminDeleteGame } from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DEFAULT_IMG = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

const GAME_TYPE_LABELS = {
  kerning:         "Kerning",
  leading:         "Leading",
  "font-pairing":  "Font Pairing",
  "typeface-guess":"Typeface Guessing",
  "quiz":          "Quiz",
};

const AdminGames = () => {
  const navigate = useNavigate();
  const [games, setGames]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting]     = useState(false);

  useEffect(() => {
    adminFetchAllGames()
      .then(setGames)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      await adminDeleteGame(deleteModal._id);
      setGames(prev => prev.filter(g => g._id !== deleteModal._id));
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
          <h1 className="admin-page-title">Games</h1>
          <p className="admin-page-sub">{games.length} games available</p>
        </div>

        <button className="admin-create-btn" onClick={() => navigate("/admingames/new")}>
          + Create Game
        </button>

        {loading ? (
          <div className="admin-loading">Loading games…</div>
        ) : (
          <div className="admin-cards-grid">
            {games.map(game => (
              <div key={game._id} className="admin-card">
                <img
                  src={game.gameImage || DEFAULT_IMG}
                  alt={game.title}
                  className="admin-card-img"
                  onError={e => { e.target.src = DEFAULT_IMG; }}
                />
                <div className="admin-card-body">
                  <p className="admin-card-title">{game.title}</p>
                  <span className="admin-card-meta">
                    {GAME_TYPE_LABELS[game.gameType] || game.gameType} · {game.difficulty}
                  </span>
                </div>
                <div className="admin-card-actions">
                  <button
                    className="admin-btn-edit"
                    onClick={() => navigate(`/admingames/${game._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn-delete"
                    onClick={() => setDeleteModal(game)}
                  >
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
              <h2 className="admin-modal-title">Delete Game?</h2>
              <p className="admin-modal-text">
                Are you sure you want to delete <strong>"{deleteModal.title}"</strong>?
                All associated scores will also be removed. This action cannot be undone.
              </p>
              <div className="admin-modal-actions">
                <button
                  className="admin-modal-confirm-btn"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting…" : "Yes, Delete"}
                </button>
                <button className="admin-modal-cancel-btn" onClick={() => setDeleteModal(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default AdminGames;