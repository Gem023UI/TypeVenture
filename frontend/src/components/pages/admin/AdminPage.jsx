import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import {
  fetchAdminStats,
  fetchLessonCompletionsGraph,
  fetchLoginsGraph,
  fetchTodayRegistrants,
} from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DEFAULT_PROFILE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

const AdminPage = () => {
  const navigate = useNavigate();

  const [stats, setStats]                   = useState(null);
  const [completionData, setCompletionData] = useState({ labels: [], data: [] });
  const [loginData, setLoginData]           = useState({ labels: [], data: [] });
  const [registrants, setRegistrants]       = useState([]);
  const [regPage, setRegPage]               = useState(1);
  const [regPages, setRegPages]             = useState(1);
  const [loading, setLoading]               = useState(true);

  const today   = new Date().toISOString().slice(0, 10);
  const weekAgo = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return d.toISOString().slice(0, 10);
  })();

  const [completionRange, setCompletionRange] = useState({ start: weekAgo, end: today });
  const [loginRange, setLoginRange]           = useState({ start: weekAgo, end: today });

  const completionCanvasRef = useRef(null);
  const loginCanvasRef      = useRef(null);
  const completionChartRef  = useRef(null);
  const loginChartRef       = useRef(null);

  // ── fetch stats
  useEffect(() => {
    const load = async () => {
      try {
        const s = await fetchAdminStats();
        setStats(s);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── fetch completion graph
  useEffect(() => {
    fetchLessonCompletionsGraph(completionRange.start, completionRange.end)
      .then(setCompletionData)
      .catch(console.error);
  }, [completionRange]);

  // ── fetch login graph
  useEffect(() => {
    fetchLoginsGraph(loginRange.start, loginRange.end)
      .then(setLoginData)
      .catch(console.error);
  }, [loginRange]);

  // ── fetch registrants
  useEffect(() => {
    fetchTodayRegistrants(regPage, 5)
      .then(r => {
        setRegistrants(r.users || []);
        setRegPages(r.pages || 1);
      })
      .catch(console.error);
  }, [regPage]);

  // ── draw completion chart
  useEffect(() => {
    if (!completionCanvasRef.current) return;

    if (completionChartRef.current) {
      completionChartRef.current.destroy();
      completionChartRef.current = null;
    }

    if (!completionData.labels.length) return;

    completionChartRef.current = new Chart(completionCanvasRef.current, {
      type: "bar",
      data: {
        labels: completionData.labels,
        datasets: [{
          label: "Lessons Completed",
          data: completionData.data,
          backgroundColor: "rgba(162, 0, 255, 0.6)",
          borderColor: "#a200ff",
          borderWidth: 2,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      },
    });

    return () => {
      if (completionChartRef.current) {
        completionChartRef.current.destroy();
        completionChartRef.current = null;
      }
    };
  }, [completionData]);

  // ── draw login chart
  useEffect(() => {
    if (!loginCanvasRef.current) return;

    if (loginChartRef.current) {
      loginChartRef.current.destroy();
      loginChartRef.current = null;
    }

    if (!loginData.labels.length) return;

    loginChartRef.current = new Chart(loginCanvasRef.current, {
      type: "line",
      data: {
        labels: loginData.labels,
        datasets: [{
          label: "Logins",
          data: loginData.data,
          borderColor: "#0029FF",
          backgroundColor: "rgba(0, 41, 255, 0.15)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#0029FF",
          pointRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      },
    });

    return () => {
      if (loginChartRef.current) {
        loginChartRef.current.destroy();
        loginChartRef.current = null;
      }
    };
  }, [loginData]);

  const navButtons = [
    { label: "Manage Users",  path: "/adminusers",    emoji: "👥" },
    { label: "Edit Lessons",  path: "/adminlessons",  emoji: "📚" },
    { label: "Add Articles",  path: "/adminarticles", emoji: "📰" },
    { label: "Create Games",  path: "/admingames",    emoji: "🎮" },
  ];

  const statCards = [
    { label: "Total Users",    value: stats?.totalUsers    ?? "—", emoji: "👥", color: "#ff1414" },
    { label: "Total Lessons",  value: stats?.totalLessons  ?? "—", emoji: "📚", color: "#a200ff" },
    { label: "Total Articles", value: stats?.totalArticles ?? "—", emoji: "📰", color: "#0029FF" },
    { label: "Total Games",    value: stats?.totalGames    ?? "—", emoji: "🎮", color: "#22c55e" },
  ];

  return (
    <MainLayout>
      <div className="admin-wrapper">

        {/* ── Header ── */}
        <div className="admin-header">
          <h1 className="admin-title">Admin Page</h1>
          <p className="admin-subtitle">Manage your platform content and users</p>
        </div>

        {/* ── Nav Buttons ── */}
        <div className="admin-nav-row">
          {navButtons.map(btn => (
            <button key={btn.path} className="admin-nav-btn" onClick={() => navigate(btn.path)}>
              <span className="admin-nav-emoji">{btn.emoji}</span>
              <span className="admin-nav-label">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* ── Stat Cards ── */}
        <div className="admin-stats-grid">
          {statCards.map(s => (
            <div key={s.label} className="admin-stat-card" style={{ "--accent": s.color }}>
              <span className="admin-stat-emoji">{s.emoji}</span>
              <span className="admin-stat-value">{loading ? "…" : s.value}</span>
              <span className="admin-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Graphs ── */}
        <div className="admin-graphs-grid">

          {/* Lesson Completions */}
          <div className="admin-graph-card">
            <div className="admin-graph-header">
              <h3 className="admin-graph-title">📊 Lesson Completions</h3>
              <div className="admin-date-range">
                <input type="date" value={completionRange.start}
                  onChange={e => setCompletionRange(r => ({ ...r, start: e.target.value }))} />
                <span>to</span>
                <input type="date" value={completionRange.end}
                  onChange={e => setCompletionRange(r => ({ ...r, end: e.target.value }))} />
              </div>
            </div>
            <div className="admin-chart-wrap">
              <canvas ref={completionCanvasRef} />
            </div>
          </div>

          {/* Logins */}
          <div className="admin-graph-card">
            <div className="admin-graph-header">
              <h3 className="admin-graph-title">📈 Daily Logins</h3>
              <div className="admin-date-range">
                <input type="date" value={loginRange.start}
                  onChange={e => setLoginRange(r => ({ ...r, start: e.target.value }))} />
                <span>to</span>
                <input type="date" value={loginRange.end}
                  onChange={e => setLoginRange(r => ({ ...r, end: e.target.value }))} />
              </div>
            </div>
            <div className="admin-chart-wrap">
              <canvas ref={loginCanvasRef} />
            </div>
          </div>

        </div>

        {/* ── Today's Registrants ── */}
        <div className="admin-registrants-card">
          <h3 className="admin-section-title">🆕 Today's Registrants</h3>
          {registrants.length === 0 ? (
            <p className="admin-empty">No new registrations today.</p>
          ) : (
            <div className="admin-reg-list">
              {registrants.map(u => (
                <div key={u._id} className="admin-reg-item">
                  <img
                    src={u.profilePicture || DEFAULT_PROFILE}
                    alt={u.username}
                    className="admin-reg-avatar"
                    onError={e => { e.target.src = DEFAULT_PROFILE; }}
                  />
                  <div className="admin-reg-info">
                    <span className="admin-reg-name">{u.username}</span>
                    <span className="admin-reg-email">{u.email}</span>
                  </div>
                  <span className={`admin-reg-badge ${u.userrole}`}>{u.userrole}</span>
                </div>
              ))}
            </div>
          )}
          {regPages > 1 && (
            <div className="admin-pagination">
              {Array.from({ length: regPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`admin-page-btn ${p === regPage ? "active" : ""}`}
                  onClick={() => setRegPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
};

export default AdminPage;