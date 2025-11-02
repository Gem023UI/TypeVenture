import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import "./Citations.css";

export default function LandingSection({ logoUrl }) {
  const navigate = useNavigate();

  const citations = [
    {
      title: "Beginning Graphic Design: Typography",
      url: "https://edu.gcfglobal.org/en/beginning-graphic-design/typography/1/"
    },
    {
      title: "Typography – Material Design 3",
      url: "https://m3.material.io/styles/typography/overview"
    },
    {
      title: "Typography Guidelines And References — Smashing Magazine",
      url: "https://www.smashingmagazine.com/typography-guidelines-and-references/"
    },
    {
      title: "Typographic Principles course lesson | Uxcel",
      url: "https://app.uxcel.com/courses/typography-foundations/typographic-principles-001"
    },
    {
      title: "CEV80528_Lesson_Plan_TX.pub",
      url: "#"
    },
    {
      title: "Lessons in Typography: Must-know typographic principles presented through lessons, exercises, and examples | Peachpit",
      url: "https://www.peachpit.com/store/lessons-in-typography-must-know-typographic-principles-9780133993509"
    },
    {
      title: "(PDF) THE IMPORTANCE AND USE OF TYPOGRAPHY IN PRINT AND DIGITAL DESIGN",
      url: "https://www.researchgate.net/publication/330684445_THE_IMPORTANCE_AND_USE_OF_TYPOGRAPHY_IN_PRINT_AND_DIGITAL_DESIGN"
    },
    {
      title: "The Elements of Typographic Style - Wikipedia",
      url: "https://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style"
    },
    {
      title: "An Essay on Typography - Wikipedia",
      url: "https://en.wikipedia.org/wiki/An_Essay_on_Typography"
    },
    {
      title: "Typography Tips - A lesson on contrast - Process Masterclass",
      url: "https://www.process.st/masterclass/typography-tips/"
    }
  ];

  return (
    <MainLayout>
      <section className="citation-page-wrapper">
        <div className="citations-container">
          <h1 className="citations-main-title">Citations & References</h1>
          <p className="citations-intro">
            This website was developed using information and resources from the following sources:
          </p>
          
          <div className="citations-list">
            {citations.map((citation, index) => (
              <div key={index} className="citation-item">
                <h2 className="citation-title">{citation.title}</h2>
                <a 
                  href={citation.url} 
                  className="citation-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {citation.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}