import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminFetchGameById,
  adminCreateGame,
  adminUpdateGame,
  adminUploadImage,
} from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

/* ─── Game categories with their labels ─────────────────── */
const GAME_CATEGORIES = [
  { value: "kerning",          label: "🔠 Kerning" },
  { value: "leading",          label: "📏 Leading" },
  { value: "font-pairing",     label: "🔡 Font Pairing" },
  { value: "typeface-guess",   label: "🔍 Typeface Guessing" },
  { value: "quiz",             label: "❓ Quiz" },
];

const DIFFICULTY_OPTIONS = ["easy", "medium", "hard"];

/* ─── Blank data shapes per category ───────────────────── */
const blankWord       = () => ({ word: "", idealKerning: [] });
const blankParagraph  = () => ({ text: "", idealLeading: 16, fontSize: 16, minLeading: 10, maxLeading: 30 });
const blankFontPair   = () => ({
  givenFontImage: "", givenFontName: "",
  correctPairImage: "", correctPairName: "",
  options: [{ pairImage: "", pairName: "" }, { pairImage: "", pairName: "" }],
});
const blankTypefaceQ  = () => ({
  displayText: "", missingLetters: [], blankedPositions: [],
});
const blankQuizQ      = () => ({
  questionText: "", questionType: "multiple",
  options: ["", "", "", ""], correctAnswer: "", displayText: "",
});

/* ─── Initial form state ────────────────────────────────── */
const initialForm = () => ({
  title: "",
  description: "",
  gameImage: "",
  difficulty: "easy",
  gameType: "kerning",
  isActive: true,
  // kerning
  words: [],
  // leading
  paragraphs: [],
  // font pairing
  purpose: "", theme: "", atmosphere: "", context: "", explanation: "",
  options: [],
  correctAnswer: "",
  questions: [],
  // quiz
  quizQuestions: [],
});

const AdminGameEdit = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const isNew     = id === "new";

  const [form, setForm]           = useState(initialForm());
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [loading, setLoading]     = useState(!isNew);
  const fileInputRef              = useRef(null);

  useEffect(() => {
    if (!isNew) {
      adminFetchGameById(id)
        .then(game => {
          setForm({ ...initialForm(), ...game });
          setImagePreview(game.gameImage || "");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  /* ── Category change: reset category-specific fields ── */
  const handleCategoryChange = (val) => {
    setForm(f => ({
      ...initialForm(),
      title: f.title,
      description: f.description,
      gameImage: f.gameImage,
      difficulty: f.difficulty,
      isActive: f.isActive,
      gameType: val,
    }));
  };

  /* ── Image upload ── */
  const handleImageFile = async (file) => {
    if (!file) return;
    const folder = form.title?.trim().replace(/\s+/g, "_") || "game_images";
    const reader  = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setImagePreview(base64);
      try {
        setUploading(true);
        const { url } = await adminUploadImage(base64, folder);
        setField("gameImage", url);
        setImagePreview(url);
      } catch (e) { console.error(e); }
      finally { setUploading(false); }
    };
    reader.readAsDataURL(file);
  };

  /* ── Save ── */
  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) await adminCreateGame(form);
      else       await adminUpdateGame(id, form);
      navigate("/admingames");
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  /* ─────────────── KERNING helpers ─────────────── */
  const addWord    = () => setField("words", [...(form.words || []), blankWord()]);
  const removeWord = (i) => setField("words", form.words.filter((_, idx) => idx !== i));
  const updateWord = (i, key, val) => {
    const w = [...form.words]; w[i] = { ...w[i], [key]: val }; setField("words", w);
  };

  /* ─────────────── LEADING helpers ─────────────── */
  const addPara    = () => setField("paragraphs", [...(form.paragraphs || []), blankParagraph()]);
  const removePara = (i) => setField("paragraphs", form.paragraphs.filter((_, idx) => idx !== i));
  const updatePara = (i, key, val) => {
    const p = [...form.paragraphs]; p[i] = { ...p[i], [key]: val }; setField("paragraphs", p);
  };

  /* ─────────────── FONT PAIRING helpers ─────────────── */
  const addFontOpt    = () => setField("options", [...(form.options || []), { fontName: "", fontImage: "" }]);
  const removeFontOpt = (i) => setField("options", form.options.filter((_, idx) => idx !== i));
  const updateFontOpt = (i, key, val) => {
    const o = [...form.options]; o[i] = { ...o[i], [key]: val }; setField("options", o);
  };

  /* ─────────────── TYPEFACE GUESS helpers ─────────────── */
  const addTypefaceQ    = () => setField("questions", [...(form.questions || []), blankTypefaceQ()]);
  const removeTypefaceQ = (i) => setField("questions", form.questions.filter((_, idx) => idx !== i));
  const updateTypefaceQ = (i, key, val) => {
    const q = [...form.questions]; q[i] = { ...q[i], [key]: val }; setField("questions", q);
  };

  /* ─────────────── QUIZ helpers ─────────────── */
  const addQuizQ    = () => setField("quizQuestions", [...(form.quizQuestions || []), blankQuizQ()]);
  const removeQuizQ = (i) => setField("quizQuestions", form.quizQuestions.filter((_, idx) => idx !== i));
  const updateQuizQ = (i, key, val) => {
    const q = [...form.quizQuestions]; q[i] = { ...q[i], [key]: val }; setField("quizQuestions", q);
  };
  const updateQuizOpt = (qi, oi, val) => {
    const q = [...form.quizQuestions];
    const opts = [...(q[qi].options || [])]; opts[oi] = val;
    q[qi] = { ...q[qi], options: opts }; setField("quizQuestions", q);
  };

  if (loading) return <MainLayout><div className="admin-loading">Loading…</div></MainLayout>;

  return (
    <MainLayout>
      <div className="admin-section-wrapper">

        <button className="admin-back-btn" onClick={() => navigate("/admingames")}>
          ← Back to Games
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">{isNew ? "Create Game" : "Edit Game"}</h1>
        </div>

        <div className="admin-form-card">

          {/* ── Basic Info ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Basic Information</p>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Game Title *</label>
                <input className="admin-form-input" value={form.title}
                  onChange={e => setField("title", e.target.value)} placeholder="Enter title" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Difficulty</label>
                <select className="admin-form-select" value={form.difficulty}
                  onChange={e => setField("difficulty", e.target.value)}>
                  {DIFFICULTY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea className="admin-form-textarea" rows={3} value={form.description}
                onChange={e => setField("description", e.target.value)} placeholder="Describe the game…" />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select className="admin-form-select" value={form.isActive ? "active" : "inactive"}
                  onChange={e => setField("isActive", e.target.value === "active")}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Game Image ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Game Image</p>
            <div className="admin-upload-area" onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleImageFile(e.dataTransfer.files[0]); }}>
              <input ref={fileInputRef} type="file" accept="image/*"
                onChange={e => handleImageFile(e.target.files[0])} />
              {uploading ? (
                <p className="admin-upload-hint">⏳ Uploading to Cloudinary…</p>
              ) : imagePreview ? (
                <img src={imagePreview} alt="Preview" className="admin-upload-preview" />
              ) : (
                <p className="admin-upload-hint">📁 Click or drag & drop to upload game image</p>
              )}
            </div>
          </div>

          {/* ── Game Category Selector ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Game Category</p>
            <div className="admin-game-category-grid">
              {GAME_CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  className={`admin-category-btn ${form.gameType === cat.value ? "selected" : ""}`}
                  onClick={() => handleCategoryChange(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              CATEGORY-SPECIFIC FIELDS
          ══════════════════════════════════════════ */}

          {/* ── KERNING ── */}
          {form.gameType === "kerning" && (
            <div className="admin-form-section">
              <p className="admin-form-section-title">Kerning Words ({(form.words || []).length})</p>
              <p className="admin-form-hint">
                Each word needs ideal kerning values — one number per letter gap (e.g. for "AV": one gap value).
              </p>
              {(form.words || []).map((w, i) => (
                <div key={i} className="admin-quiz-item">
                  <div className="admin-quiz-item-header">
                    <span className="admin-quiz-item-label">Word {i + 1}</span>
                    <button className="admin-remove-btn" onClick={() => removeWord(i)}>Remove</button>
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Word</label>
                      <input className="admin-form-input" value={w.word}
                        onChange={e => updateWord(i, "word", e.target.value)} placeholder="e.g. WAVE" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Ideal Kerning (comma-separated numbers)</label>
                      <input className="admin-form-input"
                        value={(w.idealKerning || []).join(",")}
                        onChange={e => updateWord(i, "idealKerning", e.target.value.split(",").map(Number))}
                        placeholder="-5,0,3" />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addWord}>+ Add Word</button>
            </div>
          )}

          {/* ── LEADING ── */}
          {form.gameType === "leading" && (
            <div className="admin-form-section">
              <p className="admin-form-section-title">Leading Paragraphs ({(form.paragraphs || []).length})</p>
              {(form.paragraphs || []).map((p, i) => (
                <div key={i} className="admin-quiz-item">
                  <div className="admin-quiz-item-header">
                    <span className="admin-quiz-item-label">Paragraph {i + 1}</span>
                    <button className="admin-remove-btn" onClick={() => removePara(i)}>Remove</button>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Paragraph Text</label>
                    <textarea className="admin-form-textarea" rows={3} value={p.text}
                      onChange={e => updatePara(i, "text", e.target.value)} placeholder="Sample text…" />
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Ideal Leading (px)</label>
                      <input type="number" className="admin-form-input" value={p.idealLeading}
                        onChange={e => updatePara(i, "idealLeading", +e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Font Size (px)</label>
                      <input type="number" className="admin-form-input" value={p.fontSize}
                        onChange={e => updatePara(i, "fontSize", +e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Min Leading</label>
                      <input type="number" className="admin-form-input" value={p.minLeading}
                        onChange={e => updatePara(i, "minLeading", +e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Max Leading</label>
                      <input type="number" className="admin-form-input" value={p.maxLeading}
                        onChange={e => updatePara(i, "maxLeading", +e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addPara}>+ Add Paragraph</button>
            </div>
          )}

          {/* ── FONT PAIRING ── */}
          {form.gameType === "font-pairing" && (
            <div className="admin-form-section">
              <p className="admin-form-section-title">Font Pairing Setup</p>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Purpose</label>
                  <input className="admin-form-input" value={form.purpose}
                    onChange={e => setField("purpose", e.target.value)} placeholder="e.g. Wedding invite" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Theme</label>
                  <input className="admin-form-input" value={form.theme}
                    onChange={e => setField("theme", e.target.value)} placeholder="e.g. Elegant" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Atmosphere</label>
                  <input className="admin-form-input" value={form.atmosphere}
                    onChange={e => setField("atmosphere", e.target.value)} placeholder="e.g. Romantic" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Context</label>
                  <input className="admin-form-input" value={form.context}
                    onChange={e => setField("context", e.target.value)} placeholder="Where it will be used" />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Explanation</label>
                <textarea className="admin-form-textarea" rows={2} value={form.explanation}
                  onChange={e => setField("explanation", e.target.value)} placeholder="Why this pair works…" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Correct Answer Font Name</label>
                <input className="admin-form-input" value={form.correctAnswer}
                  onChange={e => setField("correctAnswer", e.target.value)} placeholder="Correct font name" />
              </div>
              <p className="admin-form-section-title" style={{ marginTop: 20 }}>
                Font Options ({(form.options || []).length})
              </p>
              {(form.options || []).map((o, i) => (
                <div key={i} className="admin-quiz-item">
                  <div className="admin-quiz-item-header">
                    <span className="admin-quiz-item-label">Option {i + 1}</span>
                    <button className="admin-remove-btn" onClick={() => removeFontOpt(i)}>Remove</button>
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Font Name</label>
                      <input className="admin-form-input" value={o.fontName}
                        onChange={e => updateFontOpt(i, "fontName", e.target.value)} placeholder="Font name" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Font Image URL</label>
                      <input className="admin-form-input" value={o.fontImage}
                        onChange={e => updateFontOpt(i, "fontImage", e.target.value)} placeholder="https://…" />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addFontOpt}>+ Add Font Option</button>
            </div>
          )}

          {/* ── TYPEFACE GUESSING ── */}
          {form.gameType === "typeface-guess" && (
            <div className="admin-form-section">
              <p className="admin-form-section-title">Typeface Questions ({(form.questions || []).length})</p>
              {(form.questions || []).map((q, i) => (
                <div key={i} className="admin-quiz-item">
                  <div className="admin-quiz-item-header">
                    <span className="admin-quiz-item-label">Question {i + 1}</span>
                    <button className="admin-remove-btn" onClick={() => removeTypefaceQ(i)}>Remove</button>
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Display Text</label>
                      <input className="admin-form-input" value={q.displayText || ""}
                        onChange={e => updateTypefaceQ(i, "displayText", e.target.value)}
                        placeholder="Text shown to user" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Missing Letters (comma-separated)</label>
                      <input className="admin-form-input"
                        value={(q.missingLetters || []).join(",")}
                        onChange={e => updateTypefaceQ(i, "missingLetters", e.target.value.split(",").map(s => s.trim()))}
                        placeholder="A,V" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Blanked Positions (comma-separated indices)</label>
                      <input className="admin-form-input"
                        value={(q.blankedPositions || []).join(",")}
                        onChange={e => updateTypefaceQ(i, "blankedPositions", e.target.value.split(",").map(Number))}
                        placeholder="0,2" />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addTypefaceQ}>+ Add Question</button>
            </div>
          )}

          {/* ── QUIZ ── */}
          {form.gameType === "quiz" && (
            <div className="admin-form-section">
              <p className="admin-form-section-title">Quiz Questions ({(form.quizQuestions || []).length})</p>
              {(form.quizQuestions || []).map((q, i) => (
                <div key={i} className="admin-quiz-item">
                  <div className="admin-quiz-item-header">
                    <span className="admin-quiz-item-label">Question {i + 1}</span>
                    <button className="admin-remove-btn" onClick={() => removeQuizQ(i)}>Remove</button>
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Question Type</label>
                      <select className="admin-form-select" value={q.questionType}
                        onChange={e => updateQuizQ(i, "questionType", e.target.value)}>
                        <option value="multiple">Multiple Choice</option>
                        <option value="truefalse">True / False</option>
                        <option value="fillblank">Fill in the Blank</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Correct Answer</label>
                      <input className="admin-form-input" value={q.correctAnswer}
                        onChange={e => updateQuizQ(i, "correctAnswer", e.target.value)}
                        placeholder="Correct answer" />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Question Text</label>
                    <textarea className="admin-form-textarea" rows={2} value={q.questionText}
                      onChange={e => updateQuizQ(i, "questionText", e.target.value)}
                      placeholder="Enter question…" />
                  </div>
                  {q.questionType === "multiple" && (
                    <div className="admin-form-group">
                      <label className="admin-form-label">Options</label>
                      {(q.options || ["","","",""]).map((opt, oi) => (
                        <input key={oi} className="admin-form-input" style={{ marginBottom: 6 }}
                          value={opt}
                          onChange={e => updateQuizOpt(i, oi, e.target.value)}
                          placeholder={`Option ${oi + 1}`} />
                      ))}
                    </div>
                  )}
                  {q.questionType === "fillblank" && (
                    <div className="admin-form-group">
                      <label className="admin-form-label">Display Text (use ___ for blank)</label>
                      <input className="admin-form-input" value={q.displayText || ""}
                        onChange={e => updateQuizQ(i, "displayText", e.target.value)}
                        placeholder="The ___ is a typographic term for…" />
                    </div>
                  )}
                </div>
              ))}
              <button className="admin-add-btn" onClick={addQuizQ}>+ Add Question</button>
            </div>
          )}

          {/* ── Submit ── */}
          <div className="admin-form-submit-row">
            <button className="admin-cancel-btn" onClick={() => navigate("/admingames")}>Cancel</button>
            <button className="admin-submit-btn" onClick={handleSave} disabled={saving || uploading}>
              {saving ? "Saving…" : isNew ? "Create Game" : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default AdminGameEdit;