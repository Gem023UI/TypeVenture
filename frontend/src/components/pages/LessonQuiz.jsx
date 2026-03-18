import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessonById, fetchAllLessons, submitQuizScore, markLessonComplete } from "../../api/lessons";
import MainLayout from "../layout/MainLayout";
import "./LessonQuiz.css";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const TIME_PER_QUESTION = 30;     // seconds per question
const MAX_POINTS_PER_Q  = 100;    // max points if answered on tick 30
const PASS_RATE         = 0.5;    // ≥ 50% correct answers required to pass

/* ─────────────────────────────────────────
   TIMER RING
───────────────────────────────────────── */
const TimerRing = ({ timeLeft, total }) => {
  const radius = 26;
  const circum = 2 * Math.PI * radius;
  const pct    = timeLeft / total;
  const dash   = pct * circum;
  const color  =
    pct > 0.6 ? "#22c55e" :
    pct > 0.3 ? "#f59e0b" : "#ef4444";

  return (
    <div className="lq-timer-wrap">
      <svg className="lq-timer-svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={`${dash} ${circum}`}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
          style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.4s ease" }}
        />
      </svg>
      <span className="lq-timer-text" style={{ color }}>{timeLeft}</span>
    </div>
  );
};

/* ─────────────────────────────────────────
   SCORE CHIP
───────────────────────────────────────── */
const ScoreChip = ({ points, isCorrect }) => (
  <div className={`lq-score-chip ${isCorrect ? "ok" : "zero"}`}>
    {isCorrect ? `+${points} pts` : "+0 pts"}
  </div>
);

/* ─────────────────────────────────────────
   QUESTION COMPONENTS
───────────────────────────────────────── */

/* MULTIPLE CHOICE */
const MultipleChoice = ({ question, onAnswer, answered, selected, correct }) => (
  <div className="lq-mc">
    <p className="lq-q-text">{question.question}</p>
    <div className="lq-choices">
      {question.choices.map((ch, i) => {
        let cls = "lq-choice";
        if (answered) {
          if (ch === correct)         cls += " correct";
          else if (ch === selected)   cls += " wrong";
        }
        return (
          <button
            key={i}
            className={cls}
            onClick={() => !answered && onAnswer(ch)}
            disabled={answered}
          >
            <span className="lq-choice-letter">{String.fromCharCode(65 + i)}</span>
            {ch}
          </button>
        );
      })}
    </div>
    {answered && (
      <div className={`lq-feedback ${selected === correct ? "ok" : "bad"}`}>
        {selected === correct ? "✓ Correct!" : `✗ Correct answer: ${correct}`}
        {question.explanation && (
          <p className="lq-explanation">{question.explanation}</p>
        )}
      </div>
    )}
  </div>
);

/* IDENTIFICATION */
const Identification = ({ question, onAnswer, answered, selected, correct }) => {
  const [val, setVal] = useState("");
  const submit = () => { if (val.trim()) onAnswer(val.trim()); };

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>
      <div className="lq-id-row">
        <input
          className="lq-id-input"
          type="text"
          placeholder="Type your answer…"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !answered && submit()}
          disabled={answered}
        />
        <button
          className="lq-id-submit"
          onClick={submit}
          disabled={answered || !val.trim()}
        >
          Submit
        </button>
      </div>
      {answered && (
        <div
          className={`lq-feedback ${
            selected?.toLowerCase() === correct?.toLowerCase() ? "ok" : "bad"
          }`}
        >
          {selected?.toLowerCase() === correct?.toLowerCase()
            ? "✓ Correct!"
            : `✗ Correct answer: ${correct}`}
          {question.explanation && (
            <p className="lq-explanation">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

/* SCENARIO */
const Scenario = ({ question, onAnswer, answered, selected, correct }) => (
  <div className="lq-mc">
    {question.scenario && (
      <div className="lq-scenario-box">
        <span className="lq-scenario-label">Scenario</span>
        <p>{question.scenario}</p>
      </div>
    )}
    <p className="lq-q-text">{question.question}</p>
    <div className="lq-choices">
      {question.choices.map((ch, i) => {
        let cls = "lq-choice";
        if (answered) {
          if (ch === correct)         cls += " correct";
          else if (ch === selected)   cls += " wrong";
        }
        return (
          <button
            key={i}
            className={cls}
            onClick={() => !answered && onAnswer(ch)}
            disabled={answered}
          >
            <span className="lq-choice-letter">{String.fromCharCode(65 + i)}</span>
            {ch}
          </button>
        );
      })}
    </div>
    {answered && (
      <div className={`lq-feedback ${selected === correct ? "ok" : "bad"}`}>
        {selected === correct ? "✓ Correct!" : `✗ Correct answer: ${correct}`}
        {question.explanation && (
          <p className="lq-explanation">{question.explanation}</p>
        )}
      </div>
    )}
  </div>
);

/* KERNING SLIDE */
const KerningSlide = ({ question, onAnswer, answered }) => {
  const [offset, setOffset] = useState(0);
  const target    = question.targetOffset ?? 0;
  const tolerance = question.tolerance    ?? 5;

  const check = () => {
    const isCorrect = Math.abs(offset - target) <= tolerance;
    onAnswer(isCorrect ? "correct" : "incorrect", isCorrect);
  };

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>
      <div className="lq-kern-demo">
        <span className="lq-kern-letter" style={{ marginRight: `${offset}px` }}>
          {question.letterA}
        </span>
        <span className="lq-kern-letter">{question.letterB}</span>
      </div>
      <div className="lq-kern-slider-row">
        <span>Tight</span>
        <input
          type="range"
          min={question.min ?? -40}
          max={question.max ?? 40}
          value={offset}
          onChange={e => !answered && setOffset(Number(e.target.value))}
          disabled={answered}
          className="lq-slider"
        />
        <span>Loose</span>
      </div>
      {!answered && (
        <button className="lq-id-submit" style={{ marginTop: 12 }} onClick={check}>
          Lock In
        </button>
      )}
      {answered && (
        <div
          className={`lq-feedback ${
            Math.abs(offset - target) <= tolerance ? "ok" : "bad"
          }`}
        >
          {Math.abs(offset - target) <= tolerance
            ? "✓ Perfect kerning!"
            : `✗ Ideal offset: ${target}px`}
          {question.explanation && (
            <p className="lq-explanation">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

const LeadingLines     = (p) => <Scenario       {...p} />;
const XHeightDetective = (p) => <MultipleChoice  {...p} />;

/* ─────────────────────────────────────────
   RESULT SCREEN
───────────────────────────────────────── */
const ResultScreen = ({
  passed,
  correctCount,
  total,
  totalPoints,
  maxPoints,
  passMark,
  lessonTitle,
  onRetry,
  onNext,
  onHome,
}) => {
  const pct           = Math.round((correctCount / total)  * 100);
  const ptsPct        = Math.round((totalPoints  / maxPoints) * 100);
  const passMarkCount = Math.ceil(total * passMark);

  const tier =
    !passed   ? "Failed"  :
    pct >= 90 ? "Master"  :
    pct >= 70 ? "Skilled" : "Learner";

  const emojiMap = { Failed: "😞", Master: "🏆", Skilled: "🥈", Learner: "📚" };

  return (
    <div className="lq-result">

      {/* pass / fail badge */}
      <div className={`lq-result-badge ${passed ? "pass" : "fail"}`}>
        {passed ? "✓ PASSED" : "✗ FAILED"}
      </div>

      <div className="lq-result-emoji">{emojiMap[tier]}</div>
      <h2 className="lq-result-tier">{tier}</h2>

      <p className="lq-result-score">
        {correctCount} / {total} correct &nbsp;·&nbsp; {pct}%
      </p>

      <p className="lq-result-points">
        <span className="lq-pts-big">{totalPoints}</span>
        <span className="lq-pts-of"> / {maxPoints} pts</span>
      </p>

      <p className="lq-result-lesson">{lessonTitle}</p>

      <p className={`lq-result-passmark ${passed ? "ok" : "bad"}`}>
        {passed
          ? `✓ Pass mark met — ${passMarkCount}/${total} required`
          : `✗ Need ${passMarkCount}/${total} correct to pass`}
      </p>

      {/* accuracy bar */}
      <div className="lq-result-bar-section">
        <div className="lq-result-bar-label">Accuracy</div>
        <div className="lq-result-bar-wrap">
          <div
            className={`lq-result-bar ${passed ? "" : "fail-bar"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* points bar */}
      <div className="lq-result-bar-section">
        <div className="lq-result-bar-label">Points</div>
        <div className="lq-result-bar-wrap">
          <div className="lq-result-bar pts-bar" style={{ width: `${ptsPct}%` }} />
        </div>
      </div>

      <div className="lq-result-btns">
        <button className="lq-result-btn retry" onClick={onRetry}>
          Try Again
        </button>
        {passed && onNext && (
          <button className="lq-result-btn next" onClick={onNext}>
            Next Lesson →
          </button>
        )}
        <button className="lq-result-btn secondary" onClick={onHome}>
          Back to Lessons
        </button>
      </div>

      {!passed && (
        <p className="lq-result-hint">
          You need at least {passMarkCount} correct answers to proceed to the next lesson.
          Review the material and try again!
        </p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const LessonQuiz = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson]           = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");

  /* quiz progress */
  const [qIdx, setQIdx]               = useState(0);
  const [answered, setAnswered]       = useState(false);
  const [selected, setSelected]       = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalPoints, setTotalPoints]   = useState(0);
  const [itemPoints, setItemPoints]     = useState(null);
  const [itemCorrect, setItemCorrect]   = useState(null);
  const [finished, setFinished]         = useState(false);
  const [nextLessonId, setNextLessonId] = useState(null);

  /* timer */
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const timerRef                = useRef(null);
  const answeredRef             = useRef(false);  // ref copy to avoid stale closure in interval

  /* derived */
  const quiz          = lesson?.quiz ?? [];
  const currentQ      = quiz[qIdx];
  const maxPoints     = quiz.length * MAX_POINTS_PER_Q;
  const passMarkCount = Math.ceil(quiz.length * PASS_RATE);

  /* ── fetch lesson ── */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchLessonById(id);
        setLesson(data);
      } catch {
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ── start / reset timer whenever question changes ── */
  useEffect(() => {
    if (loading || !lesson || finished) return;

    answeredRef.current = false;
    setTimeLeft(TIME_PER_QUESTION);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!answeredRef.current) {
            answeredRef.current = true;
            /* auto-fail on timeout */
            setSelected("__timeout__");
            setAnswered(true);
            setItemPoints(0);
            setItemCorrect(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx, loading, finished]);

  /* ── stop timer on answer ── */
  useEffect(() => {
    if (answered) {
      answeredRef.current = true;
      clearInterval(timerRef.current);
    }
  }, [answered]);

  /* ── answer handler ── */
  const handleAnswer = useCallback(
    (userAnswer, forceCorrect) => {
      if (answered || answeredRef.current) return;

      clearInterval(timerRef.current);
      answeredRef.current = true;

      const isCorrect =
        forceCorrect !== undefined
          ? forceCorrect
          : userAnswer?.toLowerCase() === currentQ?.correctAnswer?.toLowerCase();

      /*
        Score formula:
          earned = floor( (timeLeft / TIME_PER_QUESTION) × MAX_POINTS_PER_Q )
          Minimum 1 pt if correct so last-second answers still reward.
      */
      const earned = isCorrect
        ? Math.max(1, Math.floor((timeLeft / TIME_PER_QUESTION) * MAX_POINTS_PER_Q))
        : 0;

      setSelected(userAnswer);
      setAnswered(true);
      setItemPoints(earned);
      setItemCorrect(isCorrect);

      if (isCorrect) {
        setCorrectCount(c => c + 1);
        setTotalPoints(p => p + earned);
      }
    },
    [answered, currentQ, timeLeft]
  );

  /* ── advance / finish ── */
  const handleNext = async () => {
    if (qIdx + 1 < quiz.length) {
      setQIdx(q => q + 1);
      setAnswered(false);
      setSelected(null);
      setItemPoints(null);
      setItemCorrect(null);
    } else {
      /* last question done */
      setFinished(true);

      const finalCorrect = correctCount;   // state already updated
      const passed       = finalCorrect >= passMarkCount;

      // Always submit the latest score (overwrites existing on retake)
      try {
        await submitQuizScore(lesson.title, totalPoints, passed);
      } catch (e) {
        console.warn("Score submission failed:", e);
      }

      // Mark lesson complete in DB so the next lesson unlocks on FrontPage
      if (passed) {
        try {
          await markLessonComplete(lesson._id);
        } catch (e) {
          console.warn("markLessonComplete failed:", e);
        }
      }

      /* find next lesson */
      try {
        const allLessons = await fetchAllLessons();
        const ordered    = [...allLessons].reverse();
        const idx        = ordered.findIndex(l => l._id === lesson._id);
        if (idx >= 0 && idx + 1 < ordered.length) {
          setNextLessonId(ordered[idx + 1]._id);
        }
      } catch (_) {}
    }
  };

  /* ── retry ── */
  const handleRetry = () => {
    setQIdx(0);
    setAnswered(false);
    setSelected(null);
    setCorrectCount(0);
    setTotalPoints(0);
    setItemPoints(null);
    setItemCorrect(null);
    setFinished(false);
    setTimeLeft(TIME_PER_QUESTION);
    answeredRef.current = false;
  };

  /* ─── render guards ─── */
  if (loading)
    return <MainLayout><div className="lq-loading">Loading quiz…</div></MainLayout>;
  if (error)
    return <MainLayout><div className="lq-error">{error}</div></MainLayout>;
  if (!lesson) return null;

  if (quiz.length === 0)
    return (
      <MainLayout>
        <div className="lq-empty">
          <p>No quiz available for this lesson yet.</p>
          <button className="lq-result-btn secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </MainLayout>
    );

  if (finished) {
    const passed = correctCount >= passMarkCount;
    return (
      <MainLayout>
        <div className="lq-wrapper">
          <ResultScreen
            passed={passed}
            correctCount={correctCount}
            total={quiz.length}
            totalPoints={totalPoints}
            maxPoints={maxPoints}
            passMark={PASS_RATE}
            lessonTitle={lesson.title}
            onRetry={handleRetry}
            onNext={passed && nextLessonId ? () => navigate(`/lessons/${nextLessonId}`) : null}
            onHome={() => navigate("/lessons")}
          />
        </div>
      </MainLayout>
    );
  }

  const progress     = (qIdx / quiz.length) * 100;
  const timerUrgent  = timeLeft <= 10 && !answered;

  const typeMap = {
    "multiple-choice":    MultipleChoice,
    "identification":     Identification,
    "scenario":           Scenario,
    "kerning-slide":      KerningSlide,
    "leading-lines":      LeadingLines,
    "x-height-detective": XHeightDetective,
  };
  const QuizComponent = typeMap[currentQ?.type] || MultipleChoice;

  return (
    <MainLayout>
      <div className="lq-wrapper">

        {/* ── TOP BAR ── */}
        <div className="lq-top">
          <button className="lq-back" onClick={() => navigate(-1)}>← Back</button>
          <span className="lq-counter">{qIdx + 1} / {quiz.length}</span>
          <span className="lq-score-live">
            {totalPoints}
            <span className="lq-pts-label"> pts</span>
          </span>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="lq-progress-bar-wrap">
          <div className="lq-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* ── META ROW ── */}
        <div className="lq-meta-row">
          <p className="lq-lesson-label">{lesson.title}</p>
          <p className="lq-passmark-label">
            Pass: {passMarkCount}/{quiz.length} correct
          </p>
        </div>

        {/* ── QUESTION CARD ── */}
        <div className={`lq-card ${timerUrgent ? "urgent" : ""}`}>

          <div className="lq-card-header">
            <div className="lq-q-num">Question {qIdx + 1}</div>
            <TimerRing timeLeft={timeLeft} total={TIME_PER_QUESTION} />
          </div>

          {/* timeout notice */}
          {selected === "__timeout__" ? (
            <div className="lq-timeout-notice">
              ⏰ Time's up! — Correct answer:&nbsp;
              <strong>{currentQ?.correctAnswer}</strong>
              {currentQ?.explanation && (
                <p className="lq-explanation">{currentQ.explanation}</p>
              )}
            </div>
          ) : (
            <QuizComponent
              question={currentQ}
              onAnswer={handleAnswer}
              answered={answered}
              selected={selected}
              correct={currentQ?.correctAnswer}
            />
          )}

          {/* points earned chip */}
          {answered && itemPoints !== null && (
            <ScoreChip points={itemPoints} isCorrect={itemCorrect} />
          )}
        </div>

        {/* ── NEXT BUTTON ── */}
        {answered && (
          <button className="lq-next-btn" onClick={handleNext}>
            {qIdx + 1 < quiz.length ? "Next Question →" : "See Results"}
          </button>
        )}

      </div>
    </MainLayout>
  );
};

export default LessonQuiz;