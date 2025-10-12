import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "../bins/media/Stack";
import BounceCards from "../bins/media/BounceCards";
import "./LandingSection.css";

export default function LandingSection({ logoUrl }) {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".float-in");

    // Assign cascading delays per section
    let delay = 1;
    elements.forEach((el) => {
      el.setAttribute("data-delay", delay);
      delay = delay >= 8 ? 1 : delay + 1;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Run once
          }
        });
      },
      {
        threshold: 0.2, // visible threshold
        rootMargin: "0px 0px -100px 0px", // triggers slightly before entering
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];

  const images = [
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176984/pioneer2_ouxgbt.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176984/pioneer1_vkmeuz.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176985/pioneer4_l0gqea.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176985/pioneer5_cqe1ba.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176984/pioneer3_sieg66.png"
  ];
    
  return (
    <section className="landing-page-wrapper">
      <div className="landing-page">
        <div className="landing-info-1">
          <div className="landing-logo-container">
            <img src={logoUrl} alt="Typeventure Logo" className="landing-logo" />
          </div>
          <div className="name-buttons">
            <div className="name-container">
              <h1 className="type">
                TYPE<span className="venture">VENTURE</span>
              </h1>
              <p className="description">
                From kerning to contrast, build your design skills step by step
                while earning points and badges.
              </p>
            </div>
            <div className="btn-container">
              <button 
                className="login-btn" 
                onClick={() => navigate("/login")}>LOGIN / REGISTER</button>
              <button className="guest-btn">PLAY AS GUEST</button>
            </div>
          </div>
        </div>

        <div className="landing-info-2">
          <div className="landing-info-2-texts">
            <h2 className="tagline-1">
              Play with <span className="highlight-pink">TYPE</span>
            </h2>
            <h2 className="tagline-2 float-in">
              Learn by <span className="highlight-yellow">DESIGN</span>
            </h2>
            <p className="description-2">
              Discover typography rules through fun, interactive challenges that
              turn learning into play.
            </p>
          </div>
        </div>

        <div className="landing-info-3">
          <div className="pioneers">
            <BounceCards
              className="custom-bounceCards"
              images={images}
              containerWidth={500}
              containerHeight={250}
              animationDelay={1}
              animationStagger={0.1}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
          <div className="landing-info-3-texts">
            <h2 className="tagline-3">
              <span className="highlight-pink-letters">Letters</span> into <span className="highlight-yellow-lessons">Lessons</span>
            </h2>
            <p className="description-3">
              Meet the pioneers of turning typography into an engaging and interactive experience.
            </p>
          </div>
        </div>

        <div className="landing-info-4">
          <h2 className="tagline-5">
            Where <span className="highlight-pink">TYPOGRAPHY</span>
          </h2>
          <h2 className="tagline-6 float-in">
            Meets <span className="highlight-yellow">GAMEPLAY</span>
          </h2>
          <p className="description-4">
            Game - integrated typography lessons where learners can learn and enjoy altogether.
          </p>
        </div>
      </div>
    </section>
  );
}
