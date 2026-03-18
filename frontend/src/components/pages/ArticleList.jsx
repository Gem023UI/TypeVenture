import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { fetchAllArticles } from "../../api/articles";
import "./ArticleList.css";

// Static fallback — matches the existing hardcoded articles
// Used when the DB has no articles yet (e.g. before the seeder runs)
const STATIC_ARTICLES = [
  {
    _id: "static-1",
    title: "Trending Font Pairings 2026",
    subtitle: "Elevate your visual identity with 11 curated typography systems designed for high-end digital branding and UI excellence. Discover the perfect font combinations that will define design in 2026.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
    staticRoute: "/article/font-pairings-2026",
  },
  {
    _id: "static-2",
    title: "Typographic Hierarchies",
    subtitle: "Master the art of visual organization in typography. Learn six essential variables to establish effective hierarchies that guide readers and enhance communication through deliberate design choices.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532630/897bff6a-2871-4683-b5be-c8600dd0c294.png",
    staticRoute: "/article/typographic-hierarchies",
  },
  {
    _id: "static-3",
    title: "A Beginner's Guide to Kerning",
    subtitle: "Master the art of adjusting letter spacing to create visually balanced and professional typography. Learn why kerning matters, common problem letter pairs, and expert tips to kern like a designer.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532572/cba9b578-9e1d-4c0c-8f3c-b31a02497e01.png",
    staticRoute: "/article/kerning-guide",
  },
  {
    _id: "static-4",
    title: "5 Common Font Management Issues and How to Fix Them",
    subtitle: "Discover the most common font management challenges that plague creative teams and organizations—from budget waste to security risks—and learn practical solutions to streamline your workflow.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532533/b3820a3a-d857-4ec4-8b53-338f67303a47.png",
    staticRoute: "/article/font-management-issues",
  },
  {
    _id: "static-5",
    title: "2026 Guide to Font Psychology",
    subtitle: "Discover how typography influences credibility, emotion, and conversion behavior across branding, marketing, and design. Learn to leverage font psychology strategically to build trust and drive results.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532476/571f310a-de94-4a54-a5b2-97734ed9dcb8.png",
    staticRoute: "/article/font-psychology",
  },
  {
    _id: "static-6",
    title: "The UX Designer's Guide to Typography",
    subtitle: "Typography can make or break the success of a site or app. Discover essential typography principles, terminology, and best practices that will help you create user-friendly designs with optimal readability.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532422/f6ff5481-f3a6-40ee-bad1-a3c8f0276e19.png",
    staticRoute: "/article/ux-typography-guide",
  },
  {
    _id: "static-7",
    title: "Design Trends for 2026",
    subtitle: "Stay on top of the 10 major graphic design trends defining 2026. From tactile experiences to maximalist layouts, discover how design is celebrating humanity in an increasingly digital world.",
    featuredImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771532341/e09f3d4b-ddef-40ab-b717-496ad06f757e.png",
    staticRoute: "/article/design-trends-2026",
  },
];

export default function ArticleList() {
  const navigate = useNavigate();
  const [articles, setArticles]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [usingStatic, setUsingStatic] = useState(false);

  useEffect(() => {
    fetchAllArticles()
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(data);
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
      // Static fallback — navigate to existing individual article pages
      navigate(article.staticRoute);
    } else {
      // DB-driven — navigate to the dynamic ArticleDetails page
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
              Explore our curated collection of typography articles. From trending font pairings to design principles, discover insights that will elevate your typographic knowledge.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", padding: "60px 0", fontFamily: "Poppins, sans-serif" }}>
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