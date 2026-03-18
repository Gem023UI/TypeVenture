import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminFetchLessonById, adminCreateLesson, adminUpdateLesson, adminUploadImage } from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const QUIZ_TYPES = [
  { value: "multiple-choice",     label: "Multiple Choice" },
  { value: "identification",      label: "Identification" },
  { value: "scenario",            label: "Scenario" },
  { value: "kerning-slide",       label: "Kerning Slide" },
  { value: "leading-lines",       label: "Leading Lines" },
  { value: "x-height-detective",  label: "X-Height Detective" },
];

const blankQuizItem = () => ({
  type: "multiple-choice",
  question: "",
  choices: ["", "", "", ""],
  correctAnswer: "",
  explanation: "",
  scenario: "",
  letterA: "",
  letterB: "",
  targetOffset: 0,
  tolerance: 5,
  min: -20,
  max: 20,
});

const AdminLessonEdit = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const isNew    = id === "new";

  const [form, setForm] = useState({
    title: "",
    difficulty: "Beginner",
    completionTime: "~15 min",
    lessonImage: "",
    sourceUrl: "",
    youtubeUrl: "",
    content: {
      description: "", introduction: "",
      headerOne: "", discussionOne: "",
      headerTwo: "", discussionTwo: "",
      headerThree: "", discussionThree: "",
      headerFour: "", discussionFour: "",
      headerFive: "", discussionFive: "",
      headerSix: "", discussionSix: "",
      headerSeven: "", discussionSeven: "",
    },
    quiz: [],
  });

  const [imagePreview, setImagePreview]   = useState("");
  const [uploading, setUploading]         = useState(false);
  const [saving, setSaving]               = useState(false);
  const [loading, setLoading]             = useState(!isNew);
  const fileInputRef                      = useRef(null);

  useEffect(() => {
    if (!isNew) {
      adminFetchLessonById(id)
        .then(lesson => {
          setForm({ ...lesson });
          setImagePreview(lesson.lessonImage || "");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setContent = (key, val) => setForm(f => ({ ...f, content: { ...f.content, [key]: val } }));

  // ── Image upload
  const handleImageFile = async (file) => {
    if (!file) return;
    const folder = form.title?.trim().replace(/\s+/g, "_") || "lesson_images";
    const reader  = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setImagePreview(base64);
      try {
        setUploading(true);
        const { url } = await adminUploadImage(base64, folder);
        setField("lessonImage", url);
        setImagePreview(url);
      } catch (e) {
        console.error("Upload failed:", e);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // ── Quiz helpers
  const addQuizItem = () => setForm(f => ({ ...f, quiz: [...f.quiz, blankQuizItem()] }));
  const removeQuizItem = (i) => setForm(f => ({ ...f, quiz: f.quiz.filter((_, idx) => idx !== i) }));
  const updateQuizItem = (i, key, val) => setForm(f => {
    const q = [...f.quiz];
    q[i] = { ...q[i], [key]: val };
    return { ...f, quiz: q };
  });
  const updateChoice = (qi, ci, val) => setForm(f => {
    const q = [...f.quiz];
    const choices = [...(q[qi].choices || [])];
    choices[ci] = val;
    q[qi] = { ...q[qi], choices };
    return { ...f, quiz: q };
  });

  // ── Save
  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) {
        await adminCreateLesson(form);
      } else {
        await adminUpdateLesson(id, form);
      }
      navigate("/adminlessons");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <MainLayout><div className="admin-loading">Loading…</div></MainLayout>;

  const contentFields = [
    ["description", null],
    ["introduction", null],
    ["headerOne", "discussionOne"],
    ["headerTwo", "discussionTwo"],
    ["headerThree", "discussionThree"],
    ["headerFour", "discussionFour"],
    ["headerFive", "discussionFive"],
    ["headerSix", "discussionSix"],
    ["headerSeven", "discussionSeven"],
  ];

  return (
    <MainLayout>
      <div className="admin-section-wrapper">

        <button className="admin-back-btn" onClick={() => navigate("/adminlessons")}>
          ← Back to Lessons
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">{isNew ? "Create Lesson" : "Edit Lesson"}</h1>
        </div>

        <div className="admin-form-card">

          {/* ── Basic Info ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Basic Information</p>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Lesson Title *</label>
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
              <div className="admin-form-group">
                <label className="admin-form-label">Completion Time</label>
                <input className="admin-form-input" value={form.completionTime}
                  onChange={e => setField("completionTime", e.target.value)} placeholder="~15 min" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">YouTube URL</label>
                <input className="admin-form-input" value={form.youtubeUrl}
                  onChange={e => setField("youtubeUrl", e.target.value)} placeholder="https://youtube.com/..." />
              </div>
            </div>
          </div>

          {/* ── Image Upload ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Lesson Image</p>
            <div
              className="admin-upload-area"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleImageFile(e.dataTransfer.files[0]); }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={e => handleImageFile(e.target.files[0])}
              />
              {uploading ? (
                <p className="admin-upload-hint">⏳ Uploading to Cloudinary…</p>
              ) : imagePreview ? (
                <img src={imagePreview} alt="Preview" className="admin-upload-preview" />
              ) : (
                <p className="admin-upload-hint">📁 Click or drag & drop an image to upload<br /><small>Uploads to folder named after lesson title</small></p>
              )}
            </div>
          </div>

          {/* ── Content ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Content</p>
            {contentFields.map(([header, discussion]) => (
              <div key={header}>
                <div className="admin-form-group">
                  <label className="admin-form-label">
                    {header === "description" ? "Description" :
                     header === "introduction" ? "Introduction" :
                     `Header — ${header.replace("header", "Section ")}`}
                  </label>
                  <textarea
                    className="admin-form-textarea"
                    value={form.content[header] || ""}
                    onChange={e => setContent(header, e.target.value)}
                    placeholder={`Enter ${header}…`}
                    rows={header === "description" || header === "introduction" ? 3 : 2}
                  />
                </div>
                {discussion && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      Discussion — {discussion.replace("discussion", "Section ")}
                    </label>
                    <textarea
                      className="admin-form-textarea"
                      value={form.content[discussion] || ""}
                      onChange={e => setContent(discussion, e.target.value)}
                      placeholder="Enter discussion…"
                      rows={4}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Quiz Builder ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Quiz ({form.quiz.length} items)</p>

            {form.quiz.map((item, i) => (
              <div key={i} className="admin-quiz-item">
                <div className="admin-quiz-item-header">
                  <span className="admin-quiz-item-label">Item {i + 1}</span>
                  <button className="admin-remove-btn" onClick={() => removeQuizItem(i)}>Remove</button>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Question Type</label>
                    <select className="admin-form-select" value={item.type}
                      onChange={e => updateQuizItem(i, "type", e.target.value)}>
                      {QUIZ_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Correct Answer</label>
                    <input className="admin-form-input" value={item.correctAnswer}
                      onChange={e => updateQuizItem(i, "correctAnswer", e.target.value)}
                      placeholder="Correct answer" />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Question</label>
                  <textarea className="admin-form-textarea" rows={2} value={item.question}
                    onChange={e => updateQuizItem(i, "question", e.target.value)}
                    placeholder="Enter question text" />
                </div>

                {/* Type-specific fields */}
                {item.type === "multiple-choice" && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Choices</label>
                    {(item.choices || ["","","",""]).map((c, ci) => (
                      <input key={ci} className="admin-form-input" style={{ marginBottom: 6 }}
                        value={c}
                        onChange={e => updateChoice(i, ci, e.target.value)}
                        placeholder={`Choice ${ci + 1}`} />
                    ))}
                  </div>
                )}

                {item.type === "scenario" && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Scenario</label>
                    <textarea className="admin-form-textarea" rows={2} value={item.scenario}
                      onChange={e => updateQuizItem(i, "scenario", e.target.value)}
                      placeholder="Describe the scenario…" />
                  </div>
                )}

                {item.type === "kerning-slide" && (
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Letter A</label>
                      <input className="admin-form-input" value={item.letterA}
                        onChange={e => updateQuizItem(i, "letterA", e.target.value)} placeholder="A" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Letter B</label>
                      <input className="admin-form-input" value={item.letterB}
                        onChange={e => updateQuizItem(i, "letterB", e.target.value)} placeholder="V" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Target Offset</label>
                      <input type="number" className="admin-form-input" value={item.targetOffset}
                        onChange={e => updateQuizItem(i, "targetOffset", +e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Tolerance</label>
                      <input type="number" className="admin-form-input" value={item.tolerance}
                        onChange={e => updateQuizItem(i, "tolerance", +e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-form-label">Explanation (optional)</label>
                  <input className="admin-form-input" value={item.explanation}
                    onChange={e => updateQuizItem(i, "explanation", e.target.value)}
                    placeholder="Shown after answering…" />
                </div>
              </div>
            ))}

            <button className="admin-add-btn" onClick={addQuizItem}>
              + Add Quiz Item
            </button>
          </div>

          {/* ── Submit ── */}
          <div className="admin-form-submit-row">
            <button className="admin-cancel-btn" onClick={() => navigate("/adminlessons")}>
              Cancel
            </button>
            <button className="admin-submit-btn" onClick={handleSave} disabled={saving || uploading}>
              {saving ? "Saving…" : isNew ? "Create Lesson" : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLessonEdit;