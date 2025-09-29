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
            <p className="description">Discover typography rules through fun, interactive challenges that turn learning into play.</p>
          </div>
          <div className="btn-container">
            <button className="login-btn">LOGIN / REGISTER</button>
            <button className="guest-btn">PLAY AS GUEST</button>
          </div>
        </div>
      </div>
      <div className="landing-info-2">
        <h2>
          Play with <span className="highlight-pink">TYPE</span>
          <br />
          Learn by <span className="highlight-yellow">DESIGN</span>
        </h2>
        <p>
          Discover typography rules through fun, interactive challenges
          that turn learning into play.
        </p>
      </div>
    </section>
  );
}
