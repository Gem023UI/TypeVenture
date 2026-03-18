import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminFetchArticleById, adminCreateArticle, adminUpdateArticle, adminUploadImage } from "../../../api/admin";
import MainLayout from "../../layout/MainLayout";
import "./Admin.css";

const blankSection = () => ({ heading: "", body: "", image: "", listItems: [] });

const AdminArticleEdit = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const isNew    = id === "new";

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    author: "",
    readTime: "",
    featuredImage: "",
    content: { intro: "", sections: [] },
    isActive: true,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading]       = useState(false);
  const [saving, setSaving]             = useState(false);
  const [loading, setLoading]           = useState(!isNew);
  const fileInputRef                    = useRef(null);

  useEffect(() => {
    if (!isNew) {
      adminFetchArticleById(id)
        .then(a => {
          setForm({ ...a, content: a.content || { intro: "", sections: [] } });
          setImagePreview(a.featuredImage || "");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const setField   = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setIntro   = (val)      => setForm(f => ({ ...f, content: { ...f.content, intro: val } }));

  // Sections
  const addSection    = () => setForm(f => ({ ...f, content: { ...f.content, sections: [...(f.content.sections || []), blankSection()] } }));
  const removeSection = (i) => setForm(f => ({ ...f, content: { ...f.content, sections: f.content.sections.filter((_, idx) => idx !== i) } }));
  const updateSection = (i, key, val) => setForm(f => {
    const s = [...f.content.sections];
    s[i] = { ...s[i], [key]: val };
    return { ...f, content: { ...f.content, sections: s } };
  });
  const addListItem    = (si) => updateSection(si, "listItems", [...(form.content.sections[si].listItems || []), ""]);
  const removeListItem = (si, li) => updateSection(si, "listItems", form.content.sections[si].listItems.filter((_, idx) => idx !== li));
  const updateListItem = (si, li, val) => {
    const items = [...(form.content.sections[si].listItems || [])];
    items[li] = val;
    updateSection(si, "listItems", items);
  };

  // Image upload
  const handleImageFile = async (file) => {
    if (!file) return;
    const folder = form.title?.trim().replace(/\s+/g, "_") || "article_images";
    const reader  = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setImagePreview(base64);
      try {
        setUploading(true);
        const { url } = await adminUploadImage(base64, folder);
        setField("featuredImage", url);
        setImagePreview(url);
      } catch (e) {
        console.error(e);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) await adminCreateArticle(form);
      else await adminUpdateArticle(id, form);
      navigate("/adminarticles");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <MainLayout><div className="admin-loading">Loading…</div></MainLayout>;

  return (
    <MainLayout>
      <div className="admin-section-wrapper">

        <button className="admin-back-btn" onClick={() => navigate("/adminarticles")}>
          ← Back to Articles
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">{isNew ? "Add Article" : "Edit Article"}</h1>
        </div>

        <div className="admin-form-card">

          {/* ── Basic Info ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Basic Information</p>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Title *</label>
                <input className="admin-form-input" value={form.title}
                  onChange={e => setField("title", e.target.value)} placeholder="Article title" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Author</label>
                <input className="admin-form-input" value={form.author}
                  onChange={e => setField("author", e.target.value)} placeholder="Author name" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Read Time</label>
                <input className="admin-form-input" value={form.readTime}
                  onChange={e => setField("readTime", e.target.value)} placeholder="5 min read" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select className="admin-form-select" value={form.isActive ? "active" : "inactive"}
                  onChange={e => setField("isActive", e.target.value === "active")}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Subtitle</label>
              <textarea className="admin-form-textarea" rows={2} value={form.subtitle}
                onChange={e => setField("subtitle", e.target.value)} placeholder="Short subtitle or teaser" />
            </div>
          </div>

          {/* ── Featured Image ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Featured Image</p>
            <div className="admin-upload-area" onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleImageFile(e.dataTransfer.files[0]); }}>
              <input ref={fileInputRef} type="file" accept="image/*"
                onChange={e => handleImageFile(e.target.files[0])} />
              {uploading ? (
                <p className="admin-upload-hint">⏳ Uploading…</p>
              ) : imagePreview ? (
                <img src={imagePreview} alt="Preview" className="admin-upload-preview" />
              ) : (
                <p className="admin-upload-hint">📁 Click or drag & drop to upload featured image</p>
              )}
            </div>
          </div>

          {/* ── Content ── */}
          <div className="admin-form-section">
            <p className="admin-form-section-title">Content</p>
            <div className="admin-form-group">
              <label className="admin-form-label">Introduction / Lead Text</label>
              <textarea className="admin-form-textarea" rows={4} value={form.content?.intro || ""}
                onChange={e => setIntro(e.target.value)} placeholder="Opening paragraph…" />
            </div>

            <p className="admin-form-section-title" style={{ marginTop: 20 }}>
              Sections ({(form.content?.sections || []).length})
            </p>

            {(form.content?.sections || []).map((sec, si) => (
              <div key={si} className="admin-quiz-item">
                <div className="admin-quiz-item-header">
                  <span className="admin-quiz-item-label">Section {si + 1}</span>
                  <button className="admin-remove-btn" onClick={() => removeSection(si)}>Remove</button>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Heading</label>
                  <input className="admin-form-input" value={sec.heading}
                    onChange={e => updateSection(si, "heading", e.target.value)} placeholder="Section heading" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Body Text</label>
                  <textarea className="admin-form-textarea" rows={4} value={sec.body}
                    onChange={e => updateSection(si, "body", e.target.value)} placeholder="Section content…" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Section Image URL (optional)</label>
                  <input className="admin-form-input" value={sec.image || ""}
                    onChange={e => updateSection(si, "image", e.target.value)} placeholder="https://…" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">List Items ({(sec.listItems || []).length})</label>
                  {(sec.listItems || []).map((item, li) => (
                    <div key={li} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <input className="admin-form-input" value={item}
                        onChange={e => updateListItem(si, li, e.target.value)} placeholder={`Item ${li + 1}`} />
                      <button className="admin-remove-btn" onClick={() => removeListItem(si, li)}>✕</button>
                    </div>
                  ))}
                  <button className="admin-add-btn" style={{ marginTop: 6 }} onClick={() => addListItem(si)}>
                    + Add List Item
                  </button>
                </div>
              </div>
            ))}

            <button className="admin-add-btn" onClick={addSection}>+ Add Section</button>
          </div>

          {/* ── Submit ── */}
          <div className="admin-form-submit-row">
            <button className="admin-cancel-btn" onClick={() => navigate("/adminarticles")}>Cancel</button>
            <button className="admin-submit-btn" onClick={handleSave} disabled={saving || uploading}>
              {saving ? "Saving…" : isNew ? "Publish Article" : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default AdminArticleEdit;