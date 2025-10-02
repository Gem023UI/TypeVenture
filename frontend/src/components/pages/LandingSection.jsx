import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "../Bins/media/Stack";
import "./LandingSection.css";

export default function LandingSection({ logoUrl }) {
  const navigate = useNavigate();
  const images = [
    { id: 1, img: logoUrl },
    { id: 2, img: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176984/pioneer2_ouxgbt.png" },
    { id: 3, img: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176984/pioneer1_vkmeuz.png" },
    { id: 4, img: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176985/pioneer4_l0gqea.png" },
    { id: 5, img: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176985/pioneer5_cqe1ba.png" },
    { id: 6, img: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759176984/pioneer3_sieg66.png" },
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
          <h2 className="tagline-1">
            Play with <span className="highlight-pink">TYPE</span>
          </h2>
          <h2 className="tagline-2">
            Learn by <span className="highlight-yellow">DESIGN</span>
          </h2>
          <p className="description-2">
            Discover typography rules through fun, interactive challenges that
            turn learning into play.
          </p>
        </div>

        <div className="landing-info-3">
          <div className="pioneer-image">
            <Stack
              randomRotation={false}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 300, height: 300 }}
              cardsData={images}
            />
          </div>
          <div className="texts">
            <h2 className="tagline-3">
              Turn <span className="highlight-pink">LETTERS</span>
            </h2>
            <h2 className="tagline-4">
              Into <span className="highlight-yellow">LESSONS</span>
            </h2>
            <p className="description-3">
              Discover typography rules through fun, interactive challenges that
              turn learning into play.
            </p>
          </div>
        </div>

        <div className="landing-info-2">
          <h2 className="tagline-1">
            Where <span className="highlight-pink">TYPOGRAPHY</span>
          </h2>
          <h2 className="tagline-2">
            Meets <span className="highlight-yellow">GAMEPLAY</span>
          </h2>
          <p className="description-2">
            Discover typography rules through fun, interactive challenges that
            turn learning into play.
          </p>
        </div>
      </div>
    </section>
  );
}
