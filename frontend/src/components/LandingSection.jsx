import React from "react";
import "./LandingSection.css";

export default function LandingSection({ logoUrl }) {
  return (
    <section className="landing-page">
      <div className="landing-info-1">
        <div className="landing-logo-container">
          <img src={logoUrl} alt="Typeventure Logo" className="landing-logo" />
        </div>
        <div className="name-buttons">
          <div className="name-container">
            <h1 className="type">TYPE<span className="venture">VENTURE</span></h1>
            <p className="description">From kerning to contrast, build your design skills step by step while earning points and badges.</p>
          </div>
          <div className="btn-container">
            <button className="login-btn">LOGIN / REGISTER</button>
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
          Discover typography rules through fun, interactive challenges
          that turn learning into play.
        </p>
      </div>
    </section>
  );
}
