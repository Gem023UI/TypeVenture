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
      title: "Typographic Hierarchies",
      introduction: "Master the art of visual organization in typography. Learn six essential variables to establish effective hierarchies that guide readers and enhance communication through deliberate design choices.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/typographic-hierarchies"
    },
    {
      id: 3,
      title: "A Beginner's Guide to Kerning",
      introduction: "Master the art of adjusting letter spacing to create visually balanced and professional typography. Learn why kerning matters, common problem letter pairs, and expert tips to kern like a designer.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/kerning-guide"
    },
    {
      id: 4,
      title: "5 Common Font Management Issues and How to Fix Them",
      introduction: "Discover the most common font management challenges that plague creative teams and organizations—from budget waste to security risks—and learn practical solutions to streamline your workflow.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/font-management-issues"
    },
    {
      id: 5,
      title: "2026 Guide to Font Psychology",
      introduction: "Discover how typography influences credibility, emotion, and conversion behavior across branding, marketing, and design. Learn to leverage font psychology strategically to build trust and drive results.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/font-psychology"
    },
    {
      id: 6,
      title: "The UX Designer's Guide to Typography",
      introduction: "Typography can make or break the success of a site or app. Discover essential typography principles, terminology, and best practices that will help you create user-friendly designs with optimal readability.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/ux-typography-guide"
    },
    {
      id: 7,
      title: "Design Trends for 2026",
      introduction: "Stay on top of the 10 major graphic design trends defining 2026. From tactile experiences to maximalist layouts, discover how design is celebrating humanity in an increasingly digital world.",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      route: "/article/design-trends-2026"
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