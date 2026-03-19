import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminFetchLessonById,
  adminCreateLesson,
  adminUpdateLesson,
  adminUploadImage,
} from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

/* ─── Constants ─────────────────────────── */
const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const QUIZ_TYPES = [
  { value: "multiple-choice",   label: "Multiple Choice" },
  { value: "identification",    label: "Identification" },
  { value: "scenario",          label: "Scenario" },
  { value: "kerning-slide",     label: "Kerning Slide" },
  { value: "leading-lines",     label: "Leading Lines" },
  { value: "x-height-detective",label: "X-Height Detective" },
  { value: "font-select",       label: "Font Select" },
  { value: "hierarchy-builder", label: "Hierarchy Builder" },
  { value: "brand-pairing",     label: "Brand Pairing" },
];

const HIERARCHY_ROLES = ["title", "subtitle", "body", "alert"];

const blankSection = () => ({
  header: "", discussion: "", images: [], authorLink: "",
});

const blankQuizItem = () => ({
  type:             "multiple-choice",
  question:         "",
  choices:          ["", "", "", ""],
  correctAnswer:    "",
  explanation:      "",
  scenario:         "",
  // kerning-slide
  letterA: "", letterB: "",
  targetOffset: 0, tolerance: 5, min: -40, max: 10,
  // leading-lines
  sentence1: "", sentence2: "",
  minLeading: 10, maxLeading: 60, targetLeading: 24, toleranceLeading: 4,
  // font-select
  theme: "", mechanic: "",
  learningObjectives: [],
  narrative: "", narrativeContext: "",
  problem: "", problemContext: "",
  contextImage: "", backgroundImage: "",
  displayText: "", subtext: "",
  wrongFont: "",
  correctAnswers: [],
  typefaceOptions: [],
  // hierarchy-builder
  textLayers: [],
  availableRoles: ["title", "subtitle", "body", "alert"],
  // brand-pairing
  brandBackground: "",
  headlineText: "", bodyText: "",
  wrongHeadlineFont: "", wrongBodyFont: "",
  brandPersonas: [],
});

const normaliseQuizItem = (item) => ({
  type:             item.type          || "multiple-choice",
  question:         item.question      || "",
  choices:          item.choices       || ["", "", "", ""],
  correctAnswer:    item.correctAnswer || "",
  explanation:      item.explanation   || "",
  scenario:         item.scenario      || "",
  letterA:          item.letterA       || "",
  letterB:          item.letterB       || "",
  targetOffset:     item.targetOffset  ?? 0,
  tolerance:        item.tolerance     ?? 5,
  min:              item.min           ?? -40,
  max:              item.max           ?? 10,
  sentence1:        item.sentence1        || "",
  sentence2:        item.sentence2        || "",
  minLeading:       item.minLeading       ?? 10,
  maxLeading:       item.maxLeading       ?? 60,
  targetLeading:    item.targetLeading    ?? 24,
  toleranceLeading: item.toleranceLeading ?? 4,
  theme:              item.theme              || "",
  mechanic:           item.mechanic           || "",
  learningObjectives: item.learningObjectives || [],
  narrative:          item.narrative          || "",
  narrativeContext:   item.narrativeContext   || "",
  problem:            item.problem            || "",
  problemContext:     item.problemContext     || "",
  contextImage:       item.contextImage       || "",
  backgroundImage:    item.backgroundImage    || "",
  displayText:        item.displayText        || "",
  subtext:            item.subtext            || "",
  wrongFont:          item.wrongFont          || "",
  correctAnswers:     item.correctAnswers     || [],
  typefaceOptions:    item.typefaceOptions    || [],
  textLayers:         item.textLayers         || [],
  availableRoles:     item.availableRoles     || ["title","subtitle","body","alert"],
  brandBackground:    item.brandBackground    || "",
  headlineText:       item.headlineText       || "",
  bodyText:           item.bodyText           || "",
  wrongHeadlineFont:  item.wrongHeadlineFont  || "",
  wrongBodyFont:      item.wrongBodyFont      || "",
  brandPersonas:      item.brandPersonas      || [],
});

const normaliseSection = (sec) => ({
  header: sec.header || "", discussion: sec.discussion || "",
  images: sec.images || [], authorLink: sec.authorLink || "",
});

/* ─── Section Image Carousel ────────────── */
const SectionCarousel = ({ images, onAdd, onRemove }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length === 0) setCurrent(0);
    else if (current >= images.length) setCurrent(images.length - 1);
  }, [images.length]);

  return (
    <div className="admin-carousel">
      {images.length > 0 && (
        <div className="admin-carousel-viewer">
          <img src={images[current]} alt={`Section image ${current + 1}`} className="admin-carousel-img" />
          <div className="admin-carousel-controls">
            <button className="admin-carousel-arrow" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>‹</button>
            <span className="admin-carousel-count">{current + 1} / {images.length}</span>
            <button className="admin-carousel-arrow" onClick={() => setCurrent(c => Math.min(images.length - 1, c + 1))} disabled={current === images.length - 1}>›</button>
          </div>
          <button className="admin-carousel-remove" onClick={() => onRemove(current)} title="Remove this image">✕ Remove</button>
        </div>
      )}
      {images.length > 1 && (
        <div className="admin-carousel-thumbs">
          {images.map((url, i) => (
            <img key={i} src={url} alt={`thumb ${i + 1}`}
              className={`admin-carousel-thumb ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)} />
          ))}
        </div>
      )}
      <button className="admin-add-btn" style={{ marginTop: 8 }} onClick={onAdd}>+ Add Image to Section</button>
    </div>
  );
};

/* ─── Main Component ────────────────────── */
const AdminLessonEdit = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const isNew    = id === "new";

  const [form, setForm] = useState({
    title: "", lessonImage: "", difficulty: "Beginner",
    completionTime: "~15 min", youtubeUrl: "",
    description: "", instruction: "", sections: [], quiz: [],
  });

  const [imagePreview,     setImagePreview]     = useState("");
  const [uploading,        setUploading]        = useState(false);
  const [sectionUploading, setSectionUploading] = useState({});
  const [saving,           setSaving]           = useState(false);
  const [loading,          setLoading]          = useState(!isNew);
  const [saveError,        setSaveError]        = useState("");

  const coverFileRef    = useRef(null);
  const sectionFileRefs = useRef({});

  const buildLegacySections = (lesson) => {
    const c = lesson.content || {};
    const pairs = [
      [c.headerOne,c.discussionOne],[c.headerTwo,c.discussionTwo],
      [c.headerThree,c.discussionThree],[c.headerFour,c.discussionFour],
      [c.headerFive,c.discussionFive],[c.headerSix,c.discussionSix],
      [c.headerSeven,c.discussionSeven],
    ];
    return pairs.filter(([h,d]) => h||d)
      .map(([h,d]) => ({ header:h||"", discussion:d||"", images:[], authorLink:"" }));
  };

  useEffect(() => {
    if (isNew) return;
    adminFetchLessonById(id)
      .then(lesson => {
        const rawSections = lesson.sections?.length > 0
          ? lesson.sections : buildLegacySections(lesson);
        setForm({
          title:          lesson.title          || "",
          lessonImage:    lesson.lessonImage     || "",
          difficulty:     lesson.difficulty      || "Beginner",
          completionTime: lesson.completionTime  || "~15 min",
          youtubeUrl:     lesson.youtubeUrl      || "",
          description:    lesson.description     || lesson.content?.description  || "",
          instruction:    lesson.instruction     || lesson.content?.introduction || "",
          sections:       rawSections.map(normaliseSection),
          quiz:           (lesson.quiz || []).map(normaliseQuizItem),
        });
        setImagePreview(lesson.lessonImage || "");
      })
      .catch(err => { console.error(err); setSaveError("Failed to load lesson data. Please refresh."); })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleCoverImage = async (file) => {
    if (!file) return;
    const folder = form.title?.trim().replace(/[^a-zA-Z0-9_\-]/g,"_").replace(/_+/g,"_") || "lesson_images";
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setImagePreview(base64);
      try {
        setUploading(true);
        const { url } = await adminUploadImage(base64, folder);
        setField("lessonImage", url); setImagePreview(url);
      } catch (e) { setSaveError("Cover image upload failed."); }
      finally { setUploading(false); }
    };
    reader.readAsDataURL(file);
  };

  const addSection    = () => setForm(f => ({ ...f, sections: [...f.sections, blankSection()] }));
  const removeSection = (i) => setForm(f => ({ ...f, sections: f.sections.filter((_,idx) => idx !== i) }));
  const moveSection   = (i, dir) => setForm(f => {
    const s = [...f.sections]; const j = i + dir;
    if (j < 0 || j >= s.length) return f;
    [s[i],s[j]] = [s[j],s[i]]; return { ...f, sections: s };
  });
  const updateSection = (i, key, val) => setForm(f => {
    const s = [...f.sections]; s[i] = { ...s[i], [key]: val }; return { ...f, sections: s };
  });

  const handleSectionImageFile = async (si, file) => {
    if (!file) return;
    const folder = form.title?.trim().replace(/[^a-zA-Z0-9_\-]/g,"_").replace(/_+/g,"_") || "lesson_images";
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setSectionUploading(prev => ({ ...prev, [si]: true }));
        const { url } = await adminUploadImage(reader.result, folder);
        setForm(f => { const s=[...f.sections]; s[si]={...s[si],images:[...(s[si].images||[]),url]}; return {...f,sections:s}; });
      } catch (e) { setSaveError(`Section ${si+1} image upload failed.`); }
      finally { setSectionUploading(prev => ({ ...prev, [si]: false })); }
    };
    reader.readAsDataURL(file);
  };

  const removeSectionImage = (si, imgIdx) => setForm(f => {
    const s = [...f.sections]; s[si] = { ...s[si], images: s[si].images.filter((_,i) => i !== imgIdx) };
    return { ...f, sections: s };
  });

  /* ── Quiz helpers ── */
  const addQuizItem    = () => setForm(f => ({ ...f, quiz: [...f.quiz, blankQuizItem()] }));
  const removeQuizItem = (i) => setForm(f => ({ ...f, quiz: f.quiz.filter((_,idx) => idx !== i) }));
  const updateQuizItem = (i, key, val) => setForm(f => {
    const q=[...f.quiz]; q[i]={...q[i],[key]:val}; return {...f,quiz:q};
  });
  const updateChoice = (qi, ci, val) => setForm(f => {
    const q=[...f.quiz]; const choices=[...(q[qi].choices||[])]; choices[ci]=val;
    q[qi]={...q[qi],choices}; return {...f,quiz:q};
  });
  const addChoice    = (qi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],choices:[...(q[qi].choices||[]),""]};return {...f,quiz:q}; });
  const removeChoice = (qi, ci) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],choices:(q[qi].choices||[]).filter((_,idx)=>idx!==ci)};return {...f,quiz:q}; });

  /* font-select helpers */
  const addObjective     = (qi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],learningObjectives:[...(q[qi].learningObjectives||[]),{objective:""}]};return {...f,quiz:q}; });
  const updateObjective  = (qi, oi, val) => setForm(f => { const q=[...f.quiz]; const o=[...(q[qi].learningObjectives||[])]; o[oi]={objective:val}; q[qi]={...q[qi],learningObjectives:o};return {...f,quiz:q}; });
  const removeObjective  = (qi, oi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],learningObjectives:(q[qi].learningObjectives||[]).filter((_,idx)=>idx!==oi)};return {...f,quiz:q}; });
  const addTypefaceOption    = (qi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],typefaceOptions:[...(q[qi].typefaceOptions||[]),{typefaceTitle:"",font:"",vibe:""}]};return {...f,quiz:q}; });
  const updateTypefaceOption = (qi,ti,key,val) => setForm(f => { const q=[...f.quiz]; const opts=[...(q[qi].typefaceOptions||[])]; opts[ti]={...opts[ti],[key]:val}; q[qi]={...q[qi],typefaceOptions:opts};return {...f,quiz:q}; });
  const removeTypefaceOption = (qi,ti) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],typefaceOptions:(q[qi].typefaceOptions||[]).filter((_,idx)=>idx!==ti)};return {...f,quiz:q}; });
  const addCorrectAnswer    = (qi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],correctAnswers:[...(q[qi].correctAnswers||[]),""]};return {...f,quiz:q}; });
  const updateCorrectAnswer = (qi,ai,val) => setForm(f => { const q=[...f.quiz]; const ca=[...(q[qi].correctAnswers||[])]; ca[ai]=val; q[qi]={...q[qi],correctAnswers:ca};return {...f,quiz:q}; });
  const removeCorrectAnswer = (qi,ai) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],correctAnswers:(q[qi].correctAnswers||[]).filter((_,idx)=>idx!==ai)};return {...f,quiz:q}; });

  /* hierarchy-builder helpers */
  const addTextLayer    = (qi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],textLayers:[...(q[qi].textLayers||[]),{text:"",role:"body",targetFontSize:16,targetWeight:"Regular",targetColor:"#000000",targetCase:"normal"}]};return {...f,quiz:q}; });
  const updateTextLayer = (qi,li,key,val) => setForm(f => { const q=[...f.quiz]; const layers=[...(q[qi].textLayers||[])]; layers[li]={...layers[li],[key]:val}; q[qi]={...q[qi],textLayers:layers};return {...f,quiz:q}; });
  const removeTextLayer = (qi,li) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],textLayers:(q[qi].textLayers||[]).filter((_,idx)=>idx!==li)};return {...f,quiz:q}; });

  /* brand-pairing helpers */
  const addBrandPersona    = (qi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],brandPersonas:[...(q[qi].brandPersonas||[]),{personaTitle:"",headlineFont:"",bodyFont:"",vibe:""}]};return {...f,quiz:q}; });
  const updateBrandPersona = (qi,pi,key,val) => setForm(f => { const q=[...f.quiz]; const ps=[...(q[qi].brandPersonas||[])]; ps[pi]={...ps[pi],[key]:val}; q[qi]={...q[qi],brandPersonas:ps};return {...f,quiz:q}; });
  const removeBrandPersona = (qi,pi) => setForm(f => { const q=[...f.quiz]; q[qi]={...q[qi],brandPersonas:(q[qi].brandPersonas||[]).filter((_,idx)=>idx!==pi)};return {...f,quiz:q}; });

  const anyUploading = uploading || Object.values(sectionUploading).some(Boolean);

  const buildPayload = () => ({
    title: form.title.trim(), lessonImage: form.lessonImage,
    difficulty: form.difficulty, completionTime: form.completionTime,
    youtubeUrl: form.youtubeUrl, description: form.description, instruction: form.instruction,
    sections: form.sections.map(sec => ({
      header: sec.header||"", discussion: sec.discussion||"",
      images: sec.images||[], authorLink: sec.authorLink||"",
    })),
    quiz: form.quiz.map(item => {
      const base = {
        type: item.type, question: item.question,
        correctAnswer: item.correctAnswer, explanation: item.explanation||"",
      };
      if (["multiple-choice","scenario","x-height-detective"].includes(item.type)) base.choices = item.choices||[];
      if (item.type === "scenario") { base.scenario = item.scenario||""; base.choices = item.choices||[]; }
      if (item.type === "kerning-slide") {
        base.letterA=item.letterA; base.letterB=item.letterB;
        base.targetOffset=item.targetOffset; base.tolerance=item.tolerance;
        base.min=item.min; base.max=item.max;
      }
      if (item.type === "leading-lines") {
        base.sentence1=item.sentence1||""; base.sentence2=item.sentence2||"";
        base.minLeading=item.minLeading??10; base.maxLeading=item.maxLeading??60;
        base.targetLeading=item.targetLeading??24; base.toleranceLeading=item.toleranceLeading??4;
      }
      if (item.type === "font-select") {
        base.theme=item.theme||""; base.mechanic=item.mechanic||"";
        base.learningObjectives=item.learningObjectives||[];
        base.narrative=item.narrative||""; base.narrativeContext=item.narrativeContext||"";
        base.problem=item.problem||""; base.problemContext=item.problemContext||"";
        base.contextImage=item.contextImage||""; base.backgroundImage=item.backgroundImage||"";
        base.displayText=item.displayText||""; base.subtext=item.subtext||"";
        base.wrongFont=item.wrongFont||"";
        base.correctAnswers=item.correctAnswers||[];
        base.typefaceOptions=item.typefaceOptions||[];
      }
      if (item.type === "hierarchy-builder") {
        base.textLayers=item.textLayers||[];
        base.availableRoles=item.availableRoles||["title","subtitle","body","alert"];
      }
      if (item.type === "brand-pairing") {
        base.brandBackground=item.brandBackground||"";
        base.headlineText=item.headlineText||""; base.bodyText=item.bodyText||"";
        base.wrongHeadlineFont=item.wrongHeadlineFont||""; base.wrongBodyFont=item.wrongBodyFont||"";
        base.brandPersonas=item.brandPersonas||[];
      }
      return base;
    }),
  });

  const handleSave = async () => {
    setSaveError("");
    if (!form.title.trim()) { setSaveError("Lesson title is required."); return; }
    if (anyUploading) { setSaveError("Please wait for all uploads to finish."); return; }
    setSaving(true);
    try {
      const payload = buildPayload();
      if (isNew) await adminCreateLesson(payload);
      else       await adminUpdateLesson(id, payload);
      navigate("/adminlessons");
    } catch (e) {
      setSaveError(e?.response?.data?.error || e?.response?.data?.details || e?.message || "Failed to save lesson.");
    } finally { setSaving(false); }
  };

  if (loading) return <MainLayout><div className="admin-loading">Loading…</div></MainLayout>;

  return (
    <MainLayout>
      <div className="admin-section-wrapper">
        <button className="admin-back-btn" onClick={() => navigate("/adminlessons")}>← Back to Lessons</button>
        <div className="admin-page-header">
          <h1 className="admin-page-title">{isNew ? "Create Lesson" : "Edit Lesson"}</h1>
        </div>

        <div className="admin-form-card">

          {/* ══ BASIC INFO ══ */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Basic Information</p>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Lesson Title *</label>
                <input className="admin-form-input" value={form.title} onChange={e => setField("title",e.target.value)} placeholder="Enter title" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Difficulty</label>
                <select className="admin-form-select" value={form.difficulty} onChange={e => setField("difficulty",e.target.value)}>
                  {DIFFICULTY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Completion Time</label>
                <input className="admin-form-input" value={form.completionTime} onChange={e => setField("completionTime",e.target.value)} placeholder="~15 min" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">YouTube URL</label>
                <input className="admin-form-input" value={form.youtubeUrl} onChange={e => setField("youtubeUrl",e.target.value)} placeholder="https://www.youtube.com/embed/..." />
              </div>
            </div>
          </div>

          {/* ══ LESSON IMAGE ══ */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Lesson Cover Image</p>
            <div className="admin-upload-area" onClick={() => coverFileRef.current?.click()}
              onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleCoverImage(e.dataTransfer.files[0]); }}>
              <input ref={coverFileRef} type="file" accept="image/*" style={{ display:"none" }}
                onChange={e => { handleCoverImage(e.target.files[0]); e.target.value=""; }} />
              {uploading ? <p className="admin-upload-hint">⏳ Uploading to Cloudinary…</p>
                : imagePreview ? <img src={imagePreview} alt="Cover preview" className="admin-upload-preview" />
                : <p className="admin-upload-hint">📁 Click or drag & drop to upload cover image</p>}
            </div>
          </div>

          {/* ══ INTRODUCTION ══ */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Introduction</p>
            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea className="admin-form-textarea" rows={3} value={form.description} onChange={e => setField("description",e.target.value)} placeholder="Brief overview…" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Instruction</label>
              <textarea className="admin-form-textarea" rows={3} value={form.instruction} onChange={e => setField("instruction",e.target.value)} placeholder="Opening paragraph…" />
            </div>
          </div>

          {/* ══ SECTIONS ══ */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Content Sections ({form.sections.length})</p>
            {form.sections.map((sec, si) => (
              <div key={si} className="admin-quiz-item">
                <div className="admin-quiz-item-header">
                  <span className="admin-quiz-item-label">Section {si + 1}</span>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="admin-carousel-arrow" onClick={() => moveSection(si,-1)} disabled={si===0} title="Move up">↑</button>
                    <button className="admin-carousel-arrow" onClick={() => moveSection(si,1)} disabled={si===form.sections.length-1} title="Move down">↓</button>
                    <button className="admin-remove-btn" onClick={() => removeSection(si)}>Remove</button>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Header <span className="admin-form-optional">(optional)</span></label>
                  <input className="admin-form-input" value={sec.header} onChange={e => updateSection(si,"header",e.target.value)} placeholder="Section heading…" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Discussion <span className="admin-form-optional">(optional)</span></label>
                  <textarea className="admin-form-textarea" rows={5} value={sec.discussion} onChange={e => updateSection(si,"discussion",e.target.value)} placeholder="Section body text…" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Author / Source Link <span className="admin-form-optional">(optional)</span></label>
                  <input className="admin-form-input" value={sec.authorLink} onChange={e => updateSection(si,"authorLink",e.target.value)} placeholder="https://source-article.com" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Section Images <span className="admin-form-optional">(optional — carousel)</span></label>
                  <input type="file" accept="image/*" style={{ display:"none" }}
                    ref={el => { sectionFileRefs.current[si] = el; }}
                    onChange={e => { handleSectionImageFile(si,e.target.files[0]); e.target.value=""; }} />
                  {sectionUploading[si]
                    ? <p className="admin-upload-hint" style={{ margin:"8px 0" }}>⏳ Uploading image…</p>
                    : <SectionCarousel images={sec.images||[]} onAdd={() => sectionFileRefs.current[si]?.click()} onRemove={(imgIdx) => removeSectionImage(si,imgIdx)} />}
                </div>
              </div>
            ))}
            <button className="admin-add-btn" onClick={addSection}>+ Add Section</button>
          </div>

          {/* ══ QUIZ BUILDER ══ */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Quiz ({form.quiz.length} items)</p>

            {form.quiz.map((item, i) => (
              <div key={i} className="admin-quiz-item">
                <div className="admin-quiz-item-header">
                  <span className="admin-quiz-item-label">
                    Item {i+1} — {QUIZ_TYPES.find(t => t.value===item.type)?.label || item.type}
                  </span>
                  <button className="admin-remove-btn" onClick={() => removeQuizItem(i)}>Remove</button>
                </div>

                {/* Type + Correct Answer */}
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Question Type</label>
                    <select className="admin-form-select" value={item.type} onChange={e => updateQuizItem(i,"type",e.target.value)}>
                      {QUIZ_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  {!["font-select","hierarchy-builder","brand-pairing"].includes(item.type) && (
                    <div className="admin-form-group">
                      <label className="admin-form-label">Correct Answer</label>
                      <input className="admin-form-input" value={item.correctAnswer}
                        onChange={e => updateQuizItem(i,"correctAnswer",e.target.value)}
                        placeholder={item.type==="kerning-slide"||item.type==="leading-lines" ? "correct (auto-evaluated)" : "Exact matching text"} />
                    </div>
                  )}
                  {item.type === "brand-pairing" && (
                    <div className="admin-form-group">
                      <label className="admin-form-label">Correct Answer (personaTitle)</label>
                      <input className="admin-form-input" value={item.correctAnswer}
                        onChange={e => updateQuizItem(i,"correctAnswer",e.target.value)}
                        placeholder="Must match a persona title exactly" />
                    </div>
                  )}
                </div>

                {/* Question text */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Question</label>
                  <textarea className="admin-form-textarea" rows={2} value={item.question}
                    onChange={e => updateQuizItem(i,"question",e.target.value)} placeholder="Enter question text" />
                </div>

                {/* ── Choices (MCQ, scenario, x-height-detective) ── */}
                {["multiple-choice","scenario","x-height-detective"].includes(item.type) && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Choices</label>
                    {(item.choices||[]).map((c,ci) => (
                      <div key={ci} style={{ display:"flex", gap:6, marginBottom:6 }}>
                        <input className="admin-form-input" style={{ flex:1 }} value={c}
                          onChange={e => updateChoice(i,ci,e.target.value)} placeholder={`Choice ${ci+1}`} />
                        <button className="admin-remove-btn" style={{ flexShrink:0 }} onClick={() => removeChoice(i,ci)}>✕</button>
                      </div>
                    ))}
                    <button className="admin-add-btn" style={{ marginTop:4 }} onClick={() => addChoice(i)}>+ Add Choice</button>
                  </div>
                )}

                {/* ── Scenario ── */}
                {item.type === "scenario" && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Scenario Description</label>
                    <textarea className="admin-form-textarea" rows={2} value={item.scenario}
                      onChange={e => updateQuizItem(i,"scenario",e.target.value)} placeholder="Describe the scenario context…" />
                  </div>
                )}

                {/* ── Kerning Slide ── */}
                {item.type === "kerning-slide" && (
                  <div className="admin-form-row">
                    {[["Letter A","letterA","A"],["Letter B","letterB","V"],
                      ["Target Offset (px)","targetOffset",0],["Tolerance (±px)","tolerance",5],
                      ["Min (px)","min",-40],["Max (px)","max",10]
                    ].map(([label,key,ph]) => (
                      <div key={key} className="admin-form-group">
                        <label className="admin-form-label">{label}</label>
                        <input className="admin-form-input" type={typeof ph==="number"?"number":"text"}
                          value={item[key]} onChange={e => updateQuizItem(i,key,typeof ph==="number"?+e.target.value:e.target.value)}
                          placeholder={String(ph)} />
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Leading Lines ── */}
                {item.type === "leading-lines" && (
                  <>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Sentence 1 (top line)</label>
                        <input className="admin-form-input" value={item.sentence1} onChange={e => updateQuizItem(i,"sentence1",e.target.value)} placeholder="First line…" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Sentence 2 (bottom line)</label>
                        <input className="admin-form-input" value={item.sentence2} onChange={e => updateQuizItem(i,"sentence2",e.target.value)} placeholder="Second line…" />
                      </div>
                    </div>
                    <div className="admin-form-row">
                      {[["Min Leading (px)","minLeading"],["Max Leading (px)","maxLeading"],
                        ["Target Leading (px)","targetLeading"],["Tolerance (±px)","toleranceLeading"]
                      ].map(([label,key]) => (
                        <div key={key} className="admin-form-group">
                          <label className="admin-form-label">{label}</label>
                          <input type="number" className="admin-form-input" value={item[key]} onChange={e => updateQuizItem(i,key,+e.target.value)} />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* ── Font Select ── */}
                {item.type === "font-select" && (
                  <>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Theme</label>
                        <input className="admin-form-input" value={item.theme} onChange={e => updateQuizItem(i,"theme",e.target.value)} placeholder="e.g. Brand Identity" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Mechanic</label>
                        <input className="admin-form-input" value={item.mechanic} onChange={e => updateQuizItem(i,"mechanic",e.target.value)} placeholder="e.g. Font Selection" />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Narrative</label>
                      <textarea className="admin-form-textarea" rows={2} value={item.narrative} onChange={e => updateQuizItem(i,"narrative",e.target.value)} placeholder="Story context…" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Narrative Context</label>
                      <textarea className="admin-form-textarea" rows={2} value={item.narrativeContext} onChange={e => updateQuizItem(i,"narrativeContext",e.target.value)} placeholder="Additional narrative detail…" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Problem</label>
                      <textarea className="admin-form-textarea" rows={2} value={item.problem} onChange={e => updateQuizItem(i,"problem",e.target.value)} placeholder="What design problem must the student solve?" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Problem Context</label>
                      <textarea className="admin-form-textarea" rows={2} value={item.problemContext} onChange={e => updateQuizItem(i,"problemContext",e.target.value)} placeholder="Extra context for the problem…" />
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Canvas Display Text</label>
                        <input className="admin-form-input" value={item.displayText} onChange={e => updateQuizItem(i,"displayText",e.target.value)} placeholder="Main text on canvas" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Canvas Subtext</label>
                        <input className="admin-form-input" value={item.subtext} onChange={e => updateQuizItem(i,"subtext",e.target.value)} placeholder="Subtitle / tagline" />
                      </div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Wrong Font (broken state CSS)</label>
                        <input className="admin-form-input" value={item.wrongFont} onChange={e => updateQuizItem(i,"wrongFont",e.target.value)} placeholder="e.g. 'Old English Text MT', serif" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Background Image URL</label>
                        <input className="admin-form-input" value={item.backgroundImage} onChange={e => updateQuizItem(i,"backgroundImage",e.target.value)} placeholder="https://res.cloudinary.com/…" />
                      </div>
                    </div>

                    {/* Correct Answers (multi-select support) */}
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        Correct Answers <span className="admin-form-optional">(add multiple if more than one typeface is acceptable)</span>
                      </label>
                      {(item.correctAnswers||[]).map((ca,ai) => (
                        <div key={ai} style={{ display:"flex", gap:6, marginBottom:6 }}>
                          <input className="admin-form-input" style={{ flex:1 }} value={ca}
                            onChange={e => updateCorrectAnswer(i,ai,e.target.value)} placeholder="typefaceTitle of a correct option" />
                          <button className="admin-remove-btn" style={{ flexShrink:0 }} onClick={() => removeCorrectAnswer(i,ai)}>✕</button>
                        </div>
                      ))}
                      <button className="admin-add-btn" style={{ marginTop:4 }} onClick={() => addCorrectAnswer(i)}>+ Add Correct Answer</button>
                    </div>

                    {/* Learning Objectives */}
                    <div className="admin-form-group">
                      <label className="admin-form-label">Learning Objectives</label>
                      {(item.learningObjectives||[]).map((obj,oi) => (
                        <div key={oi} style={{ display:"flex", gap:6, marginBottom:6 }}>
                          <input className="admin-form-input" style={{ flex:1 }} value={obj.objective}
                            onChange={e => updateObjective(i,oi,e.target.value)} placeholder={`Objective ${oi+1}`} />
                          <button className="admin-remove-btn" style={{ flexShrink:0 }} onClick={() => removeObjective(i,oi)}>✕</button>
                        </div>
                      ))}
                      <button className="admin-add-btn" style={{ marginTop:4 }} onClick={() => addObjective(i)}>+ Add Objective</button>
                    </div>

                    {/* Typeface Options */}
                    <div className="admin-form-group">
                      <label className="admin-form-label">Typeface Options</label>
                      {(item.typefaceOptions||[]).map((opt,ti) => (
                        <div key={ti} className="admin-quiz-item" style={{ marginBottom:8, padding:"12px 16px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                            <span className="admin-form-optional">Option {ti+1}</span>
                            <button className="admin-remove-btn" onClick={() => removeTypefaceOption(i,ti)}>Remove</button>
                          </div>
                          <div className="admin-form-row">
                            {[["Typeface Title","typefaceTitle","e.g. Pacifico"],
                              ["Font (CSS family)","font","e.g. 'Pacifico', cursive"],
                              ["Vibe / Description","vibe","e.g. Relaxed, Tropical"]
                            ].map(([label,key,ph]) => (
                              <div key={key} className="admin-form-group">
                                <label className="admin-form-label">{label}</label>
                                <input className="admin-form-input" value={opt[key]}
                                  onChange={e => updateTypefaceOption(i,ti,key,e.target.value)} placeholder={ph} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button className="admin-add-btn" style={{ marginTop:4 }} onClick={() => addTypefaceOption(i)}>+ Add Typeface Option</button>
                    </div>
                  </>
                )}

                {/* ── Hierarchy Builder ── */}
                {item.type === "hierarchy-builder" && (
                  <>
                    <p className="admin-form-hint">
                      Add each text element from the broken layout. Set its correct role — the player will assign roles and the quiz evaluates whether they match.
                    </p>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Text Layers</label>
                      {(item.textLayers||[]).map((layer,li) => (
                        <div key={li} className="admin-quiz-item" style={{ marginBottom:8, padding:"12px 16px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                            <span className="admin-form-optional">Layer {li+1}</span>
                            <button className="admin-remove-btn" onClick={() => removeTextLayer(i,li)}>Remove</button>
                          </div>
                          <div className="admin-form-row">
                            <div className="admin-form-group">
                              <label className="admin-form-label">Text</label>
                              <input className="admin-form-input" value={layer.text}
                                onChange={e => updateTextLayer(i,li,"text",e.target.value)} placeholder="Text content shown to player" />
                            </div>
                            <div className="admin-form-group">
                              <label className="admin-form-label">Correct Role</label>
                              <select className="admin-form-select" value={layer.role}
                                onChange={e => updateTextLayer(i,li,"role",e.target.value)}>
                                {HIERARCHY_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="admin-add-btn" style={{ marginTop:4 }} onClick={() => addTextLayer(i)}>+ Add Text Layer</button>
                    </div>
                  </>
                )}

                {/* ── Brand Pairing ── */}
                {item.type === "brand-pairing" && (
                  <>
                    <p className="admin-form-hint">
                      Set up the broken canvas state and the three brand personas the player can apply.
                    </p>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Headline Text (canvas)</label>
                        <input className="admin-form-input" value={item.headlineText}
                          onChange={e => updateQuizItem(i,"headlineText",e.target.value)} placeholder="e.g. NEO-FLOW" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Body Text (canvas)</label>
                        <textarea className="admin-form-textarea" rows={2} value={item.bodyText}
                          onChange={e => updateQuizItem(i,"bodyText",e.target.value)} placeholder="Tagline or body copy…" />
                      </div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Wrong Headline Font (broken state)</label>
                        <input className="admin-form-input" value={item.wrongHeadlineFont}
                          onChange={e => updateQuizItem(i,"wrongHeadlineFont",e.target.value)} placeholder="e.g. 'Orbitron', sans-serif" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Wrong Body Font (broken state)</label>
                        <input className="admin-form-input" value={item.wrongBodyFont}
                          onChange={e => updateQuizItem(i,"wrongBodyFont",e.target.value)} placeholder="e.g. 'Comic Sans MS', cursive" />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Background Image URL</label>
                      <input className="admin-form-input" value={item.brandBackground}
                        onChange={e => updateQuizItem(i,"brandBackground",e.target.value)} placeholder="https://res.cloudinary.com/…" />
                    </div>

                    {/* Brand Personas */}
                    <div className="admin-form-group">
                      <label className="admin-form-label">Brand Personas</label>
                      {(item.brandPersonas||[]).map((persona,pi) => (
                        <div key={pi} className="admin-quiz-item" style={{ marginBottom:8, padding:"12px 16px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                            <span className="admin-form-optional">Persona {pi+1}</span>
                            <button className="admin-remove-btn" onClick={() => removeBrandPersona(i,pi)}>Remove</button>
                          </div>
                          <div className="admin-form-row">
                            {[["Persona Title","personaTitle","e.g. The High-Tech Startup"],
                              ["Headline Font (CSS)","headlineFont","e.g. 'Orbitron', sans-serif"],
                              ["Body Font (CSS)","bodyFont","e.g. 'Roboto', sans-serif"],
                              ["Vibe","vibe","e.g. Innovation, Speed, Digital"]
                            ].map(([label,key,ph]) => (
                              <div key={key} className="admin-form-group">
                                <label className="admin-form-label">{label}</label>
                                <input className="admin-form-input" value={persona[key]}
                                  onChange={e => updateBrandPersona(i,pi,key,e.target.value)} placeholder={ph} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button className="admin-add-btn" style={{ marginTop:4 }} onClick={() => addBrandPersona(i)}>+ Add Brand Persona</button>
                    </div>
                  </>
                )}

                {/* Explanation */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Explanation <span className="admin-form-optional">(optional)</span></label>
                  <textarea className="admin-form-textarea" rows={2} value={item.explanation}
                    onChange={e => updateQuizItem(i,"explanation",e.target.value)} placeholder="Shown after answering…" />
                </div>
              </div>
            ))}

            <button className="admin-add-btn" onClick={addQuizItem}>+ Add Quiz Item</button>
          </div>

          {/* ══ ERROR BANNER ══ */}
          {saveError && (
            <div style={{ background:"#fef2f2", border:"1px solid #fca5a5", color:"#991b1b", borderRadius:8, padding:"12px 16px", marginBottom:16, fontSize:"0.9rem" }}>
              ⚠️ {saveError}
            </div>
          )}

          {/* ══ SUBMIT ══ */}
          <div className="admin-form-submit-row">
            <button className="admin-cancel-btn" onClick={() => navigate("/adminlessons")} disabled={saving}>Cancel</button>
            <button className="admin-submit-btn" onClick={handleSave} disabled={saving||anyUploading}
              title={anyUploading ? "Wait for uploads to finish" : ""}>
              {saving ? "Saving…" : anyUploading ? "Uploading…" : isNew ? "Create Lesson" : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLessonEdit;