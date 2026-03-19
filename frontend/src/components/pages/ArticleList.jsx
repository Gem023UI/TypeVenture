import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { fetchAllArticles } from "../../api/articles";
import "./ArticleList.css";

/* ─────────────────────────────────────────────────────────────
   Static fallback — matches the 16 DB-seeded articles.
   Used only when the API is unavailable or the DB is empty.
   Each entry includes a staticRoute pointing to the legacy
   individual article pages so existing routes keep working.
───────────────────────────────────────────────────────────── */
const STATIC_ARTICLES = [
  {
    _id: "static-1",
    title: "The Elements of Typographic Style: Bringhurst's Typographer's Bible",
    subtitle: "Robert Bringhurst's landmark work defines typography as an act of honoring content. From rhythm and proportion to historical letterform classification, this guide distills five centuries of typographic wisdom into a single canonical reference.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
    staticRoute: "/article/font-pairings-2026",
  },
  {
    _id: "static-2",
    title: "Paper and Printing: How China Gave the World Movable Type",
    subtitle: "Long before Gutenberg, Chinese and Korean inventors developed paper, ink, and movable type. Tsien Tsuen-Hsuin's scholarly account reveals how these technologies transformed written communication across Asia centuries before the European printing revolution.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532630/897bff6a-2871-4683-b5be-c8600dd0c294.png",
    staticRoute: "/article/typographic-hierarchies",
  },
  {
    _id: "static-3",
    title: "The Printing Press as an Agent of Change",
    subtitle: "Historian Elizabeth Eisenstein argues that the printing press was not merely a faster way to copy books — it was the infrastructure of the Scientific Revolution, the Reformation, and the birth of modern nationalism.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532572/cba9b578-9e1d-4c0c-8f3c-b31a02497e01.png",
    staticRoute: "/article/kerning-guide",
  },
  {
    _id: "static-4",
    title: "The New Typography: Tschichold's Modernist Manifesto",
    subtitle: "Jan Tschichold's 1928 handbook was one of the most radical documents in design history — rejecting centuries of decorative convention in favor of functional clarity, the grid, and the sans-serif typeface.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532533/b3820a3a-d857-4ec4-8b53-338f67303a47.png",
    staticRoute: "/article/font-management-issues",
  },
  {
    _id: "static-5",
    title: "Thinking with Type: Ellen Lupton's Essential Guide",
    subtitle: "Ellen Lupton's Thinking with Type reframes typography as an interface between writer and reader. From letter anatomy to grid systems, it bridges historical scholarship and contemporary digital practice.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532476/571f310a-de94-4a54-a5b2-97734ed9dcb8.png",
    staticRoute: "/article/font-psychology",
  },
  {
    _id: "static-6",
    title: "The Crystal Goblet: Beatrice Warde and Invisible Typography",
    subtitle: "First delivered as a lecture in 1932, Beatrice Warde's 'The Crystal Goblet' remains the most famous argument ever made about the purpose of typography and still divides typographers nearly a century later.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532422/f6ff5481-f3a6-40ee-bad1-a3c8f0276e19.png",
    staticRoute: "/article/ux-typography-guide",
  },
  {
    _id: "static-7",
    title: "Stop Stealing Sheep: Erik Spiekermann's Guide to How Type Works",
    subtitle: "Erik Spiekermann's accessible masterwork explains the mechanics and psychology of type for working designers — from why leading matters to how type functions as a brand's voice.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532341/e09f3d4b-ddef-40ab-b717-496ad06f757e.png",
    staticRoute: "/article/design-trends-2026",
  },
];

export default function ArticleList() {
  const navigate = useNavigate();
  const [articles, setArticles]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [usingStatic, setUsingStatic] = useState(false);

  useEffect(() => {
    fetchAllArticles()
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(data);
          setUsingStatic(false);
        } else {
          // DB is empty — show static list until seeder has run
          setArticles(STATIC_ARTICLES);
          setUsingStatic(true);
        }
      })
      .catch(() => {
        // API unavailable — fall back to static list
        setArticles(STATIC_ARTICLES);
        setUsingStatic(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleArticleClick = (article) => {
    if (usingStatic || article.staticRoute) {
      navigate(article.staticRoute);
    } else {
      navigate(`/article/${article._id}`);
    }
  };

  return (
    <MainLayout>
      <section className="article-list-wrapper">
        <div className="article-list-container">

          <div className="article-list-header">
            <h1 className="article-list-title">
              <span className="title-type">TYPE</span>
              <span className="title-articles">ARTICLES</span>
            </h1>
            <p className="article-list-description">
              Explore our curated collection of typography articles — from the history of movable type to modern font psychology. Each article is drawn from the scholarly and professional sources referenced in the TypeVenture lessons.
            </p>
          </div>

          {loading ? (
            <div style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.6)",
              padding: "60px 0",
              fontFamily: "Poppins, sans-serif",
            }}>
              Loading articles…
            </div>
          ) : (
            <div className="articles-grid">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="article-card"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="article-image-container">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="article-image"
                      onError={(e) => {
                        e.target.src = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";
                      }}
                    />
                  </div>
                  <div className="article-content">
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-introduction">{article.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </MainLayout>
  );
}