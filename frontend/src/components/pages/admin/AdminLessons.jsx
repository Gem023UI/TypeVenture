import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetchAllLessons, adminDeleteLesson, fetchPdfLessonsData } from "../../../api/admin";
import { jsPDF } from "jspdf";
import {
  makeBarChart, addChart, checkBreak,
  drawHeader, drawSectionLabel, drawStatPills, drawAnalysis, drawDivider, drawFooter,
} from "./pdfUtils";
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

  const handleDownloadPdf = async () => {
    try {
      const { lessonStats } = await fetchPdfLessonsData();
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      let y = drawHeader(doc, "Typeventure — Lessons", "Lesson completion rates and quiz score analytics");

      const lessonLabels  = lessonStats.map((_, i) => `L${i + 1}`);
      const completions   = lessonStats.map(l => l.completionCount);
      const avgScores     = lessonStats.map(l => l.avgScore);

      // Overview pills
      y = drawSectionLabel(doc, "Overview", y);
      const totalCompletions = completions.reduce((a, b) => a + b, 0);
      const overallAvg = avgScores.length
        ? Math.round(avgScores.reduce((a, b) => a + b, 0) / avgScores.length) : 0;
      y = drawStatPills(doc, [
        { label: "Total Lessons",      value: lessonStats.length, color: [162, 0, 255] },
        { label: "Total Completions",  value: totalCompletions,   color: [0,  41, 255] },
        { label: "Avg Score (all)",    value: `${overallAvg}%`,   color: [34, 197, 94] },
      ], y);

      y = drawDivider(doc, y);

      // Chart 1: Completions
      y = checkBreak(doc, y, 90);
      y = drawSectionLabel(doc, "Lesson Completions by Users", y, [0, 41, 255]);
      const img1 = makeBarChart({ labels: lessonLabels, data: completions, color: "rgba(0,41,255,0.85)" });
      y = addChart(doc, img1, y);
      const topL1   = `Lesson ${completions.indexOf(Math.max(...completions)) + 1}`;
      const lowL1   = `Lesson ${completions.indexOf(Math.min(...completions)) + 1}`;
      y = drawAnalysis(doc,
        `${topL1} had the highest completion count while ${lowL1} had the fewest. ` +
        `Total completions across all lessons: ${totalCompletions}. ` +
        `Varying completion rates may indicate differences in difficulty or content engagement.`, y);

      // Chart 2: Avg Scores — y-axis max 1000
      y = checkBreak(doc, y, 90);
      y = drawSectionLabel(doc, "Average Score per Lesson", y, [162, 0, 255]);
      const img2 = makeBarChart({ labels: lessonLabels, data: avgScores, color: "rgba(162,0,255,0.85)", maxY: 1000 });
      y = addChart(doc, img2, y);
      const topL2 = `Lesson ${avgScores.indexOf(Math.max(...avgScores)) + 1}`;
      const lowL2 = `Lesson ${avgScores.indexOf(Math.min(...avgScores)) + 1}`;
      y = drawAnalysis(doc,
        `${topL2} recorded the highest average score while ${lowL2} had the lowest. ` +
        `The overall average score across all lessons is ${overallAvg}%. ` +
        `Lessons with low scores may benefit from content review or additional explanations.`, y);

      // Lesson detail list
      y = checkBreak(doc, y, 30);
      y = drawDivider(doc, y);
      y = drawSectionLabel(doc, "Lesson Details", y, [34, 197, 94]);

      lessonStats.forEach((lesson, i) => {
        y = checkBreak(doc, y, 28);
        // Row background
        const W = doc.internal.pageSize.getWidth();
        doc.setFillColor(28, 20, 45);
        doc.roundedRect(14, y, W - 28, 22, 3, 3, "F");

        // Index badge
        doc.setFillColor(162, 0, 255);
        doc.circle(22, y + 11, 5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(String(i + 1), 22, y + 13, { align: "center" });

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(lesson.title, 30, y + 8);

        // Description
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(160, 160, 180);
        const desc = doc.splitTextToSize(lesson.description || "No description.", W - 80);
        doc.text(desc[0], 30, y + 14);

        // Stats on right
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(162, 0, 255);
        doc.text(`Avg: ${lesson.avgScore}%`, W - 16, y + 8, { align: "right" });
        doc.setTextColor(0, 41, 255);
        doc.text(`${lesson.completionCount} done`, W - 16, y + 14, { align: "right" });

        y += 26;
      });

      drawFooter(doc);
      doc.save("typeventure-lessons.pdf");
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
          <h1 className="admin-page-title">Lessons</h1>
          <p className="admin-page-sub">{lessons.length} lessons available</p>
        </div>

        <button className="admin-pdf-btn" onClick={handleDownloadPdf}>
          ⬇ Download PDF Report
        </button>

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