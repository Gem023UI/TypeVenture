import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { fetchArticleById } from "../../api/articles";
import "./ArticleDetails.css";

const DEFAULT_IMG = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

export default function ArticleDetails() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [article, setArticle]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    fetchArticleById(id)
      .then(setArticle)
      .catch(() => setError("Article not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="article-details-loading">Loading article…</div>
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="article-details-wrapper">
          <div className="article-details-container">
            <button className="back-button" onClick={() => navigate("/articles")}>
              ← Back to Articles
            </button>
            <p className="article-details-error">{error || "Article not found."}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="article-details-wrapper">
        <div className="article-details-container">

          {/* ── Back Button ── */}
          <button className="back-button" onClick={() => navigate("/articles")}>
            ← Back to Articles
          </button>

          {/* ── Header ── */}
          <header className="article-header">
            <h1 className="article-main-title">{article.title}</h1>
            {article.subtitle && (
              <p className="article-subtitle">{article.subtitle}</p>
            )}
            <div className="article-meta">
              {article.author && (
                <span className="article-author">By {article.author}</span>
              )}
              {article.publishedAt && (
                <span className="article-date">{formatDate(article.publishedAt)}</span>
              )}
              {article.readTime && (
                <span className="article-read-time">{article.readTime}</span>
              )}
            </div>
          </header>

          {/* ── Featured Image ── */}
          <div className="article-featured-image">
            <img
              src={article.featuredImage || DEFAULT_IMG}
              alt={article.title}
              onError={(e) => { e.target.src = DEFAULT_IMG; }}
            />
          </div>

          {/* ── Content ── */}
          <div className="article-content">

            {/* Intro */}
            {article.content?.intro && (
              <section className="content-section">
                <p className="intro-text">{article.content.intro}</p>
              </section>
            )}

            {/* Sections */}
            {(article.content?.sections || []).map((section, i) => (
              <section key={i} className="content-section">
                {section.heading && <h2>{section.heading}</h2>}

                {/* Section image */}
                {section.image && (
                  <div className="pairing-showcase">
                    <img
                      src={section.image}
                      alt={section.heading || `Section ${i + 1}`}
                      onError={(e) => { e.target.src = DEFAULT_IMG; }}
                    />
                  </div>
                )}

                {/* Body text — split by newline so multi-paragraph bodies render correctly */}
                {section.body && section.body.split("\n\n").map((para, pi) => (
                  para.trim() && <p key={pi}>{para.trim()}</p>
                ))}

                {/* List items */}
                {section.listItems?.length > 0 && (
                  <ul>
                    {section.listItems.map((item, li) => (
                      <li key={li}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

          </div>

          {/* ── Footer ── */}
          <footer className="article-footer">
            <button
              className="back-to-articles-btn"
              onClick={() => navigate("/articles")}
            >
              ← Back to All Articles
            </button>
          </footer>

        </div>
      </article>
    </MainLayout>
  );
}