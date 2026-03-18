import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers, toggleUserStatus } from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DEFAULT_PROFILE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(null); // { user, action }
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchAllUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async () => {
    if (!modal) return;
    setProcessing(true);
    try {
      const res = await toggleUserStatus(modal.user._id);
      setUsers(prev => prev.map(u => u._id === modal.user._id ? res.user : u));
      setModal(null);
    } catch (e) {
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="admin-section-wrapper">

        <button className="admin-back-btn" onClick={() => navigate("/admin")}>
          ← Back to Admin
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">Manage Users</h1>
          <p className="admin-page-sub">{users.length} total users</p>
        </div>

        {loading ? (
          <div className="admin-loading">Loading users…</div>
        ) : (
          <div className="admin-cards-grid">
            {users.map(user => (
              <div key={user._id} className="admin-user-card">
                <img
                  src={user.profilePicture || DEFAULT_PROFILE}
                  alt={user.username}
                  className="admin-user-avatar"
                  onError={e => { e.target.src = DEFAULT_PROFILE; }}
                />
                <span className="admin-user-name">{user.username}</span>
                <span className="admin-user-role">{user.userrole}</span>
                <span className="admin-user-email">{user.email}</span>
                <span className={`admin-user-status ${user.status || "active"}`}>
                  {user.status || "active"}
                </span>

                <div className="admin-card-actions" style={{ padding: 0, marginTop: 10, width: "100%" }}>
                  <button
                    className="admin-btn-details"
                    onClick={() => navigate(`/adminusers/${user._id}`)}
                  >
                    Details
                  </button>
                  <button
                    className={`admin-btn-toggle ${user.status === "deactivated" ? "deactivated-status" : "active-status"}`}
                    onClick={() => setModal({ user, action: user.status === "deactivated" ? "activate" : "deactivate" })}
                  >
                    {user.status === "deactivated" ? "Activate" : "Deactivate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Confirmation Modal */}
        {modal && (
          <div className="admin-modal-backdrop" onClick={() => setModal(null)}>
            <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
              <div className="admin-modal-emoji">
                {modal.action === "deactivate" ? "⚠️" : "✅"}
              </div>
              <h2 className="admin-modal-title">
                {modal.action === "deactivate" ? "Deactivate User?" : "Activate User?"}
              </h2>
              <p className="admin-modal-text">
                Are you sure you want to <strong>{modal.action}</strong>{" "}
                <strong>{modal.user.username}</strong>?
                {modal.action === "deactivate" && " They will no longer be able to log in."}
              </p>
              <div className="admin-modal-actions">
                <button
                  className="admin-modal-confirm-btn"
                  onClick={handleToggle}
                  disabled={processing}
                >
                  {processing ? "Processing…" : "Confirm"}
                </button>
                <button className="admin-modal-cancel-btn" onClick={() => setModal(null)}>
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

export default AdminUsers;