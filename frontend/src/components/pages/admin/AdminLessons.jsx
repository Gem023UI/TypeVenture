import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetchAllLessons, adminDeleteLesson } from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DEFAULT_IMG = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

const AdminLessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    adminFetchAllLessons()
      .then(setLessons)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      await adminDeleteLesson(deleteModal._id);
      setLessons(prev => prev.filter(l => l._id !== deleteModal._id));
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
          <h1 className="admin-page-title">Lessons</h1>
          <p className="admin-page-sub">{lessons.length} lessons available</p>
        </div>

        <button
          className="admin-create-btn"
          onClick={() => navigate("/adminlessons/new")}
        >
          + Create Lesson
        </button>

        {loading ? (
          <div className="admin-loading">Loading lessons…</div>
        ) : (
          <div className="admin-cards-grid">
            {lessons.map(lesson => (
              <div key={lesson._id} className="admin-card">
                <img
                  src={lesson.lessonImage || DEFAULT_IMG}
                  alt={lesson.title}
                  className="admin-card-img"
                  onError={e => { e.target.src = DEFAULT_IMG; }}
                />
                <div className="admin-card-body">
                  <p className="admin-card-title">{lesson.title}</p>
                  <span className="admin-card-meta">{lesson.difficulty} · {lesson.completionTime}</span>
                </div>
                <div className="admin-card-actions">
                  <button
                    className="admin-btn-edit"
                    onClick={() => navigate(`/adminlessons/${lesson._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn-delete"
                    onClick={() => setDeleteModal(lesson)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal && (
          <div className="admin-modal-backdrop" onClick={() => setDeleteModal(null)}>
            <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
              <div className="admin-modal-emoji">🗑️</div>
              <h2 className="admin-modal-title">Delete Lesson?</h2>
              <p className="admin-modal-text">
                Are you sure you want to delete <strong>"{deleteModal.title}"</strong>?
                This will also remove it from all user records. This action cannot be undone.
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

export default AdminLessons;