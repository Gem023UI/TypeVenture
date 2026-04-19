import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetchAllGames, adminDeleteGame, fetchPdfGamesData } from "../../../api/admin";
import { jsPDF } from "jspdf";
import {
  makeBarChart, addChart, checkBreak,
  drawHeader, drawSectionLabel, drawStatPills, drawAnalysis, drawDivider, drawFooter, C,
} from "./pdfUtils";
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

  const handleDownloadPdf = async () => {
    try {
      const {
        dateLabels, dateData, categoryLabels, categoryData,
        totalGames, easy, medium, hard, totalAchievements, usersWithAchievements,
      } = await fetchPdfGamesData();

      const GAME_TYPE_LABELS = {
        kerning:          "Kerning",
        leading:          "Leading",
        "font-pairing":   "Font Pairing",
        "typeface-guess": "Typeface",
        quiz:             "Quiz",
      };

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      let y = drawHeader(doc, "Typeventure — Games", "Game activity, category engagement and achievement analytics");

      // Overview pills
      y = drawSectionLabel(doc, "Overview", y);
      y = drawStatPills(doc, [
        { label: "Total Games",      value: totalGames,            color: [34, 197, 94]  },
        { label: "Easy",             value: easy,                  color: [0,  200, 100] },
        { label: "Medium",           value: medium,                color: [255, 180, 0]  },
        { label: "Hard",             value: hard,                  color: [255, 20,  20] },
        { label: "Achievements",     value: totalAchievements,     color: [162, 0,  255] },
        { label: "Users w/ Achiev.", value: usersWithAchievements, color: [0,   41, 255] },
      ], y);

      y = drawDivider(doc, y);

      // Chart 1: Games played over time
      y = checkBreak(doc, y, 90);
      y = drawSectionLabel(doc, "Games Played Over Time", y, [34, 197, 94]);
      if (dateLabels.length > 0) {
        const img1 = makeBarChart({ labels: dateLabels, data: dateData, color: "rgba(34,197,94,0.85)" });
        y = addChart(doc, img1, y);
        const peak  = dateLabels[dateData.indexOf(Math.max(...dateData))];
        const total = dateData.reduce((a, b) => a + b, 0);
        y = drawAnalysis(doc,
          `A total of ${total} game session(s) were recorded across all dates. ` +
          `Peak activity was on ${peak}. Monitoring play trends helps identify optimal times for new content releases.`, y);
      } else {
        doc.setFontSize(9); doc.setTextColor(160, 160, 180);
        doc.text("No game play data available yet.", 14, y); y += 10;
      }

      // Chart 2: Players per category
      y = checkBreak(doc, y, 90);
      y = drawSectionLabel(doc, "Players per Game Category", y, [162, 0, 255]);
      if (categoryLabels.length > 0) {
        const friendlyLabels = categoryLabels.map(c => GAME_TYPE_LABELS[c] || c);
        const img2 = makeBarChart({
          labels: friendlyLabels, data: categoryData,
          color: "rgba(162,0,255,0.85)", horizontal: true, height: 300,
        });
        y = addChart(doc, img2, y);
        const topCat = friendlyLabels[categoryData.indexOf(Math.max(...categoryData))];
        y = drawAnalysis(doc,
          `${topCat} is the most played game category. Understanding which types attract the most users ` +
          `can guide future game development priorities and content expansion.`, y);
      }

      // Difficulty breakdown visual
      y = checkBreak(doc, y, 40);
      y = drawDivider(doc, y);
      y = drawSectionLabel(doc, "Difficulty Breakdown", y, [255, 20, 20]);
      const W = doc.internal.pageSize.getWidth();
      const diffData = [
        { label: "Easy",   value: easy,   color: [34,  197, 94]  },
        { label: "Medium", value: medium, color: [255, 180, 0]   },
        { label: "Hard",   value: hard,   color: [255, 20,  20]  },
      ];
      const total = easy + medium + hard || 1;
      let barX = 14;
      const barTotalW = W - 28;
      diffData.forEach(d => {
        const segW = (d.value / total) * barTotalW;
        doc.setFillColor(...d.color);
        doc.rect(barX, y, segW, 8, "F");
        barX += segW;
      });
      y += 12;
      diffData.forEach((d, i) => {
        doc.setFillColor(...d.color);
        doc.circle(14 + i * 50, y + 3, 3, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(`${d.label}: ${d.value}`, 20 + i * 50, y + 4.5);
      });
      y += 14;

      drawFooter(doc);
      doc.save("typeventure-games.pdf");
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
          <h1 className="admin-page-title">Games</h1>
          <p className="admin-page-sub">{games.length} games available</p>
        </div>

        <button className="admin-pdf-btn" onClick={handleDownloadPdf}>
          ⬇ Download PDF Report
        </button>

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