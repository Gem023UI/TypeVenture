import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAllLessons } from "../../api/lessons";
import MainLayout from "../layout/MainLayout";
import "./FrontPage.css";

/* ─── Difficulty badge helper ─── */
const difficultyConfig = {
  Beginner:     { color: "#22c55e", stars: 1 },
  Intermediate: { color: "#f59e0b", stars: 2 },
  Advanced:     { color: "#ef4444", stars: 3 },
  Expert:       { color: "#a855f7", stars: 4 },
};

const StarRating = ({ count }) => (
  <div className="fp-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? "fp-star filled" : "fp-star"}>★</span>
    ))}
  </div>
);

/* ─── Modal overlay wrapper ─── */
const Modal = ({ onClose, children }) => (
  <div className="fp-modal-backdrop" onClick={onClose}>
    <div className="fp-modal-box" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const FrontPage = () => {
  const navigate  = useNavigate();
  const trackRef  = useRef(null);

  const [lessons, setLessons]           = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [activeIdx, setActiveIdx]       = useState(0);
  const [dragStart, setDragStart]       = useState(null);

  /* modal states */
  const [infoModal, setInfoModal]       = useState(false);
  const [learnModal, setLearnModal]     = useState(false);
  const [quizModal, setQuizModal]       = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  /* helpers */
  const userId = localStorage.getItem("userId");

  const hasUserCompleted = (lesson) => {
    if (!lesson?.usersDone) return false;
    return lesson.usersDone.some(
      e => e.userId === userId || e.userId?.toString() === userId
    );
  };

  /* lessons sorted oldest → newest */
  const orderedLessons = [...lessons].reverse();

  const isLessonUnlocked = (idx) => {
    if (idx === 0) return true;
    return hasUserCompleted(orderedLessons[idx - 1]);
  };

  const activeLesson = orderedLessons[activeIdx] || null;
  const diff         = difficultyConfig[activeLesson?.difficulty] || difficultyConfig.Beginner;
  const quizCount    = activeLesson?.quiz?.length ?? 0;

  /* ─── fetch ─── */
  const fetchLessons = async () => {
    try {
      setLoading(true);
      const data = await fetchAllLessons();
      setLessons(data);
    } catch (err) {
      if (err.status === 403 && err.isVerified === false) {
        Swal.fire({
          icon: "warning",
          title: "Email Verification Required",
          text: err.message || "Proceed to the Profile Page to verify your email.",
          confirmButtonText: "OK",
        });
        setError("Please verify your email to access lessons. Go to the Profile Page to verify.");
      } else {
        setError("Failed to load lessons. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLessons(); }, []);

  /* ─── sessionStorage: welcome modal (once per session) ─── */
  useEffect(() => {
    if (!sessionStorage.getItem("tv_welcomed")) {
      sessionStorage.setItem("tv_welcomed", "1");
      setWelcomeModal(true);
    }
  }, []);

  /* ─── sessionStorage: all-complete modal (once per session, after lessons load) ─── */
  useEffect(() => {
    if (lessons.length === 0) return;
    if (sessionStorage.getItem("tv_complete_shown")) return;
    const ordered = [...lessons].reverse();
    const allDone = ordered.length > 0 && ordered.every(l => hasUserCompleted(l));
    if (allDone) {
      sessionStorage.setItem("tv_complete_shown", "1");
      setCompleteModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons]);

  /* ─── carousel navigation ─── */
  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, orderedLessons.length - 1));
    setActiveIdx(clamped);
  };

  /* drag / swipe */
  const onDragStart = (e) => setDragStart(e.clientX ?? e.touches?.[0]?.clientX);
  const onDragEnd   = (e) => {
    if (dragStart === null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStart;
    const delta = dragStart - endX;
    if (Math.abs(delta) > 50) goTo(activeIdx + (delta > 0 ? 1 : -1));
    setDragStart(null);
  };

  /* card class by position relative to active */
  const getCardClass = (idx) => {
    const d = idx - activeIdx;
    if (d === 0)  return "fp-card centre";
    if (d === -1) return "fp-card left-1";
    if (d === 1)  return "fp-card right-1";
    if (d === -2) return "fp-card left-2";
    if (d === 2)  return "fp-card right-2";
    return "fp-card hidden";
  };

  /* ─── render ─── */
  return (
    <MainLayout>
      <div className="fp-wrapper">

        {/* ══ HERO ══ */}
        <div className="fp-hero">
          <h1 className="fp-hero-title">TypeVenture</h1>
          <p className="fp-hero-sub">Choose your island. Begin your journey.</p>
        </div>

        {/* ══ CAROUSEL ══ */}
        {loading ? (
          <div className="fp-loading">Loading lessons…</div>
        ) : error ? (
          <div className="fp-error">{error}</div>
        ) : (
          <>
            <div
              className="fp-carousel-track"
              ref={trackRef}
              onMouseDown={onDragStart}
              onMouseUp={onDragEnd}
              onTouchStart={onDragStart}
              onTouchEnd={onDragEnd}
            >
              {orderedLessons.map((lesson, idx) => {
                const unlocked  = isLessonUnlocked(idx);
                const completed = hasUserCompleted(lesson);

                return (
                  <div
                    key={lesson._id}
                    className={getCardClass(idx)}
                    onClick={() => { if (unlocked) goTo(idx); }}
                    style={{ cursor: unlocked ? "pointer" : "not-allowed" }}
                  >
                    {/* ── IMAGE ONLY — no footer ── */}
                    <div className="fp-card-img-wrap">
                      <img
                        src={
                          lesson.lessonImage ||
                          "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773572640/936659a2-a9dd-4656-b65a-63d66d18a6a3.png"
                        }
                        alt={lesson.title}
                        draggable={false}
                      />
                      {!unlocked && (
                        <div className="fp-lock-overlay">🔒</div>
                      )}
                      {completed && (
                        <div className="fp-done-badge">✔</div>
                      )}
                    </div>
                    {/* no fp-card-footer — title & stars shown below carousel */}
                  </div>
                );
              })}
            </div>

            {/* ══ ARROWS + DOTS ══ */}
            <div className="fp-arrows">
              <button
                className="fp-arrow"
                onClick={() => goTo(activeIdx - 1)}
                disabled={activeIdx === 0}
              >‹</button>

              <div className="fp-dots">
                {orderedLessons.map((_, i) => (
                  <span
                    key={i}
                    className={`fp-dot ${i === activeIdx ? "active" : ""}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <button
                className="fp-arrow"
                onClick={() => goTo(activeIdx + 1)}
                disabled={activeIdx === orderedLessons.length - 1}
              >›</button>
            </div>

            {/* ══ ACTIVE LESSON INFO BAR ══ */}
            {activeLesson && (
              <div className="fp-lesson-info-bar">
                <h2 className="fp-lesson-name">
                  {activeLesson.title?.toUpperCase()}
                </h2>
                <StarRating count={diff.stars} />

                {/* ── ACTION BUTTONS ── */}
                <div className="fp-action-btns">
                  <button
                    className="fp-btn fp-btn-info"
                    onClick={() => setInfoModal(true)}
                  >
                    Lesson Info
                  </button>
                  <button
                    className="fp-btn fp-btn-learn"
                    disabled={!isLessonUnlocked(activeIdx)}
                    onClick={() => isLessonUnlocked(activeIdx) && setLearnModal(true)}
                  >
                    Let's Go!
                  </button>
                  <button
                    className="fp-btn fp-btn-quiz"
                    disabled={!isLessonUnlocked(activeIdx)}
                    onClick={() => isLessonUnlocked(activeIdx) && setQuizModal(true)}
                  >
                    Play Quiz
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══ INFO MODAL ══ */}
        {infoModal && activeLesson && (
          <Modal onClose={() => setInfoModal(false)}>
            <div className="fp-modal-inner">
              <h2 className="fp-modal-title">{activeLesson.title}</h2>
              <div className="fp-modal-difficulty">
                <span className="fp-diff-badge" style={{ background: diff.color }}>
                  {activeLesson.difficulty || "Beginner"}
                </span>
                <StarRating count={diff.stars} />
              </div>
              <p className="fp-modal-desc">
                {activeLesson.content?.description || "No description available."}
              </p>
              <div className="fp-modal-meta">
                <span>⏱ {activeLesson.completionTime || "~15 min"}</span>
                <span>📝 {quizCount} quiz items</span>
              </div>
              <button
                className="fp-modal-close-btn"
                onClick={() => setInfoModal(false)}
              >
                Close
              </button>
            </div>
          </Modal>
        )}

        {/* ══ LEARN MODAL ══ */}
        {learnModal && activeLesson && (
          <Modal onClose={() => setLearnModal(false)}>
            <div className="fp-modal-inner fp-modal-confirm">
              <div className="fp-modal-emoji">🧭</div>
              <h2 className="fp-modal-title">Ready to Learn?</h2>
              <p className="fp-modal-desc">
                You are about to enter <strong>{activeLesson.title}</strong>.<br />
                Prepare your mind, traveler!
              </p>
              <div className="fp-modal-actions">
                <button
                  className="fp-btn fp-btn-learn"
                  onClick={() => {
                    setLearnModal(false);
                    navigate(`/lesson/${activeLesson._id}`);
                  }}
                >
                  Time to Learn!
                </button>
                <button
                  className="fp-btn fp-btn-cancel"
                  onClick={() => setLearnModal(false)}
                >
                  Later
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* ══ QUIZ MODAL ══ */}
        {quizModal && activeLesson && (
          <Modal onClose={() => setQuizModal(false)}>
            <div className="fp-modal-inner fp-modal-confirm">
              <div className="fp-modal-emoji">⚔️</div>
              <h2 className="fp-modal-title">Ready for the Quiz?</h2>
              <p className="fp-modal-desc">
                This quiz has <strong>{quizCount} items</strong> based on{" "}
                <strong>{activeLesson.title}</strong>.<br />
                Do you have what it takes?
              </p>
              <div className="fp-modal-actions">
                <button
                  className="fp-btn fp-btn-quiz"
                  onClick={() => {
                    setQuizModal(false);
                    navigate(`/quiz/${activeLesson._id}`);
                  }}
                >
                  Let's Play!
                </button>
                <button
                  className="fp-btn fp-btn-cancel"
                  onClick={() => setQuizModal(false)}
                >
                  Not Yet
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* ══ WELCOME MODAL ══ */}
        {welcomeModal && (
          <Modal onClose={() => setWelcomeModal(false)}>
            <div className="fp-modal-inner fp-welcome-inner">
              <div className="fp-modal-emoji">🌊</div>
              <h2 className="fp-modal-title">Welcome to TypeVenture!</h2>
              <p className="fp-welcome-quote">
                "Where letters aren't just shapes — they are the architecture of human thought."
              </p>
              <p className="fp-modal-desc">
                Greetings, Traveler! You are about to embark on a journey across a vast ocean of
                history and design. From the ancient scribes of the past to the digital pioneers
                of the future, each island you visit will grant you the power to master the{" "}
                <strong>"Visual Form of Language."</strong>
              </p>
              <p className="fp-modal-desc">
                Explore the islands, gather the <strong>"biological fossils"</strong> of design,
                and prove your skills in the Expert Missions to become a{" "}
                <strong>Master Visual Engineer!</strong>
              </p>
              <button
                className="fp-btn fp-btn-learn fp-welcome-proceed-btn"
                onClick={() => setWelcomeModal(false)}
              >
                Proceed to Lessons
              </button>
            </div>
          </Modal>
        )}

        {/* ══ ALL-COMPLETE MODAL ══ */}
        {completeModal && (
          <Modal onClose={() => setCompleteModal(false)}>
            <div className="fp-modal-inner fp-complete-inner">
              <div className="fp-modal-emoji">🎉</div>
              <h2 className="fp-modal-title">Congratulations, Typography Explorer!</h2>
              <p className="fp-modal-desc">
                You have successfully completed the final island currently available in{" "}
                <strong>TYPEVENTURE</strong>. Your journey through the world of typography has
                demonstrated your skills in recognizing typefaces, applying proper hierarchy, and
                making effective design decisions.
              </p>
              <p className="fp-modal-desc">
                Your progress and achievements reflect your dedication to improving your typography
                knowledge and visual design abilities. Each challenge you completed helped strengthen
                your understanding of important typography principles used in graphic design.
              </p>
              <p className="fp-modal-desc">
                While this is the final island for now, the adventure does not end here. New islands,
                typography challenges, and learning missions will soon be added in future updates to
                further enhance your creative journey.
              </p>
              <p className="fp-complete-prompt">What would you like to do next?</p>
              <div className="fp-complete-actions">
                <button
                  className="fp-complete-action-btn"
                  onClick={() => { setCompleteModal(false); navigate("/games"); }}
                >
                  <span className="fp-complete-action-icon">🔁</span>
                  <span className="fp-complete-action-label">Play Games</span>
                  <span className="fp-complete-action-sub">
                    Play other challenges to practice your typography skills and improve your score.
                  </span>
                </button>
                <button
                  className="fp-complete-action-btn"
                  onClick={() => { setCompleteModal(false); navigate("/leaderboards"); }}
                >
                  <span className="fp-complete-action-icon">🏆</span>
                  <span className="fp-complete-action-label">View Leaderboard</span>
                  <span className="fp-complete-action-sub">
                    See your ranking and compare your performance with other explorers.
                  </span>
                </button>
                <button
                  className="fp-complete-action-btn"
                  onClick={() => { setCompleteModal(false); navigate("/profile"); }}
                >
                  <span className="fp-complete-action-icon">📊</span>
                  <span className="fp-complete-action-label">Review Performance</span>
                  <span className="fp-complete-action-sub">
                    Check your results and see how well you performed in different typography challenges.
                  </span>
                </button>
                <button
                  className="fp-complete-action-btn fp-complete-action-btn-muted"
                  onClick={() => setCompleteModal(false)}
                >
                  <span className="fp-complete-action-icon">🏠</span>
                  <span className="fp-complete-action-label">Return to Main Menu</span>
                  <span className="fp-complete-action-sub">
                    Exit the island and explore other features of the application.
                  </span>
                </button>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </MainLayout>
  );
};

export default FrontPage;