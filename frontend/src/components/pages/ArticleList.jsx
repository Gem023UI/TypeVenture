import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import "./ArticleList.css";

export default function ArticleList() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Trending Font Pairings 2026",
      introduction: "Elevate your visual identity with 11 curated typography systems designed for high-end digital branding and UI excellence. Discover the perfect font combinations that will define design in 2026.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/font-pairings-2026"
    },
    {
      id: 2,
      title: "Typography in Modern Web Design",
      introduction: "Explore how typography shapes user experience and brand identity in contemporary web design. Learn the principles that make typography work effectively across all digital platforms.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/typography-web-design"
    },
    {
      id: 3,
      title: "The Art of Kerning and Tracking",
      introduction: "Master the subtle art of spacing in typography. Understanding kerning and tracking can transform your designs from amateur to professional with these essential techniques.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/kerning-tracking"
    },
    {
      id: 4,
      title: "Serif vs Sans-Serif: A Complete Guide",
      introduction: "Dive deep into the world of typeface classifications. Learn when to use serif and sans-serif fonts to create maximum impact in your design projects.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/serif-sans-serif"
    }
  ];

  const handleArticleClick = (route) => {
    navigate(route);
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

          <div className="articles-grid">
            {articles.map((article) => (
              <div 
                key={article.id}
                className="article-card"
                onClick={() => handleArticleClick(article.route)}
              >
                <div className="article-image-container">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="article-image"
                  />
                </div>
                <div className="article-content">
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-introduction">{article.introduction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}