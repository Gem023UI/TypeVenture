import React from "react";
import "./LandingSection.css";

export default function LandingSection({ logoUrl }) {
  return (
    <section className="landing">
      <div>
        <div className="landing-logo-container">
        <img src={logoUrl} alt="Typeventure Logo" className="landing-logo" />
        </div>
        <h1 className="title">TYPE<span className="venture">VENTURE</span></h1>
        <div className="btn-container">
          <button className="btn primary">LOGIN / REGISTER</button>
          <button className="btn secondary">PLAY AS GUEST</button>
        </div>
      </div>
      <div>
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
