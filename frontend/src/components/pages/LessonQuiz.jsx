import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessonById, fetchAllLessons, submitQuizScore, markLessonComplete } from "../../api/lessons";
import MainLayout from "../layout/MainLayout";
import "./LessonQuiz.css";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const TIME_PER_QUESTION = 30;
const TIME_BRAND_PAIRING = 60; // Lesson 10 gets 60 seconds per scenario
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

  // ── Drag state ──────────────────────────────────────────────
  const [pos, setPos]     = useState({ x: null, y: null });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setPos({ x: null, y: null });
    setScale(1);
    setIsSelected(false);
  }, [question]);
  const [isSelected, setIsSelected] = useState(false);

  const [canvasAspect, setCanvasAspect] = useState(null);
  useEffect(() => {
    if (!bgImage) return;
    const img = new window.Image();
    img.onload = () => setCanvasAspect(img.naturalWidth / img.naturalHeight);
    img.src = bgImage;
  }, [bgImage]);

  const canvasRef    = useRef(null);
  const groupRef     = useRef(null);
  const dragging     = useRef(false);
  const resizing     = useRef(false);
  const dragStart    = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const resizeStart  = useRef({ mx: 0, my: 0, scale: 1, w: 0, h: 0 });

  // Centre the text group on first paint
  useEffect(() => {
    if (pos.x === null && canvasRef.current && groupRef.current) {
      const cr = canvasRef.current.getBoundingClientRect();
      const gr = groupRef.current.getBoundingClientRect();
      setPos({
        x: (cr.width  - gr.width)  / 2,
        y: (cr.height - gr.height) / 2,
      });
    }
  }, [pos]);

  // ── Drag handlers ───────────────────────────────────────────
  const onGroupPointerDown = (e) => {
    // Don't start drag if clicking the resize handle
    if (e.target.classList.contains("lq-fs-resize-handle")) return;
    e.stopPropagation();
    setIsSelected(true);
    dragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onGroupPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    const canvas = canvasRef.current;
    const group  = groupRef.current;
    if (!canvas || !group) return;

    const cr = canvas.getBoundingClientRect();
    const gr = group.getBoundingClientRect();
    const newX = Math.max(0, Math.min(dragStart.current.px + dx, cr.width  - gr.width));
    const newY = Math.max(0, Math.min(dragStart.current.py + dy, cr.height - gr.height));
    setPos({ x: newX, y: newY });
  };

  const onGroupPointerUp = () => { dragging.current = false; };

  // ── Resize handlers ─────────────────────────────────────────
  const onResizePointerDown = (e) => {
    e.stopPropagation();
    resizing.current = true;
    const gr = groupRef.current.getBoundingClientRect();
    resizeStart.current = {
      mx:    e.clientX,
      my:    e.clientY,
      scale: scale,
      w:     gr.width  / scale,
      h:     gr.height / scale,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onResizePointerMove = (e) => {
    if (!resizing.current) return;
    const dx       = e.clientX - resizeStart.current.mx;
    const dy       = e.clientY - resizeStart.current.my;
    const baseDim  = Math.max(resizeStart.current.w, resizeStart.current.h);
    const delta    = (dx + dy) / 2;
    const newScale = Math.max(0.4, Math.min(3.5, resizeStart.current.scale + delta / baseDim));
    setScale(newScale);
  };

  const onResizePointerUp = () => { resizing.current = false; };

  // Click outside canvas → deselect
  useEffect(() => {
    const handler = (e) => {
      if (canvasRef.current && !canvasRef.current.contains(e.target)) {
        setIsSelected(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  // ── Quiz logic ───────────────────────────────────────────────
  const options     = question.typefaceOptions || [];
  const bgImage     = question.backgroundImage || "";
  const wrongFont   = question.wrongFont || options[0]?.font || "serif";
  const correctList = question.correctAnswers?.length
    ? question.correctAnswers
    : question.correctAnswer ? [question.correctAnswer] : [];

  const isCorrectChoice = (title) => correctList.includes(title);
  const activeFont      = chosen ? chosen.font : wrongFont;

  const handleSelect  = (opt) => { if (answered) return; setChosen(opt); };
  const handleSubmit  = () => { if (!chosen) return; onAnswer(chosen.typefaceTitle, isCorrectChoice(chosen.typefaceTitle)); };
  const isAnswerCorrect = answered && isCorrectChoice(selected);

  const groupStyle = {
    position:   "absolute",
    left:       pos.x === null ? "50%" : pos.x,
    top:        pos.y === null ? "50%" : pos.y,
    transform:  pos.x === null
      ? `translate(-50%, -50%) scale(${scale})`
      : `scale(${scale})`,
    transformOrigin: "top left",
    cursor:     "grab",
    userSelect: "none",
    touchAction:"none",
    display:    "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign:  "center",
  };

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="lq-fontselect-canvas"
        style={{
          backgroundImage:    bgImage ? `url(${bgImage})` : "none",
          backgroundSize:     "cover",
          backgroundPosition: "center",
          position:           "relative",
          overflow:           "hidden",
          width:              "100%",
          ...(canvasAspect
            ? { aspectRatio: `${canvasAspect}`, height: "auto", minHeight: "unset" }
            : { height: 340 }),
        }}
        onClick={() => setIsSelected(false)}
      >
        {/* Draggable + resizable text group */}
        <div
          ref={groupRef}
          className={`lq-fs-text-group ${isSelected ? "selected" : ""}`}
          style={groupStyle}
          onPointerDown={onGroupPointerDown}
          onPointerMove={onGroupPointerMove}
          onPointerUp={onGroupPointerUp}
          onClick={(e) => { e.stopPropagation(); setIsSelected(true); }}
        >
          <p className="lq-fontselect-display" style={{ fontFamily: activeFont, margin: 0 }}>
            {question.displayText || "Typography"}
          </p>
          {question.subtext && (
            <p className="lq-fontselect-subtext" style={{ fontFamily: activeFont, margin: "6px 0 0" }}>
              {question.subtext}
            </p>
          )}

          {/* Resize handle — bottom-right corner */}
          {isSelected && (
            <div
              className="lq-fs-resize-handle"
              onPointerDown={onResizePointerDown}
              onPointerMove={onResizePointerMove}
              onPointerUp={onResizePointerUp}
            />
          )}
        </div>

        {/* Hint shown when nothing is selected */}
        {!isSelected && (
          <div className="lq-fs-canvas-hint">
            Click text to select · Drag to move · Drag corner to resize
          </div>
        )}
      </div>

      {/* Typeface options */}
      <div className="lq-fontselect-options">
        {options.map((opt, i) => {
          let cls = "lq-fontselect-btn";
          if (answered) {
            if (isCorrectChoice(opt.typefaceTitle))                                          cls += " correct";
            else if (opt.typefaceTitle === selected && !isCorrectChoice(opt.typefaceTitle))  cls += " wrong";
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
   — Canvas shows all text layers in "broken" flat state (same size/color)
   — Player assigns roles via selectors below the canvas
   — As roles are assigned the canvas updates live with correct typography
   — On submit, canvas snaps to fully correct or shows remaining errors
   — canvasImage (Cloudinary URL) is used as the canvas background
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   HIERARCHY BUILDER — NEW MECHANIC (Lesson 9)
   — All text elements start at 16px flat, shuffled order
   — Each element is draggable anywhere on the canvas
   — Clicking an element selects it → font-size slider appears below canvas
   — Slider adjusts only the selected element's fontSize (8–72px)
   — Both elements act independently
   — On submit: graded on (1) font sizes match targets (±4px tolerance)
     and (2) vertical order on canvas matches title > subtitle > body > caption
   — Score is percentage of correct elements × 100
───────────────────────────────────────── */

// Role display colours on canvas
const ROLE_COLORS = {
  title:    "#ffffff",
  subtitle: "#a3e0ff",
  body:     "#d1d5db",
  alert:    "#ff4444",
  caption:  "#9ca3af",
  discount: "#fbbf24",
  headline: "#ffffff",
  subheadline: "#e5e7eb",
  cta:      "#ffffff",
  warning:  "#ff4444",
  dosage:   "#ffffff",
  instructions: "#d1d5db",
  notes:    "#9ca3af",
  floor:    "#ffffff",
  roomRange:"#a3e0ff",
  direction:"#d1d5db",
  info:     "#9ca3af",
  artist:   "#ffffff",
  date:     "#a3e0ff",
  venue:    "#d1d5db",
  details:  "#9ca3af",
  keyPoint: "#fbbf24",
  supporting:"#d1d5db",
  footnote: "#9ca3af",
  step:     "#ffffff",
  instruction:"#d1d5db",
  tips:     "#9ca3af",
  price:    "#a3e0ff",
  description:"#d1d5db",
  productName:"#ffffff",
  sectionHeader:"#a3e0ff",
  keyTerms: "#fbbf24",
};

// Shuffle an array (Fisher-Yates)
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Single draggable text element on the canvas
const HierarchyTextEl = ({
  layer, idx, fontSize, fontColor, pos, isSelected, answered,
  onSelect, canvasRef,
}) => {
  const elRef      = useRef(null);
  const dragging   = useRef(false);
  const dragStart  = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  const onPointerDown = (e) => {
    if (answered) return;
    e.stopPropagation();
    dragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    const canvas = canvasRef.current;
    const el     = elRef.current;
    if (!canvas || !el) return;
    const cr  = canvas.getBoundingClientRect();
    const elR = el.getBoundingClientRect();
    const newX = Math.max(0, Math.min(dragStart.current.px + dx, cr.width  - elR.width));
    const newY = Math.max(0, Math.min(dragStart.current.py + dy, cr.height - elR.height));
    // Call parent updater via callback stored on ref to avoid stale closure
    onSelect(idx, { x: newX, y: newY }, false);
  };

  const onPointerUp = () => { dragging.current = false; };

  const color     = ROLE_COLORS[layer.role] || "#ffffff";
  const isAlert   = layer.role === "alert"   || layer.role === "warning";
  const fontWeight = (layer.targetWeight === "Bold" || isAlert) ? "700"
                   : layer.targetWeight === "Medium" ? "500" : "400";

  return (
    <div
      ref={elRef}
      className={`lq-hb-text-el ${isSelected ? "selected" : ""} ${answered ? "answered" : ""}`}
      style={{
        position:   "absolute",
        left:       pos.x,
        top:        pos.y,
        fontSize:   `${fontSize}px`,
        fontWeight,
        color: fontColor,
        textTransform: isAlert ? "uppercase" : "none",
        lineHeight: 1.2,
        cursor:     answered ? "default" : "grab",
        userSelect: "none",
        touchAction:"none",
        maxWidth:   "90%",
        textShadow: "0 1px 6px rgba(0,0,0,0.7)",
        transition: answered ? "font-size 0.3s ease, color 0.3s ease" : "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(idx, null, true); // true = toggle
      }}
    >
      {isAlert ? layer.text.toUpperCase() : layer.text}
    </div>
  );
};

const HierarchyBuilder = ({ question, onAnswer, answered }) => {
  const layers      = question.textLayers  || [];
  const canvasImage = question.canvasImage || "";

  // shuffled order — randomised once per question mount
  const [order, setOrder]       = useState(() => shuffleArray(layers.map((_, i) => i)));
  // fontSizes: { [layerIdx]: number } — all start at 16
  const [fontSizes, setFontSizes] = useState(() => Object.fromEntries(layers.map((_, i) => [i, 16])));
  const [fontColors, setFontColors] = useState(() => Object.fromEntries(layers.map((_, i) => [i, "#ffffff"])));
  // positions: { [layerIdx]: {x, y} } — spread vertically on mount
  const [positions, setPositions] = useState({});
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [scoreInfo, setScoreInfo]     = useState(null);

  const canvasRef = useRef(null);

  // Initialise positions spread down the canvas in shuffled order
  useEffect(() => {
    setOrder(shuffleArray(layers.map((_, i) => i)));
    setFontSizes(Object.fromEntries(layers.map((_, i) => [i, 16])));
    setSelectedIdx(null);
    setScoreInfo(null);
    setFontColors(Object.fromEntries(layers.map((_, i) => [i, "#ffffff"])));

    // Stagger initial Y positions so elements don't stack
    const initialPos = {};
    layers.forEach((_, i) => {
      initialPos[i] = { x: 24, y: 24 + i * 52 };
    });
    setPositions(initialPos);
  }, [question]);

  const [canvasAspect, setCanvasAspect] = useState(null);
  useEffect(() => {
    if (!canvasImage) return;
    const img = new window.Image();
    img.onload = () => setCanvasAspect(img.naturalWidth / img.naturalHeight);
    img.src = canvasImage;
  }, [canvasImage]);

  // Select + optionally update position
  const handleSelect = (idx, newPos, toggle = false) => {
    if (newPos) {
      setPositions(prev => ({ ...prev, [idx]: newPos }));
    } else if (toggle) {
      setSelectedIdx(prev => prev === idx ? null : idx);
    }
  };

  // Deselect when clicking canvas background
  const handleCanvasClick = () => setSelectedIdx(null);

  const currentSize = selectedIdx !== null ? (fontSizes[selectedIdx] ?? 16) : 16;

  const handleSlider = (e) => {
    if (selectedIdx === null) return;
    setFontSizes(prev => ({ ...prev, [selectedIdx]: +e.target.value }));
  };

  // ── Grading ─────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const SIZE_TOLERANCE = 4; // px
    let sizeCorrect  = 0;
    let orderCorrect = 0;

    // 1. Size check — each element vs its target
    const sizeResults = layers.map((layer, i) => {
      const diff = Math.abs((fontSizes[i] ?? 16) - layer.targetFontSize);
      return diff <= SIZE_TOLERANCE;
    });
    sizeCorrect = sizeResults.filter(Boolean).length;

    // 2. Order check — vertical position should match role hierarchy
    // Expected order top-to-bottom: title → subtitle/subheadline/headline/discount/cta/artist/floor/step/keyPoint/warning
    //   → body/instructions/productName/supporting/sectionHeader/roomRange/direction/date/venue/dosage
    //   → caption/notes/info/details/footnote/description/tips/keyTerms/price
    const ROLE_RANK = {
      title: 1, headline: 1, discount: 1, cta: 1, artist: 1, floor: 1, step: 1, warning: 1, alert: 1,
      subtitle: 2, subheadline: 2, productName: 2, keyPoint: 2, sectionHeader: 2, roomRange: 2, date: 2, venue: 2, dosage: 2,
      body: 3, instructions: 3, supporting: 3, direction: 3, instruction: 3, description: 3,
      caption: 4, notes: 4, info: 4, details: 4, footnote: 4, keyTerms: 4, tips: 4, price: 4,
    };

    // Sort layers by their canvas Y position
    const sorted = layers.map((layer, i) => ({
      i,
      role: layer.role,
      rank: ROLE_RANK[layer.role] ?? 3,
      y: positions[i]?.y ?? 0,
    })).sort((a, b) => a.y - b.y);

    // Check if Y-sorted ranks are non-decreasing
    let prevRank = 0;
    for (const el of sorted) {
      if (el.rank >= prevRank) { orderCorrect++; prevRank = el.rank; }
    }

    const total       = layers.length * 2; // size + order per element
    const earned      = sizeCorrect + orderCorrect;
    const scorePct    = Math.round((earned / total) * 100);
    const passed      = scorePct >= 50;

    setScoreInfo({ scorePct, sizeResults, passed });
    onAnswer(passed ? "correct" : "incorrect", passed);
  };

  const selectedLayer = selectedIdx !== null ? layers[selectedIdx] : null;

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>
      <p className="lq-hierarchy-hint" style={{ marginBottom: 8 }}>
        Click a text element to select it, then use the slider to set its font size. Drag elements to arrange them from largest (top) to smallest (bottom).
      </p>

      {/* ── CANVAS ── */}
      <div
        ref={canvasRef}
        className="lq-hierarchy-canvas"
        style={{
          backgroundImage:    canvasImage ? `url(${canvasImage})` : "none",
          backgroundSize:     "cover",
          backgroundPosition: "center",
          height:             340,
          minHeight:          340,
          position:           "relative",
          overflow:           "hidden",
          cursor:             "default",
        }}
        onClick={handleCanvasClick}
      >
        {layers.map((layer, i) => (
          <HierarchyTextEl
            key={i}
            layer={layer}
            idx={i}
            fontSize={fontSizes[i] ?? 16}
            fontColor={answered ? (ROLE_COLORS[layer.role] || "#ffffff") : (fontColors[i] ?? "#ffffff")}
            pos={positions[i] || { x: 24, y: 24 + i * 52 }}
            isSelected={selectedIdx === i}
            answered={answered}
            onSelect={handleSelect}
            canvasRef={canvasRef}
          />
        ))}

        {/* Canvas hint */}
        {!answered && selectedIdx === null && (
          <div className="lq-hierarchy-broken-label">
            ⚠ All text is 16px — fix the hierarchy
          </div>
        )}

        {/* Score overlay after submit */}
        {answered && scoreInfo && (
          <div className="lq-hb-score-overlay">
            <span className={`lq-hb-score-val ${scoreInfo.passed ? "pass" : "fail"}`}>
              {scoreInfo.scorePct}%
            </span>
            <span className="lq-hb-score-label">
              {scoreInfo.passed ? "Hierarchy Established!" : "Hierarchy Needs Work"}
            </span>
          </div>
        )}
      </div>

      {/* ── FONT SIZE SLIDER ── */}
      {!answered && (
        <div className="lq-hb-slider-wrap">
          {selectedLayer ? (
            <>
              <div className="lq-hb-slider-header">
                <span className="lq-hb-slider-name">
                  Editing: <strong>{selectedLayer.text.length > 40 ? selectedLayer.text.slice(0, 37) + "…" : selectedLayer.text}</strong>
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="color"
                    value={fontColors[selectedIdx] ?? "#ffffff"}
                    onChange={e => setFontColors(prev => ({ ...prev, [selectedIdx]: e.target.value }))}
                    style={{ width: 32, height: 32, border: "1.5px solid #d1d5db", borderRadius: 6, padding: 2, cursor: "pointer", background: "white" }}
                    title="Text color"
                  />
                  <span className="lq-hb-slider-px">{fontSizes[selectedIdx] ?? 16}px</span>
                </div>
              </div>
              <input
                type="range"
                min="8"
                max="72"
                value={fontSizes[selectedIdx] ?? 16}
                onChange={handleSlider}
                className="lq-hb-slider"
              />
              <div className="lq-hb-slider-ticks">
                <span>8px</span><span>24px</span><span>40px</span><span>56px</span><span>72px</span>
              </div>
            </>
          ) : (
            <div className="lq-hb-slider-idle">
              👆 Click a text element above to select it and adjust its size
            </div>
          )}
        </div>
      )}

      {/* ── SUBMIT ── */}
      {!answered && (
        <button
          className="lq-id-submit"
          style={{ marginTop: 14 }}
          onClick={handleSubmit}
        >
          Submit Hierarchy
        </button>
      )}

      {/* ── RESULT ── */}
      {answered && scoreInfo && (
        <div className={`lq-feedback ${scoreInfo.passed ? "ok" : "bad"}`}>
          {scoreInfo.passed
            ? `✓ ${scoreInfo.scorePct}% — The hierarchy is readable and well-structured.`
            : `✗ ${scoreInfo.scorePct}% — The hierarchy needs adjustment. Check sizes and vertical order.`}
          {question.explanation && <p className="lq-explanation">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   BRAND IDENTITY — LESSON 10
   Full typography workbench: font pairing + size + position (drag) + kerning + leading + tracking
   Graded on 10 typography principles. Timer starts only after instructions modal is dismissed.
───────────────────────────────────────── */

/* ── Google Font loader (reuse from FontSelect) ── */
const loadedBPFonts = new Set();
const loadBPFont = (fontName) => {
  if (!fontName || loadedBPFonts.has(fontName)) return;
  loadedBPFonts.add(fontName);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g,"+")}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
};

/* Available fonts grouped */
const BP_FONTS = [
  "Orbitron","Audiowide","Exo 2","Roboto Mono","Roboto","Open Sans",
  "Playfair Display","Merriweather","Lora","Libre Baskerville","Source Sans 3",
  "Cormorant Garamond","Montserrat","Didot","EB Garamond",
  "Quicksand","Raleway","Poppins","Lato",
  "Press Start 2P","Abril Fatface",
];

/* Colour contrast helper — luminance ratio */
const getLuminance = (hex) => {
  const c = hex.replace("#","");
  const r = parseInt(c.slice(0,2),16)/255;
  const g = parseInt(c.slice(2,4),16)/255;
  const b = parseInt(c.slice(4,6),16)/255;
  const toLinear = x => x <= 0.03928 ? x/12.92 : Math.pow((x+0.055)/1.055,2.4);
  return 0.2126*toLinear(r)+0.7152*toLinear(g)+0.0722*toLinear(b);
};
const contrastRatio = (hex1, hex2) => {
  const l1 = getLuminance(hex1), l2 = getLuminance(hex2);
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
};

/* Ideal targets per scenario (keyed by correctAnswer / personaTitle) */
const IDEAL_TARGETS = {
  "The High-Tech Startup":    { headlineFont:"Orbitron",    bodyFont:"Roboto",          kerning:-5, leading:48, bodyLeading:22, tracking:0, alignment:"left",   bgLuminance:"dark",   tone:"Futuristic" },
  "Heritage Coffee Shop":     { headlineFont:"Playfair Display", bodyFont:"Source Sans 3", kerning:0, leading:44, bodyLeading:22, tracking:0, alignment:"left",   bgLuminance:"warm",   tone:"Warm" },
  "Luxury Fashion Boutique":  { headlineFont:"Cormorant Garamond", bodyFont:"Montserrat", kerning:-2, leading:50, bodyLeading:24, tracking:0, alignment:"center", bgLuminance:"light",  tone:"Luxury" },
  "Eco Skincare Brand":       { headlineFont:"Quicksand",   bodyFont:"Lora",            kerning:-1, leading:42, bodyLeading:20, tracking:0, alignment:"center", bgLuminance:"light",  tone:"Organic" },
  "Futuristic Fitness App":   { headlineFont:"Exo 2",       bodyFont:"Roboto",          kerning:-3, leading:44, bodyLeading:22, tracking:0, alignment:"left",   bgLuminance:"light",  tone:"Energetic" },
  "Art Gallery":              { headlineFont:"Playfair Display", bodyFont:"Lato",        kerning:-1, leading:48, bodyLeading:22, tracking:0, alignment:"left",   bgLuminance:"light",  tone:"Premium" },
  "Gaming Startup":           { headlineFont:"Orbitron",    bodyFont:"Exo 2",           kerning:-5, leading:50, bodyLeading:24, tracking:0, alignment:"left",   bgLuminance:"dark",   tone:"Dynamic" },
  "Modern Cafe":              { headlineFont:"Montserrat",  bodyFont:"Quicksand",       kerning:-2, leading:44, bodyLeading:22, tracking:0, alignment:"center", bgLuminance:"warm",   tone:"Friendly" },
  "AI Consulting":            { headlineFont:"Orbitron",    bodyFont:"Roboto",          kerning:-4, leading:48, bodyLeading:22, tracking:0, alignment:"left",   bgLuminance:"dark",   tone:"Futuristic" },
  "High-End Hotel":           { headlineFont:"Cormorant Garamond", bodyFont:"Montserrat", kerning:-2, leading:50, bodyLeading:24, tracking:0, alignment:"center", bgLuminance:"light",  tone:"Elegant" },
};

/* Tone → matching font families */
const TONE_FONTS = {
  Futuristic: ["Orbitron","Audiowide","Exo 2","Roboto Mono"],
  Warm:       ["Playfair Display","Merriweather","Lora","Libre Baskerville"],
  Luxury:     ["Cormorant Garamond","Playfair Display","EB Garamond"],
  Organic:    ["Quicksand","Raleway","Poppins","Lato"],
  Energetic:  ["Exo 2","Orbitron","Roboto","Raleway"],
  Premium:    ["Playfair Display","Lora","Abril Fatface","EB Garamond"],
  Dynamic:    ["Orbitron","Exo 2","Press Start 2P","Audiowide"],
  Friendly:   ["Montserrat","Quicksand","Poppins","Lato"],
  Elegant:    ["Cormorant Garamond","Playfair Display","Lora","EB Garamond"],
};

/* ── Grade a submission ── */
const gradeBrandIdentity = (state, question) => {
  const target = IDEAL_TARGETS[question.correctAnswer] || {};
  const results = [];

  // 1. Typeface Selection
  const hOk = state.headlineFont === target.headlineFont;
  const bOk = state.bodyFont     === target.bodyFont;
  const fontScore = hOk && bOk ? 100 : hOk || bOk ? 60 : 20;
  results.push({ label: "Typeface Selection", score: fontScore,
    feedback: fontScore===100 ? "✅ Excellent — perfect font pairing for the brand" :
              fontScore===60  ? "🟡 Good — one font matches but the pairing needs work" :
                                "🔴 Needs Adjustment — neither font matches the brand identity" });

  // 2. Hierarchy / Scale
  const hDiff = Math.abs(state.headlineSize - state.bodySize);
  const hierarchyScore = hDiff >= 20 ? 100 : hDiff >= 10 ? 70 : 30;
  results.push({ label: "Hierarchy / Scale", score: hierarchyScore,
    feedback: hierarchyScore===100 ? "✅ Good Job — clear size contrast between headline and body" :
              hierarchyScore===70  ? "🟡 Too Close — increase size difference between headline and body" :
                                     "🔴 Too Close — headline and body are nearly the same size" });

  // 3. Kerning
  const kDiff = Math.abs(state.kerning - (target.kerning ?? 0));
  const kerningScore = kDiff <= 1 ? 100 : kDiff <= 3 ? 75 : 40;
  results.push({ label: "Kerning", score: kerningScore,
    feedback: kerningScore===100 ? "✅ Excellent — letter spacing is perfectly balanced" :
              kerningScore===75  ? "🟡 Very Good — kerning is close, minor adjustment needed" :
                                   `🔴 ${state.kerning < (target.kerning??0) ? "Too Tight" : "Too Loose"} — adjust kerning closer to ${target.kerning}%` });

  // 4. Leading
  const lDiff = Math.abs(state.leading - (target.leading ?? 48));
  const leadingScore = lDiff <= 2 ? 100 : lDiff <= 6 ? 75 : 40;
  results.push({ label: "Leading", score: leadingScore,
    feedback: leadingScore===100 ? "✅ Excellent — line height is perfectly spaced" :
              leadingScore===75  ? "🟡 Very Good — leading is close, slight adjustment needed" :
                                   `🔴 ${state.leading < (target.leading??48) ? "Too Tight" : "Too Loose"} — target ~${target.leading}px` });

  // 5. Tracking
  const tDiff = Math.abs(state.tracking - (target.tracking ?? 0));
  const trackingScore = tDiff === 0 ? 100 : tDiff <= 2 ? 80 : 50;
  results.push({ label: "Tracking", score: trackingScore,
    feedback: trackingScore===100 ? "✅ Excellent — overall letter spacing is balanced" :
              trackingScore===80  ? "🟡 Good — tracking is slightly off from ideal" :
                                    `🔴 ${state.tracking > 0 ? "Too Loose" : "Too Tight"} — adjust tracking to ${target.tracking}%` });

  // 6. Alignment
  const alignScore = state.alignment === (target.alignment ?? "left") ? 100 : 50;
  results.push({ label: "Alignment", score: alignScore,
    feedback: alignScore===100 ? `✅ Good — ${state.alignment} alignment suits the brand` :
                                  `🟡 Needs Adjustment — ${target.alignment} alignment works better for this brand` });

  // 7. Contrast / Readability — text colour vs bg luminance
  const bgDark = target.bgLuminance === "dark";
  const hlColor = state.headlineColor || "#ffffff";
  const bodyColor = state.bodyColor || "#ffffff";
  // For dark bg: need light text (high contrast); for light bg: need dark text
  const hlLum   = getLuminance(hlColor);
  const bodyLum = getLuminance(bodyColor);
  const contrastOk = bgDark
    ? (hlLum > 0.3 && bodyLum > 0.2)
    : (hlLum < 0.5 && bodyLum < 0.5);
  const contrastScore = contrastOk ? 100 : 55;
  results.push({ label: "Contrast / Readability", score: contrastScore,
    feedback: contrastScore===100 ? "✅ Excellent — text is highly readable against the background" :
                                    `🔴 Too Low — use ${bgDark ? "lighter" : "darker"} text colours for better readability` });

  // 8. Consistency
  const headlineToneFonts = TONE_FONTS[target.tone] || [];
  const bodyIsComplement  = state.bodyFont !== state.headlineFont;
  const consistencyScore  = (headlineToneFonts.includes(state.headlineFont) && bodyIsComplement) ? 100 :
                             bodyIsComplement ? 65 : 30;
  results.push({ label: "Consistency", score: consistencyScore,
    feedback: consistencyScore===100 ? "✅ Excellent — fonts are consistent with brand tone" :
              consistencyScore===65  ? "🟡 Good — fonts differ but tone alignment could improve" :
                                       "🔴 Needs Adjustment — avoid using the same font for both headline and body" });

  // 9. Whitespace & Composition
  // Check: are both text elements positioned? Are they not overlapping?
  const hPos = state.headlinePos || { x: 0, y: 0 };
  const bPos = state.bodyPos     || { x: 0, y: 0 };
  const vertDist = Math.abs(hPos.y - bPos.y);
  const whitespaceScore = vertDist >= 40 ? 100 : vertDist >= 20 ? 70 : 40;
  results.push({ label: "Whitespace & Composition", score: whitespaceScore,
    feedback: whitespaceScore===100 ? "✅ Excellent — elements are well-spaced with breathing room" :
              whitespaceScore===70  ? "🟡 Balanced — slight crowding between elements" :
                                      "🔴 Too Crowded — increase vertical spacing between text elements" });

  // 10. Emotional Tone (Semiotics)
  const toneMatch = headlineToneFonts.includes(state.headlineFont);
  const toneScore = toneMatch ? 100 : 30;
  results.push({ label: "Emotional Tone", score: toneScore,
    feedback: toneScore===100 ? `✅ Excellent — typography communicates the "${target.tone}" brand feeling` :
                                 `🔴 Misaligned — choose fonts that express "${target.tone}" to match the brand` });

  const total = Math.round(results.reduce((s,r) => s + r.score, 0) / results.length);
  return { results, total, passed: total >= 60 };
};

/* ── Draggable text element ── */
const BPTextEl = ({ text, elKey, style, pos, isSelected, answered, onSelect, canvasRef }) => {
  const elRef    = useRef(null);
  const dragging = useRef(false);
  const origin   = useRef({ mx:0, my:0, px:0, py:0 });

  const onPD = (e) => {
    if (answered) return;
    e.stopPropagation();
    dragging.current = true;
    origin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPM = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - origin.current.mx;
    const dy = e.clientY - origin.current.my;
    const cr = canvasRef.current?.getBoundingClientRect();
    const er = elRef.current?.getBoundingClientRect();
    if (!cr || !er) return;
    onSelect(elKey, { x: Math.max(0, Math.min(origin.current.px+dx, cr.width-er.width)), y: Math.max(0, Math.min(origin.current.py+dy, cr.height-er.height)) }, false);
  };
  const onPU = () => { dragging.current = false; };

  return (
    <div
      ref={elRef}
      className={`lq-bp-text-el ${isSelected?"selected":""} ${answered?"answered":""}`}
      style={{ position:"absolute", left:pos.x, top:pos.y, cursor:answered?"default":"grab",
               userSelect:"none", touchAction:"none", ...style,
               outline: isSelected ? "2px dashed rgba(255,255,255,0.7)" : "2px solid transparent",
               padding:"4px 8px", borderRadius:4 }}
      onPointerDown={onPD}
      onPointerMove={onPM}
      onPointerUp={onPU}
      onClick={(e) => { e.stopPropagation(); onSelect(elKey, null, true); }}
    >
      {text}
    </div>
  );
};

/* ── Main BrandPairing component ── */
const BrandPairing = ({ question, onAnswer, answered, selected, correct, onTimerStart }) => {
  const personas      = question.brandPersonas   || [];
  const bgImage       = question.brandBackground || "";
  const headlineText  = question.headlineText    || "Brand Name";
  const bodyText      = question.bodyText        || "Tagline here.";
  const wrongHL       = question.wrongHeadlineFont || "'Courier New', monospace";
  const wrongBody     = question.wrongBodyFont     || "'Comic Sans MS', cursive";

  // Extract font name from CSS font string
  const extractFont = (cssFont) => cssFont.split(",")[0].replace(/'/g,"").trim();

  const [chosenPersona, setChosenPersona] = useState(null);

  // Typography state
  const [headlineFont,  setHeadlineFont]  = useState(() => extractFont(wrongHL));
  const [bodyFont,      setBodyFont]      = useState(() => extractFont(wrongBody));
  const [headlineSize,  setHeadlineSize]  = useState(32);
  const [bodySize,      setBodySize]      = useState(14);
  const [headlineColor, setHeadlineColor] = useState("#ffffff");
  const [bodyColor,     setBodyColor]     = useState("#ffffff");
  const [kerning,       setKerning]       = useState(0);
  const [leading,       setLeading]       = useState(48);
  const [tracking,      setTracking]      = useState(0);
  const [alignment,     setAlignment]     = useState("left");

  // Positions
  const [headlinePos, setHeadlinePos] = useState({ x: 24, y: 40 });
  const [bodyPos,     setBodyPos]     = useState({ x: 24, y: 120 });
  const [selectedEl,  setSelectedEl]  = useState(null);

  // Feedback
  const [gradeResult, setGradeResult] = useState(null);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [fontPickerTarget, setFontPickerTarget] = useState("headline");

  const canvasRef = useRef(null);

  // Load fonts
  useEffect(() => { BP_FONTS.forEach(loadBPFont); }, []);
  useEffect(() => { loadBPFont(headlineFont); }, [headlineFont]);
  useEffect(() => { loadBPFont(bodyFont); }, [bodyFont]);

  // Reset on new question
  useEffect(() => {
    setChosenPersona(null);
    setHeadlineFont(extractFont(wrongHL));
    setBodyFont(extractFont(wrongBody));
    setHeadlineSize(32); setBodySize(14);
    setHeadlineColor("#ffffff"); setBodyColor("#ffffff");
    setKerning(0); setLeading(48); setTracking(0); setAlignment("left");
    setHeadlinePos({ x: 24, y: 40 }); setBodyPos({ x: 24, y: 120 });
    setSelectedEl(null); setGradeResult(null);
  }, [question]);

  // Apply persona → set fonts
  const applyPersona = (persona) => {
    if (answered) return;
    setChosenPersona(persona);
    setHeadlineFont(extractFont(persona.headlineFont));
    setBodyFont(extractFont(persona.bodyFont));
  };

  // Select element (toggle) or update position
  const handleElSelect = (key, newPos, toggle) => {
    if (newPos) {
      if (key === "headline") setHeadlinePos(newPos);
      else setBodyPos(newPos);
    } else if (toggle) {
      setSelectedEl(prev => prev === key ? null : key);
    }
  };

  const handleCanvasClick = () => setSelectedEl(null);

  const handleSubmit = () => {
    if (!chosenPersona) return;
    const state = {
      headlineFont, bodyFont, headlineSize, bodySize,
      headlineColor, bodyColor, kerning, leading, tracking, alignment,
      headlinePos, bodyPos,
    };
    const grade = gradeBrandIdentity(state, question);
    setGradeResult(grade);
    onAnswer(chosenPersona.personaTitle, grade.passed);
  };

  const headlineCss = `'${headlineFont}', sans-serif`;
  const bodyCss     = `'${bodyFont}', sans-serif`;

  const curFont  = selectedEl === "headline" ? headlineFont : bodyFont;
  const curSize  = selectedEl === "headline" ? headlineSize : bodySize;
  const curColor = selectedEl === "headline" ? headlineColor : bodyColor;
  const setFont  = (v) => selectedEl === "headline" ? setHeadlineFont(v) : setBodyFont(v);
  const setSize  = (v) => selectedEl === "headline" ? setHeadlineSize(v) : setBodySize(v);
  const setColor = (v) => selectedEl === "headline" ? setHeadlineColor(v) : setBodyColor(v);

  const isCorrect = answered && selected === correct;

  // Detect canvas aspect ratio from bg image
  const [canvasAspect, setCanvasAspect] = useState(null);
  useEffect(() => {
    if (!bgImage) return;
    const img = new Image();
    img.onload = () => setCanvasAspect(img.naturalWidth / img.naturalHeight);
    img.src = bgImage;
  }, [bgImage]);

  const canvasStyle = canvasAspect
    ? { width: "100%", aspectRatio: `${canvasAspect}`, height: "auto", minHeight: "unset" }
    : { width: "100%", height: 340 };

  return (
    <div className="lq-mc">
      <p className="lq-q-text">{question.question}</p>

      {/* ── CANVAS ── */}
      <div
        ref={canvasRef}
        className="lq-brandpair-canvas"
        style={{
          ...canvasStyle,
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover", backgroundPosition: "center",
          position: "relative", overflow: "hidden", cursor: "default",
        }}
        onClick={handleCanvasClick}
      >
        <BPTextEl
          text={headlineText} elKey="headline"
          style={{
            fontFamily: headlineCss, fontSize: headlineSize,
            color: headlineColor, letterSpacing: `${kerning * 0.01}em`,
            lineHeight: `${leading / headlineSize}`,
            textAlign: alignment, fontWeight: 700,
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
          pos={headlinePos} isSelected={selectedEl==="headline"}
          answered={answered} onSelect={handleElSelect} canvasRef={canvasRef}
        />
        <BPTextEl
          text={bodyText} elKey="body"
          style={{
            fontFamily: bodyCss, fontSize: bodySize,
            color: bodyColor, letterSpacing: `${tracking * 0.01}em`,
            lineHeight: `${leading / bodySize}`, textAlign: alignment,
            fontWeight: 400, maxWidth: "80%",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
          pos={bodyPos} isSelected={selectedEl==="body"}
          answered={answered} onSelect={handleElSelect} canvasRef={canvasRef}
        />

        {!answered && selectedEl === null && (
          <div className="lq-hierarchy-broken-label">Click a text element to select it</div>
        )}

        {/* Grade overlay after submit */}
        {answered && gradeResult && (
          <div className="lq-hb-score-overlay">
            <span className={`lq-hb-score-val ${gradeResult.passed ? "pass" : "fail"}`}>
              {gradeResult.total}%
            </span>
            <span className="lq-hb-score-label">Brand Cohesion Score</span>
          </div>
        )}
      </div>

      {/* ── TYPOGRAPHY CONTROLS ── */}
      {!answered && (
        <div className="lq-bp-controls">

          {/* Element selector */}
          <div className="lq-bp-el-tabs">
            <button className={`lq-bp-el-tab ${selectedEl==="headline"?"active":""}`}
              onClick={() => setSelectedEl(prev => prev==="headline" ? null : "headline")}>
              Headline
            </button>
            <button className={`lq-bp-el-tab ${selectedEl==="body"?"active":""}`}
              onClick={() => setSelectedEl(prev => prev==="body" ? null : "body")}>
              Body Text
            </button>
          </div>

          {selectedEl ? (
            <div className="lq-bp-panel">

              {/* Font picker */}
              <div className="lq-bp-control-row">
                <label className="lq-bp-ctrl-label">Typeface</label>
                <div className="lq-bp-font-selector">
                  <button className="lq-bp-font-trigger"
                    onClick={() => setShowFontPicker(p => !p)}
                    style={{ fontFamily: `'${curFont}', sans-serif` }}>
                    {curFont} ▾
                  </button>
                  {showFontPicker && (
                    <div className="lq-bp-font-dropdown">
                      {BP_FONTS.map(f => (
                        <button key={f} className={`lq-bp-font-opt ${curFont===f?"active":""}`}
                          style={{ fontFamily: `'${f}', sans-serif` }}
                          onClick={() => { setFont(f); setShowFontPicker(false); }}>
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Size */}
              <div className="lq-bp-control-row">
                <label className="lq-bp-ctrl-label">Size</label>
                <div className="lq-bp-slider-wrap">
                  <span className="lq-bp-val">{curSize}px</span>
                  <input type="range" min="8" max="80" value={curSize}
                    onChange={e => setSize(+e.target.value)} className="lq-hb-slider" />
                </div>
              </div>

              {/* Color */}
              <div className="lq-bp-control-row">
                <label className="lq-bp-ctrl-label">Color</label>
                <input type="color" value={curColor}
                  onChange={e => setColor(e.target.value)} className="lq-bp-color" />
                <span className="lq-bp-val" style={{ marginLeft: 6 }}>{curColor}</span>
              </div>

              {/* Kerning — applies to headline only */}
              {selectedEl === "headline" && (
                <div className="lq-bp-control-row">
                  <label className="lq-bp-ctrl-label">Kerning</label>
                  <div className="lq-bp-slider-wrap">
                    <span className="lq-bp-val">{kerning}%</span>
                    <input type="range" min="-10" max="10" step="0.5" value={kerning}
                      onChange={e => setKerning(+e.target.value)} className="lq-hb-slider" />
                  </div>
                </div>
              )}

              {/* Leading */}
              <div className="lq-bp-control-row">
                <label className="lq-bp-ctrl-label">Leading</label>
                <div className="lq-bp-slider-wrap">
                  <span className="lq-bp-val">{leading}px</span>
                  <input type="range" min="12" max="80" value={leading}
                    onChange={e => setLeading(+e.target.value)} className="lq-hb-slider" />
                </div>
              </div>

              {/* Tracking — applies to body only */}
              {selectedEl === "body" && (
                <div className="lq-bp-control-row">
                  <label className="lq-bp-ctrl-label">Tracking</label>
                  <div className="lq-bp-slider-wrap">
                    <span className="lq-bp-val">{tracking}%</span>
                    <input type="range" min="-5" max="20" step="0.5" value={tracking}
                      onChange={e => setTracking(+e.target.value)} className="lq-hb-slider" />
                  </div>
                </div>
              )}

              {/* Alignment */}
              <div className="lq-bp-control-row">
                <label className="lq-bp-ctrl-label">Align</label>
                <div className="lq-bp-align-btns">
                  {["left","center","right"].map(a => (
                    <button key={a} className={`lq-bp-align-btn ${alignment===a?"active":""}`}
                      onClick={() => setAlignment(a)}>
                      {a==="left" ? "⬛▪▪" : a==="center" ? "▪⬛▪" : "▪▪⬛"}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="lq-hb-slider-idle">
              👆 Select Headline or Body Text above to adjust its properties
            </div>
          )}

          {/* Persona selector */}
          <div className="lq-bp-persona-section">
            <p className="lq-bp-persona-label">Font Pairing Presets</p>
            <div className="lq-brandpair-options">
              {personas.map((persona, i) => (
                <button key={i}
                  className={`lq-brandpair-btn ${chosenPersona?.personaTitle===persona.personaTitle?"active":""}`}
                  onClick={() => applyPersona(persona)}>
                  <span className="lq-brandpair-persona-title">{persona.personaTitle}</span>
                  <div className="lq-brandpair-fonts">
                    <span style={{ fontFamily: persona.headlineFont }} className="lq-brandpair-font-preview">
                      {persona.headlineFont.split(",")[0].replace(/'/g,"")}
                    </span>
                    <span className="lq-brandpair-font-plus">+</span>
                    <span style={{ fontFamily: persona.bodyFont }} className="lq-brandpair-font-preview">
                      {persona.bodyFont.split(",")[0].replace(/'/g,"")}
                    </span>
                  </div>
                  <span className="lq-brandpair-vibe">{persona.vibe}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Submit */}
      {!answered && chosenPersona && (
        <button className="lq-id-submit" style={{ marginTop: 12 }} onClick={handleSubmit}>
          Submit Brand Identity
        </button>
      )}

      {/* Detailed feedback */}
      {answered && gradeResult && (
        <div className={`lq-bp-feedback-wrap ${gradeResult.passed ? "ok" : "bad"}`}>
          <div className="lq-bp-feedback-header">
            <span className={`lq-bp-total ${gradeResult.passed ? "pass" : "fail"}`}>
              {gradeResult.total}% Brand Cohesion
            </span>
            <span className="lq-bp-verdict">
              {gradeResult.passed ? "✅ Brand identity achieved!" : "⚠️ Brand identity needs work"}
            </span>
          </div>
          <div className="lq-bp-feedback-grid">
            {gradeResult.results.map((r, i) => (
              <div key={i} className={`lq-bp-feedback-row ${r.score>=90?"excellent":r.score>=70?"good":"poor"}`}>
                <div className="lq-bp-feedback-label">{r.label}</div>
                <div className="lq-bp-feedback-bar-wrap">
                  <div className="lq-bp-feedback-bar" style={{ width: `${r.score}%` }} />
                </div>
                <div className="lq-bp-feedback-score">{r.score}%</div>
                <div className="lq-bp-feedback-text">{r.feedback}</div>
              </div>
            ))}
          </div>
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
  const [timeoutModal, setTimeoutModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructionsRead, setInstructionsRead] = useState(false);

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
        // Show instructions modal for brand-pairing lessons before timer starts
        if (data?.quiz?.length && data.quiz[0]?.type === "brand-pairing") {
          setShowInstructions(true);
        }
      } catch {
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (loading || !lesson || finished) return;
    // For brand-pairing, wait until instructions modal is dismissed
    if (currentQ?.type === "brand-pairing" && !instructionsRead) return;
    const timeForQ = currentQ?.type === "brand-pairing" ? TIME_BRAND_PAIRING : TIME_PER_QUESTION;
    answeredRef.current = false;
    setTimeLeft(timeForQ);
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
            setTimeoutModal(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx, loading, finished, instructionsRead]);

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
    setTimeoutModal(false);
    answeredRef.current = false;
    // Re-show instructions for brand-pairing retries
    if (lesson?.quiz?.[0]?.type === "brand-pairing") {
      setShowInstructions(true);
      setInstructionsRead(false);
    }
  };

  if (loading) return <MainLayout><div className="lq-loading">Loading quiz…</div></MainLayout>;
  if (error)   return <MainLayout><div className="lq-error">{error}</div></MainLayout>;
  if (!lesson) return null;

  // Instructions modal for brand-pairing (Lesson 10)
  if (showInstructions) {
    return (
      <MainLayout>
        <div className="lq-wrapper">
          <div className="lq-instructions-overlay">
            <div className="lq-instructions-modal">
              <div className="lq-instructions-icon">🎨</div>
              <h2 className="lq-instructions-title">Lesson 10: Brand Identity Workshop</h2>
              <p className="lq-instructions-subtitle">{lesson.title}</p>
              <div className="lq-instructions-body">
                <p>{lesson.instruction || "Read the scenario carefully, then use the typography tools to create a cohesive brand identity."}</p>
                <ul className="lq-instructions-list">
                  <li>⏱ You have <strong>60 seconds</strong> per scenario</li>
                  <li>🔠 Select a font pairing preset or choose fonts manually</li>
                  <li>📐 Drag text elements to position them on the canvas</li>
                  <li>🎚 Adjust font size, kerning, leading, tracking, and alignment</li>
                  <li>🎨 Pick text colours that contrast well with the background</li>
                  <li>📊 Your work is graded on 10 typography principles</li>
                  <li>✅ Score 60% or above to pass each scenario</li>
                </ul>
              </div>
              <button className="lq-instructions-start"
                onClick={() => { setShowInstructions(false); setInstructionsRead(true); }}>
                Start Challenge →
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

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
            <TimerRing timeLeft={timeLeft} total={currentQ?.type === "brand-pairing" ? TIME_BRAND_PAIRING : TIME_PER_QUESTION} />
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

        {/* ══ TIMEOUT MODAL ══ */}
        {timeoutModal && (
          <div className="lq-timeout-modal-backdrop">
            <div className="lq-timeout-modal-box">
              <div className="lq-timeout-modal-emoji">⏰</div>
              <h2 className="lq-timeout-modal-title">Time's Up!</h2>
              <p className="lq-timeout-modal-desc">
                You ran out of time and have <strong>failed</strong> this quiz attempt.
                Don't give up — review the material and try again!
              </p>
              <div className="lq-timeout-modal-btns">
                <button
                  className="lq-timeout-btn lq-timeout-btn-restart"
                  onClick={handleRetry}
                >
                  🔁 Restart Quiz
                </button>
                <button
                  className="lq-timeout-btn lq-timeout-btn-home"
                  onClick={() => navigate("/lessons")}
                >
                  🏠 Back to Lessons
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default LessonQuiz;