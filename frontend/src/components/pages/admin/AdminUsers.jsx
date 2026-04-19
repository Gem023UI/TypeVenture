import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers, toggleUserStatus, updateUserRole, fetchPdfUsersData } from "../../../api/admin";
import { jsPDF } from "jspdf";
import {
  makeBarChart, addChart, checkBreak,
  drawHeader, drawSectionLabel, drawStatPills, drawAnalysis, drawDivider, drawFooter,
} from "./pdfUtils";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DEFAULT_PROFILE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";
const ROLES = ["user", "admin"];

// Normalize missing/undefined status to "active" so all comparisons are safe
const normalizeStatus = (status) => status === "deactivated" ? "deactivated" : "active";

/* ── Small inline dropdown component ── */
const RoleDropdown = ({ user, onRoleSelect }) => {
  const [open, setOpen]   = useState(false);
  const dropRef           = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (role) => {
    setOpen(false);
    if (role === user.userrole) return;
    onRoleSelect(user, role);
  };

  return (
    <div className="admin-role-dropdown" ref={dropRef}>
      <button
        className={`admin-role-trigger ${user.userrole}`}
        onClick={() => setOpen(o => !o)}
      >
        {user.userrole}
        <span className="admin-role-caret">▾</span>
      </button>

      {open && (
        <ul className="admin-role-menu">
          {ROLES.map(role => (
            <li
              key={role}
              className={`admin-role-option ${role === user.userrole ? "current" : ""}`}
              onClick={() => handleSelect(role)}
            >
              {role === user.userrole && <span className="admin-role-check">✓</span>}
              {role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ── Main component ── */
const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // Status toggle modal
  const [statusModal, setStatusModal]   = useState(null); // { user, action }
  const [processing, setProcessing]     = useState(false);

  // Role change modal
  const [roleModal, setRoleModal]       = useState(null); // { user, newRole }
  const [roleProcessing, setRoleProcessing] = useState(false);

  useEffect(() => {
    fetchAllUsers()
      .then(data => {
        // Normalize status on every user right after fetching
        setUsers(data.map(u => ({ ...u, status: normalizeStatus(u.status) })));
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load users. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  /* ── Status toggle ── */
  const handleStatusToggle = async () => {
    if (!statusModal) return;
    setProcessing(true);
    try {
      const res = await toggleUserStatus(statusModal.user._id);
  
      const newStatus = statusModal.action === "deactivate" ? "deactivated" : "active";
  
      const updatedUser = res?.user
        ? { ...res.user, status: normalizeStatus(res.user.status) }
        : { ...statusModal.user, status: newStatus };
  
      setUsers(prev =>
        prev.map(u => u._id === statusModal.user._id ? updatedUser : u)
      );
      setStatusModal(null);
    } catch (e) {
      console.error(e);
      setError("Failed to update user status. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  /* ── Role change ── */
  const handleRoleSelect = (user, newRole) => {
    setRoleModal({ user, newRole });
  };

  const handleRoleConfirm = async () => {
    if (!roleModal) return;
    setRoleProcessing(true);
    try {
      const res = await updateUserRole(roleModal.user._id, roleModal.newRole);

      const updatedUser = res?.user
        ? { ...res.user, status: normalizeStatus(res.user.status) }
        : { ...roleModal.user, userrole: roleModal.newRole };

      setUsers(prev =>
        prev.map(u => u._id === roleModal.user._id ? updatedUser : u)
      );
      setRoleModal(null);
    } catch (e) {
      console.error(e);
      setError("Failed to update user role. Please try again.");
    } finally {
      setRoleProcessing(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const { labels, data, adminCount, userCount, totalUsers } = await fetchPdfUsersData();
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      let y = drawHeader(doc, "Typeventure — Users", "Platform user registration and role analytics");
  
      // Stat pills
      y = drawSectionLabel(doc, "Overview", y);
      y = drawStatPills(doc, [
        { label: "Total Users",    value: totalUsers,  color: [162, 0,  255] },
        { label: "Admins",         value: adminCount,  color: [255, 20,  20] },
        { label: "Regular Users",  value: userCount,   color: [0,   41, 255] },
      ], y);
  
      y = drawDivider(doc, y);
  
      // Bar chart
      y = drawSectionLabel(doc, "User Registrations Over Time", y);
      if (labels.length > 0) {
        const img = makeBarChart({ labels, data, color: "rgba(162,0,255,0.85)" });
        y = addChart(doc, img, y);
  
        const peak     = labels[data.indexOf(Math.max(...data))];
        const total    = data.reduce((a, b) => a + b, 0);
        const avg      = (total / labels.length).toFixed(1);
        y = drawAnalysis(doc,
          `The registration graph spans ${labels.length} day(s) with ${total} total new registrations. ` +
          `Peak activity was on ${peak}. On average, ${avg} user(s) registered per day. ` +
          `The platform currently has ${adminCount} admin(s) and ${userCount} regular user(s).`, y);
      } else {
        doc.setFontSize(9); doc.setTextColor(160, 160, 180);
        doc.text("No registration data available.", 14, y); y += 10;
      }
  
      drawFooter(doc);
      doc.save("typeventure-users.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
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

        <button className="admin-pdf-btn" onClick={handleDownloadPdf}>
          ⬇ Download PDF Report
        </button>

        {error && (
          <div className="admin-error-banner" onClick={() => setError(null)}>
            ⚠️ {error} <span style={{ float: "right", cursor: "pointer" }}>✕</span>
          </div>
        )}

        {loading ? (
          <div className="admin-loading">Loading users…</div>
        ) : (
          <div className="admin-cards-grid">
            {users.map(user => {
              const status = normalizeStatus(user.status);
              return (
                <div key={user._id} className="admin-user-card">

                  {/* Profile Picture */}
                  <img
                    src={user.profilePicture || DEFAULT_PROFILE}
                    alt={user.username}
                    className="admin-user-avatar"
                    onError={e => { e.target.src = DEFAULT_PROFILE; }}
                  />

                  {/* Username */}
                  <span className="admin-user-name">{user.username}</span>

                  {/* Role — dropdown */}
                  <RoleDropdown
                    user={user}
                    onRoleSelect={handleRoleSelect}
                  />

                  {/* Email */}
                  <span className="admin-user-email">{user.email}</span>

                  {/* Account Status */}
                  <span className={`admin-user-status ${status}`}>
                    {status}
                  </span>

                  {/* Email Verification */}
                  <span className={`admin-user-verified ${user.isVerified ? "verified" : "unverified"}`}>
                    {user.isVerified ? "✓ Verified" : "✗ Unverified"}
                  </span>

                  {/* Action Buttons */}
                  <div className="admin-card-actions" style={{ padding: 0, marginTop: 10, width: "100%" }}>
                    <button
                      className="admin-btn-details"
                      onClick={() => navigate(`/adminusers/${user._id}`)}
                    >
                      Details
                    </button>
                    <button
                      className={`admin-btn-toggle ${status === "deactivated" ? "deactivated-status" : "active-status"}`}
                      onClick={() =>
                        setStatusModal({
                          user,
                          action: status === "deactivated" ? "activate" : "deactivate",
                        })
                      }
                    >
                      {status === "deactivated" ? "Activate" : "Deactivate"}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* ── Status Toggle Modal ── */}
        {statusModal && (
          <div className="admin-modal-backdrop" onClick={() => setStatusModal(null)}>
            <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
              <div className="admin-modal-emoji">
                {statusModal.action === "deactivate" ? "⚠️" : "✅"}
              </div>
              <h2 className="admin-modal-title">
                {statusModal.action === "deactivate" ? "Deactivate User?" : "Activate User?"}
              </h2>
              <p className="admin-modal-text">
                Are you sure you want to <strong>{statusModal.action}</strong>{" "}
                <strong>{statusModal.user.username}</strong>?
                {statusModal.action === "deactivate" && " They will no longer be able to log in."}
              </p>
              <div className="admin-modal-actions">
                <button
                  className="admin-modal-confirm-btn"
                  onClick={handleStatusToggle}
                  disabled={processing}
                >
                  {processing ? "Processing…" : "Confirm"}
                </button>
                <button className="admin-modal-cancel-btn" onClick={() => setStatusModal(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Role Change Modal ── */}
        {roleModal && (
          <div className="admin-modal-backdrop" onClick={() => setRoleModal(null)}>
            <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
              <div className="admin-modal-emoji">🔑</div>
              <h2 className="admin-modal-title">Change User Role?</h2>
              <p className="admin-modal-text">
                You are about to change <strong>{roleModal.user.username}</strong>'s role from{" "}
                <strong>{roleModal.user.userrole}</strong> to{" "}
                <strong>{roleModal.newRole}</strong>.
                {roleModal.newRole === "admin" && (
                  <><br /><br />⚠️ This will grant full admin access to the platform.</>
                )}
              </p>
              <div className="admin-modal-actions">
                <button
                  className="admin-modal-confirm-btn"
                  onClick={handleRoleConfirm}
                  disabled={roleProcessing}
                >
                  {roleProcessing ? "Updating…" : "Confirm"}
                </button>
                <button className="admin-modal-cancel-btn" onClick={() => setRoleModal(null)}>
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