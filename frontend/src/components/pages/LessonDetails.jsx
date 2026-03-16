import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchLessonById, markLessonComplete } from "../../api/lessons";
import { getQuizScores } from "../../api/user";
import MainLayout from "../layout/MainLayout";
import "./LessonDetails.css";

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson]                       = useState(null);
  const [loading, setLoading]                     = useState(true);
  const [error, setError]                         = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quizModal, setQuizModal]                 = useState(false);
  const [completing, setCompleting]               = useState(false);

  /* quiz gate state */
  const [quizRecord, setQuizRecord]   = useState(null);   // the matching lessonQuiz entry
  const [scoresLoading, setScoresLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const hasUserCompleted = (l) => {
    if (!l?.usersDone) return false;
    return l.usersDone.some(
      e => e.userId === userId || e.userId?.toString() === userId
    );
  };

  /* ── fetch lesson + quiz scores in parallel ── */
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        setScoresLoading(true);
        setError("");

        /* run both fetches at the same time */
        const [data, scores] = await Promise.all([
          fetchLessonById(id),
          getQuizScores(),
        ]);

        setLesson(data);

        /* find the quiz record that matches this lesson by title */
        const match = scores.find(
          s => s.lessonTitle === data.title && s.lessonCompleted === true
        );
        setQuizRecord(match ?? null);

      } catch (err) {
        console.error("❌ Failed to load lesson:", err);
        if (err.status === 403 && err.isVerified === false) {
          Swal.fire({
            icon: "warning",
            title: "Email Verification Required",
            text: err.message || "Please verify your email.",
            confirmButtonText: "OK",
          });
        }
        setError("Failed to load lesson. Please try again.");
      } finally {
        setLoading(false);
        setScoresLoading(false);
      }
    };
    load();
  }, [id]);

  /* ── image slideshow ── */
  const prevImage = () =>
    setCurrentImageIndex(p =>
      p === 0 ? (lesson?.imageUrls?.length ?? 1) - 1 : p - 1
    );
  const nextImage = () =>
    setCurrentImageIndex(p =>
      p === (lesson?.imageUrls?.length ?? 1) - 1 ? 0 : p + 1
    );

  /* ── mark complete ── */
  const handleComplete = async () => {
    /* double-check gate before firing */
    if (!quizRecord) {
      Swal.fire({
        icon: "warning",
        title: "Quiz Required",
        html: `<p>You need to <strong>pass the quiz</strong> for this lesson before marking it complete.</p>`,
        confirmButtonText: "Take the Quiz",
        showCancelButton: true,
        cancelButtonText: "Later",
        confirmButtonColor: "#0029FF",
      }).then(r => {
        if (r.isConfirmed) navigate(`/quiz/${lesson._id}`);
      });
      return;
    }

    try {
      setCompleting(true);
      const res  = await markLessonComplete(lesson._id);
      const next = res.nextLesson;

      Swal.fire({
        icon: "success",
        title: next ? "Lesson Complete! 🎉" : "All Done! 🎊",
        html: next
          ? `<p>Great work! Up next: <strong>${next.title}</strong></p>`
          : `<p>You've completed all available lessons!</p>`,
        confirmButtonText: next ? "Next Lesson" : "Awesome!",
        showCancelButton: !!next,
        cancelButtonText: "Stay Here",
        confirmButtonColor: "#0029FF",
        cancelButtonColor: "#6c757d",
      }).then(r => {
        if (r.isConfirmed && next) navigate(`/lesson/${next._id}`);
      });

      const updated = await fetchLessonById(id);
      setLesson(updated);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to mark lesson complete.",
        confirmButtonText: "OK",
      });
    } finally {
      setCompleting(false);
    }
  };

  /* ── derived ── */
  const quizCount   = lesson?.quiz?.length ?? 0;
  const isCompleted = hasUserCompleted(lesson);

  /*
    Gate logic:
      - quizPassed  → user has a passing score record for THIS lesson
      - canComplete → lesson already done OR quiz has been passed
  */
  const quizPassed  = !!quizRecord;
  const canComplete = isCompleted || quizPassed;

  const sections = ["One","Two","Three","Four","Five","Six","Seven"];

  /* ── loading / error / null guards ── */
  if (loading)
    return <MainLayout><div className="ld-loading">Loading lesson…</div></MainLayout>;
  if (error)
    return <MainLayout><div className="ld-error">{error}</div></MainLayout>;
  if (!lesson) return null;

  return (
    <MainLayout>
      <div className="ld-wrapper">

        {/* ── BACK ── */}
        <button className="ld-back" onClick={() => navigate(-1)}>← Back</button>

        {/* ── HEADER ── */}
        <header className="ld-header">
          <h1 className="ld-title">{lesson.title}</h1>
          {lesson.difficulty && (
            <span className="ld-difficulty">{lesson.difficulty}</span>
          )}
          {lesson.sourceUrl && (
            <a
              className="ld-source"
              href={lesson.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source ↗
            </a>
          )}
        </header>

        {/* ── VIDEO ── */}
        {lesson.youtubeUrl && (
          <div className="ld-video-wrap">
            <iframe
              width="100%"
              height="480"
              src={lesson.youtubeUrl}
              title="Lesson Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* ── CONTENT ── */}
        <article className="ld-content">

          {lesson.content?.description && (
            <p className="ld-description">{lesson.content.description}</p>
          )}

          {lesson.content?.introduction && (
            <section className="ld-section">
              <h2 className="ld-section-title">Introduction</h2>
              <p>{lesson.content.introduction}</p>
            </section>
          )}

          {/* IMAGE SLIDESHOW */}
          {lesson.imageUrls?.length > 0 && (
            <div className="ld-slideshow">
              <div className="ld-slide-wrap">
                <button className="ld-slide-btn prev" onClick={prevImage}>‹</button>
                <img
                  src={lesson.imageUrls[currentImageIndex]}
                  alt={`Visual ${currentImageIndex + 1}`}
                  className="ld-slide-img"
                />
                <button className="ld-slide-btn next" onClick={nextImage}>›</button>
              </div>
              <div className="ld-indicators">
                {lesson.imageUrls.map((_, i) => (
                  <span
                    key={i}
                    className={`ld-dot ${i === currentImageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* DISCUSSION SECTIONS */}
          {sections.map((num) => {
            const h = lesson.content?.[`header${num}`];
            const d = lesson.content?.[`discussion${num}`];
            if (!h && !d) return null;
            return (
              <section key={num} className="ld-section">
                {h && <h2 className="ld-section-title">{h}</h2>}
                {d && <p>{d}</p>}
              </section>
            );
          })}

        </article>

        {/* ── BOTTOM ACTIONS ── */}
        <div className="ld-bottom-bar">

          {/* Quiz CTA */}
          <button className="ld-quiz-btn" onClick={() => setQuizModal(true)}>
            {quizPassed
              ? `✓ Quiz Passed  •  ${quizRecord.lessonScore} pts`
              : `Answer the Quiz (${quizCount} items)`}
          </button>

          {/* ── QUIZ GATE NOTICE ── */}
          {!isCompleted && !scoresLoading && !quizPassed && (
            <div className="ld-gate-notice">
              🔒 Pass the quiz above to unlock <strong>Mark as Complete</strong>
            </div>
          )}

          {/* ── QUIZ SCORE BADGE (when passed but not yet lesson-completed) ── */}
          {!isCompleted && quizPassed && (
            <div className="ld-score-badge">
              🎯 Quiz score on record: <strong>{quizRecord.lessonScore} pts</strong>
              &nbsp;— you're good to go!
            </div>
          )}

          {/* Complete button */}
          {isCompleted ? (
            <button className="ld-complete-btn done" disabled>
              ✓ Lesson Complete
            </button>
          ) : (
            <button
              className={`ld-complete-btn ${!canComplete ? "locked" : ""}`}
              onClick={handleComplete}
              disabled={completing || scoresLoading}
              title={
                !quizPassed
                  ? "Pass the quiz first to unlock this button"
                  : "Mark this lesson as complete"
              }
            >
              {scoresLoading
                ? "Checking quiz…"
                : completing
                ? "Saving…"
                : !quizPassed
                ? "🔒 Complete Locked"
                : "Mark as Complete"}
            </button>
          )}

        </div>

      </div>

      {/* ── QUIZ CONFIRM MODAL ── */}
      {quizModal && (
        <div className="ld-modal-backdrop" onClick={() => setQuizModal(false)}>
          <div className="ld-modal-box" onClick={e => e.stopPropagation()}>
            <div className="ld-modal-emoji">⚔️</div>
            <h2 className="ld-modal-title">Ready for the Quiz?</h2>

            {/* show score if already passed */}
            {quizPassed ? (
              <p className="ld-modal-desc">
                You already passed this quiz with{" "}
                <strong>{quizRecord.lessonScore} pts</strong>!<br />
                Want to play again and try for a higher score?
              </p>
            ) : (
              <p className="ld-modal-desc">
                This quiz has{" "}
                <strong>{quizCount} item{quizCount !== 1 ? "s" : ""}</strong>{" "}
                based on <strong>{lesson.title}</strong>.<br />
                You must <strong>pass</strong> (≥ 50% correct) to unlock
                lesson completion.
              </p>
            )}

            <div className="ld-modal-actions">
              <button
                className="ld-modal-btn primary"
                onClick={() => {
                  setQuizModal(false);
                  navigate(`/quiz/${lesson._id}`);
                }}
              >
                {quizPassed ? "Play Again!" : "Let's Play!"}
              </button>
              <button
                className="ld-modal-btn secondary"
                onClick={() => setQuizModal(false)}
              >
                Not Yet
              </button>
            </div>
          </div>
        </div>
      )}

    </MainLayout>
  );
};

export default LessonDetail;