import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserDetail } from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DEFAULT_PROFILE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

const AdminUserInfo = () => {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetail(id)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <MainLayout><div className="admin-loading">Loading…</div></MainLayout>;
  if (!data)   return <MainLayout><div className="admin-error">User not found.</div></MainLayout>;

  const { user, scores, completedLessons } = data;

  const achievements = scores?.filter(s => s.achievement && s.achievement !== "none") || [];

  const achievementImg = {
    gold:   "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305621/gold_medal_w7xagi.png",
    silver: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305631/silver_medal_nfb50c.png",
    bronze: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305618/bronze_medal_olw8ds.png",
  };

  const dateJoined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Unknown";

  return (
    <MainLayout>
      <div className="admin-section-wrapper">

        <button className="admin-back-btn" onClick={() => navigate("/adminusers")}>
          ← Back to Users
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">{user.username}</h1>
          <p className="admin-page-sub">User Details</p>
        </div>

        <div className="admin-user-info-grid">

          {/* ── Left: User Info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="admin-info-section">
              <p className="admin-info-section-title">User Info</p>
              <img
                src={user.profilePicture || DEFAULT_PROFILE}
                alt={user.username}
                className="admin-info-avatar"
                onError={e => { e.target.src = DEFAULT_PROFILE; }}
              />
              <div className="admin-info-field">
                <span className="admin-info-field-label">Username</span>
                <span className="admin-info-field-value">{user.username}</span>
              </div>
              <div className="admin-info-field">
                <span className="admin-info-field-label">Email</span>
                <span className="admin-info-field-value">{user.email}</span>
              </div>
              <div className="admin-info-field">
                <span className="admin-info-field-label">Role</span>
                <span className="admin-info-field-value">{user.userrole}</span>
              </div>
              <div className="admin-info-field">
                <span className="admin-info-field-label">Status</span>
                <span className={`admin-user-status ${user.status || "active"}`} style={{ display: "inline-block", marginTop: 2 }}>
                  {user.status || "active"}
                </span>
              </div>
              <div className="admin-info-field">
                <span className="admin-info-field-label">Date Joined</span>
                <span className="admin-info-field-value">{dateJoined}</span>
              </div>
              {user.hobbies?.length > 0 && (
                <div className="admin-info-field">
                  <span className="admin-info-field-label">Hobbies</span>
                  <span className="admin-info-field-value">{user.hobbies.join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Achievements + Lessons ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Achievements */}
            <div className="admin-info-section">
              <p className="admin-info-section-title">Achievements</p>
              {achievements.length === 0 ? (
                <p className="admin-empty">No achievements yet.</p>
              ) : (
                <div className="admin-achievements-grid">
                  {achievements.map((s, i) => (
                    <div key={i} className="admin-achievement-item">
                      <img
                        src={achievementImg[s.achievement] || ""}
                        alt={s.achievement}
                        className="admin-achievement-img"
                      />
                      <span className="admin-achievement-label">
                        {s.gameTitle || s.gameId?.title || "Game"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Lessons */}
            <div className="admin-info-section">
              <p className="admin-info-section-title">Completed Lessons</p>
              {completedLessons.length === 0 ? (
                <p className="admin-empty">No lessons completed yet.</p>
              ) : (
                completedLessons.map(lesson => {
                  const quizEntry = user.lessonQuiz?.find(q => q.lessonTitle === lesson.title);
                  return (
                    <div key={lesson._id} className="admin-lesson-row">
                      <span className="admin-lesson-title">{lesson.title}</span>
                      <span className="admin-lesson-score">
                        {quizEntry ? `${quizEntry.lessonScore} pts` : "No quiz"}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default AdminUserInfo;