import React, { useState, useRef, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import "./Workspace.css";

/* ─────────────────────────────────────────
   FONT LIBRARY
───────────────────────────────────────── */
const FONTS = [
  { name: "Playfair Display", category: "Serif" },
  { name: "Merriweather", category: "Serif" },
  { name: "Lora", category: "Serif" },
  { name: "Cormorant Garamond", category: "Serif" },
  { name: "Libre Baskerville", category: "Serif" },
  { name: "Crimson Text", category: "Serif" },
  { name: "EB Garamond", category: "Serif" },
  { name: "Spectral", category: "Serif" },
  { name: "Bitter", category: "Serif" },
  { name: "Roboto Slab", category: "Serif" },
  { name: "Montserrat", category: "Sans Serif" },
  { name: "Poppins", category: "Sans Serif" },
  { name: "Raleway", category: "Sans Serif" },
  { name: "Oswald", category: "Sans Serif" },
  { name: "Work Sans", category: "Sans Serif" },
  { name: "Nunito", category: "Sans Serif" },
  { name: "Inter", category: "Sans Serif" },
  { name: "Space Grotesk", category: "Sans Serif" },
  { name: "DM Sans", category: "Sans Serif" },
  { name: "Quicksand", category: "Sans Serif" },
  { name: "Rubik", category: "Sans Serif" },
  { name: "Josefin Sans", category: "Sans Serif" },
  { name: "Outfit", category: "Sans Serif" },
  { name: "Plus Jakarta Sans", category: "Sans Serif" },
  { name: "Figtree", category: "Sans Serif" },
  { name: "Source Sans 3", category: "Sans Serif" },
  { name: "Space Mono", category: "Monospace" },
  { name: "JetBrains Mono", category: "Monospace" },
  { name: "Fira Code", category: "Monospace" },
  { name: "Courier Prime", category: "Monospace" },
  { name: "Abril Fatface", category: "Display" },
  { name: "Bebas Neue", category: "Display" },
  { name: "Anton", category: "Display" },
  { name: "Black Han Sans", category: "Display" },
  { name: "Righteous", category: "Display" },
  { name: "Lilita One", category: "Display" },
  { name: "Dancing Script", category: "Handwriting" },
  { name: "Pacifico", category: "Handwriting" },
  { name: "Caveat", category: "Handwriting" },
  { name: "Sacramento", category: "Handwriting" },
];

const FONT_CATEGORIES = ["All", "Serif", "Sans Serif", "Monospace", "Display", "Handwriting"];

/* ─────────────────────────────────────────
   FONT PAIRINGS
───────────────────────────────────────── */
const PAIRINGS = [
  { display: "Playfair Display", body: "Source Sans 3", label: "Classic Contrast" },
  { display: "Montserrat", body: "Merriweather", label: "Modern Editorial" },
  { display: "Oswald", body: "Libre Baskerville", label: "Bold Authority" },
  { display: "Raleway", body: "Lora", label: "Elegant Minimal" },
  { display: "Bebas Neue", body: "Work Sans", label: "High Impact" },
  { display: "Cormorant Garamond", body: "Nunito", label: "Refined & Friendly" },
  { display: "Space Grotesk", body: "Bitter", label: "Contemporary Edge" },
  { display: "Abril Fatface", body: "Crimson Text", label: "Dramatic Literary" },
  { display: "Josefin Sans", body: "EB Garamond", label: "Geometric Classic" },
  { display: "Dancing Script", body: "Poppins", label: "Expressive & Clean" },
];

/* ─────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────── */
const DEFAULT_STATE = {
  headline: { font: "Playfair Display", size: 56, weight: "700", style: "normal", align: "left", kerning: 0, tracking: 0, leading: 1.1, color: "#ffffff" },
  subheading: { font: "Montserrat", size: 24, weight: "400", style: "normal", align: "left", kerning: 0, tracking: 2, leading: 1.3, color: "#cccccc" },
  body: { font: "Source Sans 3", size: 16, weight: "400", style: "normal", align: "left", kerning: 0, tracking: 0, leading: 1.7, color: "#aaaaaa" },
};

const DEFAULT_TEXT = {
  headline: "Typography Is Visual Language",
  subheading: "The craft of arranging type to make written language readable, legible, and appealing.",
  body: "Good typography is invisible. Bad typography is everywhere. The space between letters, the rhythm of lines, the choice of typeface — every decision communicates something before a single word is read. Practice here to develop your typographic eye.",
};

/* ─────────────────────────────────────────
   FEEDBACK ENGINE
───────────────────────────────────────── */
const analyzework = (styles, pairFonts, showGrid) => {
  const items = [];
  const { headline, subheading, body } = styles;

  // Hierarchy check
  if (headline.size > subheading.size && subheading.size > body.size) {
    items.push({ status: "pass", label: "Typographic Hierarchy", msg: "Your sizes flow correctly — headline → subheading → body. Clear hierarchy guides the reader's eye naturally." });
  } else {
    items.push({ status: "fail", label: "Typographic Hierarchy", msg: "Your type sizes don't form a clear hierarchy. Headline should be largest, then subheading, then body text." });
  }

  // Ratio check
  const ratio = headline.size / body.size;
  if (ratio >= 2.5 && ratio <= 6) {
    items.push({ status: "pass", label: "Size Ratio", msg: `Headline is ${ratio.toFixed(1)}x the body size — a healthy contrast that creates impact without overwhelming.` });
  } else if (ratio > 6) {
    items.push({ status: "warn", label: "Size Ratio", msg: `Headline is ${ratio.toFixed(1)}x the body size — quite extreme. Consider reducing the headline or increasing body size.` });
  } else {
    items.push({ status: "fail", label: "Size Ratio", msg: `Headline is only ${ratio.toFixed(1)}x the body size — not enough contrast. Aim for at least 2.5x.` });
  }

  // Body size readability
  if (body.size >= 14 && body.size <= 22) {
    items.push({ status: "pass", label: "Body Readability", msg: `${body.size}px body text is within the comfortable reading range (14–22px) for screen typography.` });
  } else if (body.size < 14) {
    items.push({ status: "fail", label: "Body Readability", msg: `${body.size}px is too small for body text. Minimum recommended is 14px — readers shouldn't need to squint.` });
  } else {
    items.push({ status: "warn", label: "Body Readability", msg: `${body.size}px body text is large. Works for accessibility but may feel heavy in dense layouts.` });
  }

  // Leading check
  if (body.leading >= 1.4 && body.leading <= 1.8) {
    items.push({ status: "pass", label: "Line Height (Leading)", msg: `${body.leading} leading for body text is excellent — gives the eye room to travel between lines comfortably.` });
  } else if (body.leading < 1.4) {
    items.push({ status: "warn", label: "Line Height (Leading)", msg: `${body.leading} leading is tight for body text. Lines may feel cramped. Try 1.5–1.7 for long-form reading.` });
  } else {
    items.push({ status: "warn", label: "Line Height (Leading)", msg: `${body.leading} leading is generous — works for short passages but may feel disconnected in longer text.` });
  }

  if (headline.leading >= 1.0 && headline.leading <= 1.3) {
    items.push({ status: "pass", label: "Headline Leading", msg: `${headline.leading} leading for headlines is tight and impactful — the standard range for large display text.` });
  } else if (headline.leading > 1.3) {
    items.push({ status: "warn", label: "Headline Leading", msg: `${headline.leading} leading on headlines is loose. Headlines typically need tighter leading (0.9–1.2) for visual cohesion.` });
  }

  // Kerning/Tracking
  if (Math.abs(body.kerning) <= 2 && Math.abs(body.tracking) <= 3) {
    items.push({ status: "pass", label: "Body Spacing", msg: "Letter spacing on body text is natural — not over-tracked or squeezed. Subtle is almost always better for reading text." });
  } else if (Math.abs(body.tracking) > 5) {
    items.push({ status: "warn", label: "Body Tracking", msg: `High tracking (${body.tracking}em) on body text can reduce readability. Save wide tracking for headlines or uppercase labels.` });
  }

  if (headline.tracking >= 0 && headline.tracking <= 5) {
    items.push({ status: "pass", label: "Headline Tracking", msg: "Good headline tracking. Slight openness in display text aids legibility at large sizes." });
  }

  // Font pairing
  if (pairFonts) {
    const headlineCategory = FONTS.find(f => f.name === headline.font)?.category;
    const bodyCategory = FONTS.find(f => f.name === body.font)?.category;
    if (headline.font === body.font) {
      items.push({ status: "warn", label: "Font Pairing", msg: "You're using the same font for headline and body. Consider pairing a display/serif for headlines with a clean sans-serif for body — contrast creates interest." });
    } else if (headlineCategory !== bodyCategory) {
      items.push({ status: "pass", label: "Font Pairing", msg: `${headline.font} (${headlineCategory}) + ${body.font} (${bodyCategory}) — nice contrast between categories. Different personalities that complement each other.` });
    } else {
      items.push({ status: "warn", label: "Font Pairing", msg: `Both fonts are ${headlineCategory}. Same-category pairings can work but require careful weight contrast to differentiate. Consider a cross-category pairing.` });
    }
  }

  // Alignment consistency
  if (headline.align === subheading.align && subheading.align === body.align) {
    items.push({ status: "pass", label: "Alignment Consistency", msg: `All elements are ${headline.align}-aligned — consistent and professional. Mixing alignments without intent creates visual chaos.` });
  } else if (headline.align !== body.align) {
    items.push({ status: "warn", label: "Alignment Consistency", msg: "Your headline and body have different alignments. This can work intentionally (e.g. centered headline + left body) but make sure it looks deliberate." });
  }

  // Color contrast hint
  items.push({ status: "info", label: "Color & Contrast", msg: "Consider your text colors against the background. A slight difference in brightness between headline, subheading, and body creates natural hierarchy through value alone." });

  return items;
};

/* ─────────────────────────────────────────
   LOAD GOOGLE FONT HELPER
───────────────────────────────────────── */
const loadedFonts = new Set();
const loadFont = (fontName) => {
  if (loadedFonts.has(fontName)) return;
  loadedFonts.add(fontName);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  const encoded = fontName.replace(/ /g, "+");
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap`;
  document.head.appendChild(link);
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const Workspace = () => {
  const [styles, setStyles] = useState(() => {
    try {
      const saved = localStorage.getItem("tw_styles");
      return saved ? JSON.parse(saved) : DEFAULT_STATE;
    } catch { return DEFAULT_STATE; }
  });

  const [texts, setTexts] = useState(() => {
    try {
      const saved = localStorage.getItem("tw_texts");
      return saved ? JSON.parse(saved) : DEFAULT_TEXT;
    } catch { return DEFAULT_TEXT; }
  });

  const [selected, setSelected]           = useState("headline");
  const [pairFonts, setPairFonts]         = useState(false);
  const [showGrid, setShowGrid]           = useState(false);
  const [fontSearch, setFontSearch]       = useState("");
  const [fontCategory, setFontCategory]   = useState("All");
  const [feedback, setFeedback]           = useState(null);
  const [showFeedback, setShowFeedback]   = useState(false);
  const [savedMsg, setSavedMsg]           = useState(false);
  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const [undoStack, setUndoStack]         = useState([]);
  const [redoStack, setRedoStack]         = useState([]);
  const [canvasBg, setCanvasBg]           = useState("#0d0d0d");

  const headlineRef   = useRef(null);
  const subheadingRef = useRef(null);
  const bodyRef       = useRef(null);

  const refs = { headline: headlineRef, subheading: subheadingRef, body: bodyRef };

  // Load all fonts on mount
  useEffect(() => {
    FONTS.forEach(f => loadFont(f.name));
  }, []);

  // Load fonts when style changes
  useEffect(() => {
    loadFont(styles.headline.font);
    loadFont(styles.subheading.font);
    loadFont(styles.body.font);
  }, [styles]);

  const pushUndo = useCallback((prevStyles) => {
    setUndoStack(s => [...s.slice(-19), prevStyles]);
    setRedoStack([]);
  }, []);

  const updateStyle = (tier, key, value) => {
    setStyles(prev => {
      pushUndo(prev);
      return { ...prev, [tier]: { ...prev[tier], [key]: value } };
    });
  };

  const handleUndo = () => {
    if (!undoStack.length) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack(r => [...r, styles]);
    setStyles(prev);
    setUndoStack(s => s.slice(0, -1));
  };

  const handleRedo = () => {
    if (!redoStack.length) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(s => [...s, styles]);
    setStyles(next);
    setRedoStack(r => r.slice(0, -1));
  };

  const applyPairing = (pairing) => {
    setStyles(prev => {
      pushUndo(prev);
      return {
        ...prev,
        headline:   { ...prev.headline,   font: pairing.display },
        subheading: { ...prev.subheading, font: pairing.body },
        body:       { ...prev.body,       font: pairing.body },
      };
    });
  };

  const handleReset = () => {
    pushUndo(styles);
    setStyles(DEFAULT_STATE);
    setTexts(DEFAULT_TEXT);
    if (headlineRef.current)   headlineRef.current.innerText   = DEFAULT_TEXT.headline;
    if (subheadingRef.current) subheadingRef.current.innerText = DEFAULT_TEXT.subheading;
    if (bodyRef.current)       bodyRef.current.innerText       = DEFAULT_TEXT.body;
  };

  const handleSave = () => {
    localStorage.setItem("tw_styles", JSON.stringify(styles));
    localStorage.setItem("tw_texts",  JSON.stringify(texts));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleCheckWork = () => {
    const result = analyzework(styles, pairFonts, showGrid);
    setFeedback(result);
    setShowFeedback(true);
  };

  const cur = styles[selected];

  const filteredFonts = FONTS.filter(f => {
    const matchCat = fontCategory === "All" || f.category === fontCategory;
    const matchSearch = f.name.toLowerCase().includes(fontSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const getTextStyle = (tier) => ({
    fontFamily:    `'${styles[tier].font}', serif`,
    fontSize:      `${styles[tier].size}px`,
    fontWeight:    styles[tier].weight,
    fontStyle:     styles[tier].style,
    textAlign:     styles[tier].align,
    letterSpacing: `${styles[tier].kerning + styles[tier].tracking * 0.01}em`,
    lineHeight:    styles[tier].leading,
    color:         styles[tier].color,
    outline:       "none",
    display:       "block",
    width:         "100%",
    cursor:        "text",
  });

  const statusIcon = { pass: "✓", warn: "⚠", fail: "✕", info: "ℹ" };
  const statusClass = { pass: "fb-pass", warn: "fb-warn", fail: "fb-fail", info: "fb-info" };

  return (
    <MainLayout>
      <div className="tw-root">

        {/* ── TOP BAR ── */}
        <div className="tw-topbar">
          <div className="tw-topbar-left">
            <button className="tw-sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
              {sidebarOpen ? "◀ Hide Tools" : "▶ Show Tools"}
            </button>
            <span className="tw-title">Typography Workspace</span>
          </div>
          <div className="tw-topbar-center">
            <button className="tw-tool-btn" onClick={handleUndo} disabled={!undoStack.length} title="Undo">↩</button>
            <button className="tw-tool-btn" onClick={handleRedo} disabled={!redoStack.length} title="Redo">↪</button>
            <div className="tw-sep" />
            <button className={`tw-tool-btn ${showGrid ? "active" : ""}`} onClick={() => setShowGrid(g => !g)} title="Toggle Grid">⊞</button>
            <div className="tw-sep" />
            <label className="tw-topbar-label">Canvas</label>
            <input type="color" value={canvasBg} onChange={e => setCanvasBg(e.target.value)} className="tw-color-swatch small" title="Canvas background" />
          </div>
          <div className="tw-topbar-right">
            <button className="tw-btn tw-btn-ghost" onClick={handleReset}>Reset</button>
            <button className="tw-btn tw-btn-save" onClick={handleSave}>
              {savedMsg ? "✓ Saved!" : "Save"}
            </button>
            <button className="tw-btn tw-btn-check" onClick={handleCheckWork}>Check My Work</button>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="tw-body">

          {/* ════════════════════════════
              SIDEBAR
          ════════════════════════════ */}
          {sidebarOpen && (
            <aside className="tw-sidebar">

              {/* Tier selector */}
              <div className="tw-section">
                <p className="tw-section-label">Edit Element</p>
                <div className="tw-tier-tabs">
                  {["headline", "subheading", "body"].map(t => (
                    <button
                      key={t}
                      className={`tw-tier-tab ${selected === t ? "active" : ""}`}
                      onClick={() => setSelected(t)}
                    >
                      {t === "headline" ? "H1" : t === "subheading" ? "H2" : "Body"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font selector */}
              <div className="tw-section">
                <p className="tw-section-label">Typeface</p>
                <input
                  className="tw-search"
                  placeholder="Search fonts…"
                  value={fontSearch}
                  onChange={e => setFontSearch(e.target.value)}
                />
                <div className="tw-cat-tabs">
                  {FONT_CATEGORIES.map(c => (
                    <button key={c} className={`tw-cat-tab ${fontCategory === c ? "active" : ""}`} onClick={() => setFontCategory(c)}>
                      {c}
                    </button>
                  ))}
                </div>
                <div className="tw-font-list">
                  {filteredFonts.map(f => (
                    <button
                      key={f.name}
                      className={`tw-font-item ${cur.font === f.name ? "active" : ""}`}
                      style={{ fontFamily: `'${f.name}', serif` }}
                      onClick={() => updateStyle(selected, "font", f.name)}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pair fonts */}
              <div className="tw-section">
                <div className="tw-row-between">
                  <p className="tw-section-label">Pair Fonts</p>
                  <button
                    className={`tw-toggle ${pairFonts ? "on" : "off"}`}
                    onClick={() => setPairFonts(p => !p)}
                  >
                    {pairFonts ? "ON" : "OFF"}
                  </button>
                </div>
                {pairFonts && (
                  <div className="tw-pairings">
                    {PAIRINGS.map(p => (
                      <button
                        key={p.label}
                        className="tw-pairing-pill"
                        onClick={() => applyPairing(p)}
                        title={`${p.display} + ${p.body}`}
                      >
                        <span className="tw-pairing-label">{p.label}</span>
                        <span className="tw-pairing-fonts">{p.display} · {p.body}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Style toggles */}
              <div className="tw-section">
                <p className="tw-section-label">Style</p>
                <div className="tw-style-row">
                  <button
                    className={`tw-style-btn ${cur.weight === "700" ? "active" : ""}`}
                    onClick={() => updateStyle(selected, "weight", cur.weight === "700" ? "400" : "700")}
                  ><strong>B</strong></button>
                  <button
                    className={`tw-style-btn ${cur.style === "italic" ? "active" : ""}`}
                    onClick={() => updateStyle(selected, "style", cur.style === "italic" ? "normal" : "italic")}
                  ><em>I</em></button>
                  <div className="tw-sep-v" />
                  {["left","center","right"].map(a => (
                    <button
                      key={a}
                      className={`tw-style-btn ${cur.align === a ? "active" : ""}`}
                      onClick={() => updateStyle(selected, "align", a)}
                    >
                      {a === "left" ? "⬛▪▪" : a === "center" ? "▪⬛▪" : "▪▪⬛"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="tw-section">
                <p className="tw-section-label">Color</p>
                <div className="tw-color-row">
                  <input
                    type="color"
                    value={cur.color}
                    onChange={e => updateStyle(selected, "color", e.target.value)}
                    className="tw-color-swatch"
                  />
                  <span className="tw-color-val">{cur.color}</span>
                  {["#ffffff","#cccccc","#888888","#ff1414","#a200ff","#0029ff"].map(c => (
                    <button
                      key={c}
                      className="tw-color-preset"
                      style={{ background: c, border: cur.color === c ? "2px solid white" : "2px solid transparent" }}
                      onClick={() => updateStyle(selected, "color", c)}
                    />
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="tw-section">
                <p className="tw-section-label">Metrics</p>

                <div className="tw-slider-group">
                  <div className="tw-slider-row">
                    <label>Size <span>{cur.size}px</span></label>
                    <input type="range" min="8" max="120" value={cur.size}
                      onChange={e => updateStyle(selected, "size", +e.target.value)} />
                  </div>
                  <div className="tw-slider-row">
                    <label>Leading <span>{cur.leading}</span></label>
                    <input type="range" min="0.8" max="3.0" step="0.05" value={cur.leading}
                      onChange={e => updateStyle(selected, "leading", +e.target.value)} />
                  </div>
                  <div className="tw-slider-row">
                    <label>Kerning <span>{cur.kerning}em</span></label>
                    <input type="range" min="-0.2" max="0.5" step="0.01" value={cur.kerning}
                      onChange={e => updateStyle(selected, "kerning", +e.target.value)} />
                  </div>
                  <div className="tw-slider-row">
                    <label>Tracking <span>{cur.tracking}</span></label>
                    <input type="range" min="-5" max="20" step="0.5" value={cur.tracking}
                      onChange={e => updateStyle(selected, "tracking", +e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Font weight range */}
              <div className="tw-section">
                <p className="tw-section-label">Font Weight</p>
                <div className="tw-weight-grid">
                  {["300","400","500","600","700","800"].map(w => (
                    <button
                      key={w}
                      className={`tw-weight-btn ${cur.weight === w ? "active" : ""}`}
                      style={{ fontWeight: w }}
                      onClick={() => updateStyle(selected, "weight", w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

            </aside>
          )}

          {/* ════════════════════════════
              CANVAS
          ════════════════════════════ */}
          <main className="tw-canvas-area">
            <div
              className={`tw-canvas ${showGrid ? "grid" : ""}`}
              style={{ background: canvasBg }}
              onClick={() => setShowFeedback(false)}
            >
              {/* Headline */}
              <div
                className={`tw-text-block ${selected === "headline" ? "selected" : ""}`}
                onClick={e => { e.stopPropagation(); setSelected("headline"); }}
              >
                <span className="tw-tier-badge">H1</span>
                <div
                  ref={headlineRef}
                  contentEditable
                  suppressContentEditableWarning
                  style={getTextStyle("headline")}
                  onBlur={e => setTexts(t => ({ ...t, headline: e.target.innerText }))}
                >
                  {texts.headline}
                </div>
              </div>

              {/* Subheading */}
              <div
                className={`tw-text-block ${selected === "subheading" ? "selected" : ""}`}
                onClick={e => { e.stopPropagation(); setSelected("subheading"); }}
              >
                <span className="tw-tier-badge">H2</span>
                <div
                  ref={subheadingRef}
                  contentEditable
                  suppressContentEditableWarning
                  style={getTextStyle("subheading")}
                  onBlur={e => setTexts(t => ({ ...t, subheading: e.target.innerText }))}
                >
                  {texts.subheading}
                </div>
              </div>

              {/* Body */}
              <div
                className={`tw-text-block ${selected === "body" ? "selected" : ""}`}
                onClick={e => { e.stopPropagation(); setSelected("body"); }}
              >
                <span className="tw-tier-badge">P</span>
                <div
                  ref={bodyRef}
                  contentEditable
                  suppressContentEditableWarning
                  style={getTextStyle("body")}
                  onBlur={e => setTexts(t => ({ ...t, body: e.target.innerText }))}
                >
                  {texts.body}
                </div>
              </div>

              {/* Canvas hint */}
              <p className="tw-canvas-hint">Click any text to select it · Edit directly in the canvas</p>
            </div>

            {/* ── LIVE METRICS BAR ── */}
            <div className="tw-metrics-bar">
              <span className="tw-metric"><em>Font</em> {cur.font}</span>
              <span className="tw-metric"><em>Size</em> {cur.size}px</span>
              <span className="tw-metric"><em>Weight</em> {cur.weight}</span>
              <span className="tw-metric"><em>Leading</em> {cur.leading}</span>
              <span className="tw-metric"><em>Tracking</em> {cur.tracking}</span>
              <span className="tw-metric"><em>Align</em> {cur.align}</span>
            </div>
          </main>
        </div>

        {/* ════════════════════════════
            FEEDBACK PANEL
        ════════════════════════════ */}
        {showFeedback && feedback && (
          <div className="tw-feedback-overlay" onClick={() => setShowFeedback(false)}>
            <div className="tw-feedback-panel" onClick={e => e.stopPropagation()}>
              <div className="tw-feedback-header">
                <h2 className="tw-feedback-title">Typography Review</h2>
                <p className="tw-feedback-sub">
                  {feedback.filter(f => f.status === "pass").length}/{feedback.length} checks passed
                </p>
                <button className="tw-feedback-close" onClick={() => setShowFeedback(false)}>✕</button>
              </div>

              {/* Score bar */}
              <div className="tw-score-bar-wrap">
                <div
                  className="tw-score-bar"
                  style={{ width: `${(feedback.filter(f => f.status === "pass").length / feedback.length) * 100}%` }}
                />
              </div>

              <div className="tw-feedback-list">
                {feedback.map((item, i) => (
                  <div key={i} className={`tw-feedback-item ${statusClass[item.status]}`}>
                    <span className="tw-fb-icon">{statusIcon[item.status]}</span>
                    <div className="tw-fb-content">
                      <span className="tw-fb-label">{item.label}</span>
                      <span className="tw-fb-msg">{item.msg}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tw-feedback-footer">
                <p>Keep experimenting! Great typography comes from deliberate practice and trained observation.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default Workspace;