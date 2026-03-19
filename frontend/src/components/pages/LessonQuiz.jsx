import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessonById, fetchAllLessons, submitQuizScore, markLessonComplete } from "../../api/lessons";
import MainLayout from "../layout/MainLayout";
import "./LessonQuiz.css";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const TIME_PER_QUESTION = 30;
const MAX_POINTS_PER_Q  = 100;
const PASS_RATE         = 0.5;

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
          fill="none" stroke={color} strokeWidth="5"
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
          if (ch === correct)       cls += " correct";
          else if (ch === selected) cls += " wrong";
        }
        return (
          <button key={i} className={cls} onClick={() => !answered && onAnswer(ch)} disabled={answered}>
            <span className="lq-choice-letter">{String.fromCharCode(65 + i)}</span>
            {ch}
          </button>
        );
      })}
    </div>
    {answered && (
      <div className={`lq-feedback ${selected === correct ? "ok" : "bad"}`}>
        {selected === correct ? "✓ Correct!" : `✗ Correct answer: ${correct}`}
        {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
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
        <input className="lq-id-input" type="text" placeholder="Type your answer…"
          value={val} onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !answered && submit()} disabled={answered} />
        <button className="lq-id-submit" onClick={submit} disabled={answered || !val.trim()}>Submit</button>
      </div>
      {answered && (
        <div className={`lq-feedback ${selected?.toLowerCase() === correct?.toLowerCase() ? "ok" : "bad"}`}>
          {selected?.toLowerCase() === correct?.toLowerCase() ? "✓ Correct!" : `✗ Correct answer: ${correct}`}
          {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
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
          if (ch === correct)       cls += " correct";
          else if (ch === selected) cls += " wrong";
        }
        return (
          <button key={i} className={cls} onClick={() => !answered && onAnswer(ch)} disabled={answered}>
            <span className="lq-choice-letter">{String.fromCharCode(65 + i)}</span>
            {ch}
          </button>
        );
      })}
    </div>
    {answered && (
      <div className={`lq-feedback ${selected === correct ? "ok" : "bad"}`}>
        {selected === correct ? "✓ Correct!" : `✗ Correct answer: ${correct}`}
        {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
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
        <span className="lq-kern-letter" style={{ marginRight: `${offset}px` }}>{question.letterA}</span>
        <span className="lq-kern-letter">{question.letterB}</span>
      </div>
      <div className="lq-slider-value-row">
        <span className="lq-slider-value-badge">{offset}px</span>
      </div>
      <div className="lq-kern-slider-row">
        <span>Tight</span>
        <input type="range" min={question.min ?? -40} max={question.max ?? 40}
          value={offset} onChange={e => !answered && setOffset(Number(e.target.value))}
          disabled={answered} className="lq-slider" />
        <span>Loose</span>
      </div>
      {!answered && (
        <button className="lq-id-submit" style={{ marginTop: 12 }} onClick={check}>Lock In</button>
      )}
      {answered && (
        <div className={`lq-feedback ${Math.abs(offset - target) <= tolerance ? "ok" : "bad"}`}>
          {Math.abs(offset - target) <= tolerance ? "✓ Perfect kerning!" : `✗ Ideal offset: ${target}px`}
          {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};

/* LEADING LINES */
const LeadingLines = ({ question, onAnswer, answered }) => {
  const minL   = question.minLeading       ?? 10;
  const maxL   = question.maxLeading       ?? 60;
  const target = question.targetLeading    ?? 24;
  const tol    = question.toleranceLeading ?? 4;

  const [leading, setLeading] = useState(Math.round((minL + maxL) / 2));

  const check = () => {
    const isCorrect = Math.abs(leading - target) <= tol;
    onAnswer(isCorrect ? "correct" : "incorrect", isCorrect);
  };

  const s1 = question.sentence1 || "The quick brown fox jumps";
  const s2 = question.sentence2 || "over the lazy dog.";

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>
      <div className="lq-leading-preview">
        <div className="lq-leading-text" style={{ lineHeight: `${leading}px` }}>
          <span className="lq-leading-line">{s1}</span>
          <span className="lq-leading-line">{s2}</span>
        </div>
      </div>
      <div className="lq-slider-value-row">
        <span className="lq-slider-value-badge">{leading}px</span>
      </div>
      <div className="lq-kern-slider-row">
        <span>Tight</span>
        <input type="range" min={minL} max={maxL} value={leading}
          onChange={e => !answered && setLeading(Number(e.target.value))}
          disabled={answered} className="lq-slider" />
        <span>Loose</span>
      </div>
      {!answered && (
        <button className="lq-id-submit" style={{ marginTop: 12 }} onClick={check}>Lock In</button>
      )}
      {answered && (
        <div className={`lq-feedback ${Math.abs(leading - target) <= tol ? "ok" : "bad"}`}>
          {Math.abs(leading - target) <= tol
            ? `✓ Great spacing! ${leading}px is right in the sweet spot.`
            : `✗ Ideal leading: ${target}px (you set ${leading}px)`}
          {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   FONT SELECT
   — Shows canvas starting with wrongFont (broken state)
   — Emotional Matching Meter fills as player selects correct option
   — Supports multiple correct answers via correctAnswers[]
───────────────────────────────────────── */
const FontSelect = ({ question, onAnswer, answered, selected }) => {
  const [chosen, setChosen] = useState(null);

  const options       = question.typefaceOptions || [];
  const bgImage       = question.backgroundImage || "";
  const wrongFont     = question.wrongFont        || options[0]?.font || "serif";
  // Support both single correctAnswer and correctAnswers array
  const correctList   = question.correctAnswers?.length
    ? question.correctAnswers
    : question.correctAnswer
    ? [question.correctAnswer]
    : [];

  const isCorrectChoice = (title) => correctList.includes(title);

  // Active font: start with wrongFont, switch when player selects
  const activeFont = chosen ? chosen.font : wrongFont;

  // Meter: 0 when no choice / wrong font showing, 100 when correct selected
  const meterPct = answered
    ? isCorrectChoice(selected) ? 100 : 0
    : chosen
    ? isCorrectChoice(chosen.typefaceTitle) ? 100 : 20
    : 0;

  const handleSelect = (opt) => {
    if (answered) return;
    setChosen(opt);
  };

  const handleSubmit = () => {
    if (!chosen) return;
    onAnswer(chosen.typefaceTitle, isCorrectChoice(chosen.typefaceTitle));
  };

  const isAnswerCorrect = answered && isCorrectChoice(selected);

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>

      {/* Canvas */}
      <div
        className="lq-fontselect-canvas"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="lq-fontselect-canvas-inner">
          <p className="lq-fontselect-display" style={{ fontFamily: activeFont }}>
            {question.displayText || "Typography"}
          </p>
          {question.subtext && (
            <p className="lq-fontselect-subtext" style={{ fontFamily: activeFont }}>
              {question.subtext}
            </p>
          )}
        </div>
      </div>

      {/* Emotional Matching Meter */}
      <div className="lq-meter-wrap">
        <div className="lq-meter-label">
          <span>Emotional Match</span>
          <span className="lq-meter-pct">{meterPct}%</span>
        </div>
        <div className="lq-meter-bar-wrap">
          <div
            className={`lq-meter-bar ${meterPct === 100 ? "full" : meterPct > 0 ? "partial" : ""}`}
            style={{ width: `${meterPct}%` }}
          />
        </div>
      </div>

      {/* Typeface options */}
      <div className="lq-fontselect-options">
        {options.map((opt, i) => {
          let cls = "lq-fontselect-btn";
          if (answered) {
            if (isCorrectChoice(opt.typefaceTitle))                                      cls += " correct";
            else if (opt.typefaceTitle === selected && !isCorrectChoice(opt.typefaceTitle)) cls += " wrong";
          } else if (chosen?.typefaceTitle === opt.typefaceTitle) {
            cls += " active";
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={answered}>
              <span className="lq-fontselect-title" style={{ fontFamily: opt.font }}>
                {opt.typefaceTitle}
              </span>
              <span className="lq-fontselect-vibe">{opt.vibe}</span>
            </button>
          );
        })}
      </div>

      {!answered && chosen && (
        <button className="lq-id-submit" style={{ marginTop: 12 }} onClick={handleSubmit}>
          Choose This Font
        </button>
      )}

      {answered && (
        <div className={`lq-feedback ${isAnswerCorrect ? "ok" : "bad"}`}>
          {isAnswerCorrect
            ? "✓ Perfect match! The Emotional Matching Meter is at 100%."
            : `✗ Better choices: ${correctList.join(" or ")}`}
          {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   HIERARCHY BUILDER
   — Player sees all text layers at flat 16px (broken state)
   — Drag-assigns a role label to each layer
   — Correct when all layers have the right role assigned
───────────────────────────────────────── */
const ROLE_STYLES = {
  title:    { fontSize: "2.4rem",  fontWeight: "700", color: "#111111",  textTransform: "none"      },
  subtitle: { fontSize: "1.3rem",  fontWeight: "500", color: "#333333",  textTransform: "none"      },
  body:     { fontSize: "1rem",    fontWeight: "400", color: "#555555",  textTransform: "none"      },
  alert:    { fontSize: "0.95rem", fontWeight: "700", color: "#dc2626",  textTransform: "uppercase" },
};

const ROLE_LABELS = {
  title:    "Title — 48px Bold",
  subtitle: "Subtitle — 24px Medium",
  body:     "Body — 16px Regular",
  alert:    "Alert — Red Uppercase",
};

const HierarchyBuilder = ({ question, onAnswer, answered }) => {
  const layers        = question.textLayers    || [];
  const availableRoles = question.availableRoles || ["title", "subtitle", "body", "alert"];

  // assignments: { layerIndex: role }
  const [assignments, setAssignments] = useState({});

  const assign = (layerIdx, role) => {
    if (answered) return;
    setAssignments(prev => ({ ...prev, [layerIdx]: role }));
  };

  const allAssigned = layers.every((_, i) => assignments[i]);

  const handleSubmit = () => {
    if (!allAssigned) return;
    // Correct when every layer's assigned role matches its targetRole
    const isCorrect = layers.every((layer, i) => assignments[i] === layer.role);
    onAnswer(isCorrect ? "correct" : "incorrect", isCorrect);
  };

  // Derive live style for a layer based on its current assignment
  const getStyle = (layerIdx) => {
    const role = assignments[layerIdx];
    if (!role) return { fontSize: "1rem", fontWeight: "400", color: "#555555" };
    return ROLE_STYLES[role] || {};
  };

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>

      <p className="lq-hierarchy-hint">
        Assign the correct role to each text element. The preview updates live.
      </p>

      {/* Role legend */}
      <div className="lq-hierarchy-legend">
        {availableRoles.map(role => (
          <span key={role} className={`lq-role-badge lq-role-${role}`}>
            {ROLE_LABELS[role] || role}
          </span>
        ))}
      </div>

      {/* Text layers */}
      <div className="lq-hierarchy-layers">
        {layers.map((layer, i) => {
          const currentRole = answered ? layer.role : assignments[i];
          const style = answered ? (ROLE_STYLES[layer.role] || {}) : getStyle(i);
          const isWrong = answered && assignments[i] !== layer.role;
          const isRight = answered && assignments[i] === layer.role;

          return (
            <div
              key={i}
              className={`lq-hierarchy-row ${isRight ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
            >
              {/* Live text preview */}
              <div className="lq-hierarchy-preview" style={style}>
                {layer.text}
              </div>

              {/* Role selector */}
              {!answered ? (
                <select
                  className="lq-hierarchy-select"
                  value={assignments[i] || ""}
                  onChange={e => assign(i, e.target.value)}
                >
                  <option value="">— Assign role —</option>
                  {availableRoles.map(role => (
                    <option key={role} value={role}>{ROLE_LABELS[role] || role}</option>
                  ))}
                </select>
              ) : (
                <span className={`lq-hierarchy-tag lq-role-${layer.role}`}>
                  {isRight ? "✓ " : "✗ "}{ROLE_LABELS[layer.role] || layer.role}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!answered && (
        <button
          className="lq-id-submit"
          style={{ marginTop: 16 }}
          onClick={handleSubmit}
          disabled={!allAssigned}
        >
          {allAssigned ? "Submit Hierarchy" : `Assign all ${layers.length} elements first`}
        </button>
      )}

      {answered && (
        <div className={`lq-feedback ${layers.every((l, i) => assignments[i] === l.role) ? "ok" : "bad"}`}>
          {layers.every((l, i) => assignments[i] === l.role)
            ? "✓ The hierarchy is correct! The manual is now readable."
            : "✗ Some roles were wrong. The correct hierarchy is shown above."}
          {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   BRAND PAIRING
   — Canvas shows broken state (wrongHeadlineFont + wrongBodyFont)
   — Player picks a brand persona — both headline and body update live
   — correctAnswer = personaTitle of the right persona
───────────────────────────────────────── */
const BrandPairing = ({ question, onAnswer, answered, selected, correct }) => {
  const [chosen, setChosen] = useState(null);

  const personas         = question.brandPersonas    || [];
  const bgImage          = question.brandBackground  || "";
  const headlineText     = question.headlineText     || "Brand Name";
  const bodyText         = question.bodyText         || "Tagline or body copy goes here.";
  const wrongHeadline    = question.wrongHeadlineFont || "'Courier New', monospace";
  const wrongBody        = question.wrongBodyFont     || "'Comic Sans MS', cursive";

  const activeHeadline = chosen ? chosen.headlineFont : wrongHeadline;
  const activeBody     = chosen ? chosen.bodyFont     : wrongBody;

  const handleSelect = (persona) => {
    if (answered) return;
    setChosen(persona);
  };

  const handleSubmit = () => {
    if (!chosen) return;
    onAnswer(chosen.personaTitle);
  };

  const isCorrect = answered && selected === correct;

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>

      {/* Canvas */}
      <div
        className="lq-brandpair-canvas"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="lq-brandpair-canvas-inner">
          <p className="lq-brandpair-headline" style={{ fontFamily: activeHeadline }}>
            {headlineText}
          </p>
          <p className="lq-brandpair-body" style={{ fontFamily: activeBody }}>
            {bodyText}
          </p>
        </div>
      </div>

      {/* Persona options */}
      <div className="lq-brandpair-options">
        {personas.map((persona, i) => {
          let cls = "lq-brandpair-btn";
          if (answered) {
            if (persona.personaTitle === correct)  cls += " correct";
            else if (persona.personaTitle === selected && persona.personaTitle !== correct) cls += " wrong";
          } else if (chosen?.personaTitle === persona.personaTitle) {
            cls += " active";
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(persona)} disabled={answered}>
              <span className="lq-brandpair-persona-title">{persona.personaTitle}</span>
              <div className="lq-brandpair-fonts">
                <span style={{ fontFamily: persona.headlineFont }} className="lq-brandpair-font-preview">
                  {persona.headlineFont.split(",")[0].replace(/'/g, "")}
                </span>
                <span className="lq-brandpair-font-plus">+</span>
                <span style={{ fontFamily: persona.bodyFont }} className="lq-brandpair-font-preview">
                  {persona.bodyFont.split(",")[0].replace(/'/g, "")}
                </span>
              </div>
              <span className="lq-brandpair-vibe">{persona.vibe}</span>
            </button>
          );
        })}
      </div>

      {!answered && chosen && (
        <button className="lq-id-submit" style={{ marginTop: 12 }} onClick={handleSubmit}>
          Apply This Pairing
        </button>
      )}

      {answered && (
        <div className={`lq-feedback ${isCorrect ? "ok" : "bad"}`}>
          {isCorrect
            ? "✓ The brand identity is aligned. The logo activates!"
            : `✗ Correct pairing: ${correct}`}
          {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};

const XHeightDetective = (p) => <MultipleChoice {...p} />;

/* ─────────────────────────────────────────
   RESULT SCREEN
───────────────────────────────────────── */
const ResultScreen = ({
  passed, correctCount, total, totalPoints,
  maxPoints, passMark, lessonTitle,
  onRetry, onNext, onHome,
}) => {
  const pct           = Math.round((correctCount / total) * 100);
  const ptsPct        = Math.round((totalPoints / maxPoints) * 100);
  const passMarkCount = Math.ceil(total * passMark);
  const tier = !passed ? "Failed" : pct >= 90 ? "Master" : pct >= 70 ? "Skilled" : "Learner";
  const emojiMap = { Failed: "😞", Master: "🏆", Skilled: "🥈", Learner: "📚" };

  return (
    <div className="lq-result">
      <div className={`lq-result-badge ${passed ? "pass" : "fail"}`}>{passed ? "✓ PASSED" : "✗ FAILED"}</div>
      <div className="lq-result-emoji">{emojiMap[tier]}</div>
      <h2 className="lq-result-tier">{tier}</h2>
      <p className="lq-result-score">{correctCount} / {total} correct &nbsp;·&nbsp; {pct}%</p>
      <p className="lq-result-points">
        <span className="lq-pts-big">{totalPoints}</span>
        <span className="lq-pts-of"> / {maxPoints} pts</span>
      </p>
      <p className="lq-result-lesson">{lessonTitle}</p>
      <p className={`lq-result-passmark ${passed ? "ok" : "bad"}`}>
        {passed ? `✓ Pass mark met — ${passMarkCount}/${total} required` : `✗ Need ${passMarkCount}/${total} correct to pass`}
      </p>
      <div className="lq-result-bar-section">
        <div className="lq-result-bar-label">Accuracy</div>
        <div className="lq-result-bar-wrap">
          <div className={`lq-result-bar ${passed ? "" : "fail-bar"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="lq-result-bar-section">
        <div className="lq-result-bar-label">Points</div>
        <div className="lq-result-bar-wrap">
          <div className="lq-result-bar pts-bar" style={{ width: `${ptsPct}%` }} />
        </div>
      </div>
      <div className="lq-result-btns">
        <button className="lq-result-btn retry" onClick={onRetry}>Try Again</button>
        {passed && onNext && <button className="lq-result-btn next" onClick={onNext}>Next Lesson →</button>}
        <button className="lq-result-btn secondary" onClick={onHome}>Back to Lessons</button>
      </div>
      {!passed && (
        <p className="lq-result-hint">
          You need at least {passMarkCount} correct answers to proceed. Review the material and try again!
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

  const [lesson, setLesson]             = useState(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [qIdx, setQIdx]                 = useState(0);
  const [answered, setAnswered]         = useState(false);
  const [selected, setSelected]         = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalPoints, setTotalPoints]   = useState(0);
  const [itemPoints, setItemPoints]     = useState(null);
  const [itemCorrect, setItemCorrect]   = useState(null);
  const [finished, setFinished]         = useState(false);
  const [nextLessonId, setNextLessonId] = useState(null);
  const [timeLeft, setTimeLeft]         = useState(TIME_PER_QUESTION);

  const timerRef    = useRef(null);
  const answeredRef = useRef(false);

  const quiz          = lesson?.quiz ?? [];
  const currentQ      = quiz[qIdx];
  const maxPoints     = quiz.length * MAX_POINTS_PER_Q;
  const passMarkCount = Math.ceil(quiz.length * PASS_RATE);

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

  useEffect(() => {
    if (answered) {
      answeredRef.current = true;
      clearInterval(timerRef.current);
    }
  }, [answered]);

  const handleAnswer = useCallback(
    (userAnswer, forceCorrect) => {
      if (answered || answeredRef.current) return;
      clearInterval(timerRef.current);
      answeredRef.current = true;

      const isCorrect = forceCorrect !== undefined
        ? forceCorrect
        : userAnswer?.toLowerCase() === currentQ?.correctAnswer?.toLowerCase();

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

  const handleNext = async () => {
    if (qIdx + 1 < quiz.length) {
      setQIdx(q => q + 1);
      setAnswered(false);
      setSelected(null);
      setItemPoints(null);
      setItemCorrect(null);
    } else {
      setFinished(true);
      const passed = correctCount >= passMarkCount;
      try { await submitQuizScore(lesson.title, totalPoints, passed); } catch (e) { console.warn(e); }
      if (passed) { try { await markLessonComplete(lesson._id); } catch (e) { console.warn(e); } }
      try {
        const allLessons = await fetchAllLessons();
        const ordered    = [...allLessons].reverse();
        const idx        = ordered.findIndex(l => l._id === lesson._id);
        if (idx >= 0 && idx + 1 < ordered.length) setNextLessonId(ordered[idx + 1]._id);
      } catch (_) {}
    }
  };

  const handleRetry = () => {
    setQIdx(0); setAnswered(false); setSelected(null);
    setCorrectCount(0); setTotalPoints(0);
    setItemPoints(null); setItemCorrect(null);
    setFinished(false); setTimeLeft(TIME_PER_QUESTION);
    answeredRef.current = false;
  };

  if (loading) return <MainLayout><div className="lq-loading">Loading quiz…</div></MainLayout>;
  if (error)   return <MainLayout><div className="lq-error">{error}</div></MainLayout>;
  if (!lesson) return null;

  if (quiz.length === 0) return (
    <MainLayout>
      <div className="lq-empty">
        <p>No quiz available for this lesson yet.</p>
        <button className="lq-result-btn secondary" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </MainLayout>
  );

  if (finished) {
    const passed = correctCount >= passMarkCount;
    return (
      <MainLayout>
        <div className="lq-wrapper">
          <ResultScreen
            passed={passed} correctCount={correctCount} total={quiz.length}
            totalPoints={totalPoints} maxPoints={maxPoints} passMark={PASS_RATE}
            lessonTitle={lesson.title} onRetry={handleRetry}
            onNext={passed && nextLessonId ? () => navigate("/lessons") : null}
            onHome={() => navigate("/lessons")}
          />
        </div>
      </MainLayout>
    );
  }

  const progress    = (qIdx / quiz.length) * 100;
  const timerUrgent = timeLeft <= 10 && !answered;

  const typeMap = {
    "multiple-choice":    MultipleChoice,
    "identification":     Identification,
    "scenario":           Scenario,
    "kerning-slide":      KerningSlide,
    "leading-lines":      LeadingLines,
    "x-height-detective": XHeightDetective,
    "font-select":        FontSelect,
    "hierarchy-builder":  HierarchyBuilder,
    "brand-pairing":      BrandPairing,
  };
  const QuizComponent = typeMap[currentQ?.type] || MultipleChoice;

  return (
    <MainLayout>
      <div className="lq-wrapper">

        <div className="lq-top">
          <button className="lq-back" onClick={() => navigate(-1)}>← Back</button>
          <span className="lq-counter">{qIdx + 1} / {quiz.length}</span>
          <span className="lq-score-live">{totalPoints}<span className="lq-pts-label"> pts</span></span>
        </div>

        <div className="lq-progress-bar-wrap">
          <div className="lq-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="lq-meta-row">
          <p className="lq-lesson-label">{lesson.title}</p>
          <p className="lq-passmark-label">Pass: {passMarkCount}/{quiz.length} correct</p>
        </div>

        <div className={`lq-card ${timerUrgent ? "urgent" : ""}`}>
          <div className="lq-card-header">
            <div className="lq-q-num">Question {qIdx + 1}</div>
            <TimerRing timeLeft={timeLeft} total={TIME_PER_QUESTION} />
          </div>

          {selected === "__timeout__" ? (
            <div className="lq-timeout-notice">
              ⏰ Time's up! — Correct answer:&nbsp;<strong>{currentQ?.correctAnswer}</strong>
              {currentQ?.explanation && <p className="lq-explanation">{currentQ.explanation}</p>}
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

          {answered && itemPoints !== null && (
            <ScoreChip points={itemPoints} isCorrect={itemCorrect} />
          )}
        </div>

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