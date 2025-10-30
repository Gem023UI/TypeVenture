import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import BounceCards from "../bins/media/BounceCards";
import "./LandingSection.css";

export default function LandingSection({ logoUrl }) {
  const navigate = useNavigate();

  const [showGuestModal, setShowGuestModal] = useState(false);

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
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847044/8c83f682-0fa9-4854-866e-f976ca7747b4.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847457/b3056ab4-07da-4997-bacc-432b67cdb00e.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847347/779a4dcc-fc37-4ca4-89ee-8f34cd4fa363.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847238/e340ac80-7897-454d-9b58-b40819eaf00c.png",
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847101/25bf2511-c285-422b-a3ae-7e6b02041bf4.png"
  ];
    
  return (
    <MainLayout>
      <section className="landing-page-wrapper">
        <div className="landing-page">
          <div className="landing-info-1">
            <div className="name-buttons">
              <div className="name-container">
                <h1 className="type">
                  TYPE<span className="venture">VENTURE</span>
                </h1>
                <p className="description">
                  From kerning to contrast, build your design skills step by step while earning points and badges. Take on lessons, hurdle challengs, and show you intellect and graphical design prowess in the Leadboards, all within TypeVenture.
                </p>
              </div>
              <div className="btn-container">
                <button 
                  className="login-btn" 
                  onClick={() => navigate("/login")}>LOGIN / REGISTER</button>
              </div>
            </div>
            <div className="landing-logo-container">
              <img src={logoUrl} alt="Typeventure Logo" className="landing-logo" />
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

          <div className="landing-features">
            <div className="feature-items">
              <div className="item-badge">
                <div className="badge-image">
                  <img src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761831581/quiz_vk4es7.png" alt="badges" />
                </div>
                <div className="feature-text">
                  <h2>Sharpen your Intellect!</h2>
                  <p>Accumulate learnings through referenced lessons and roadmap.</p>
                </div>
              </div>
            </div>
            <div className="feature-items">
              <div className="item-badge">
                <div className="badge-image">
                  <img src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761805532/badge_nnfigr.png" alt="badges" />
                </div>
                <div className="feature-text">
                  <h2>Earn Badges!</h2>
                  <p>Learn typography lessons while earning trophies and achievements.</p>
                </div>
              </div>
            </div>
            <div className="feature-items">
              <div className="item-badge">
                <div className="badge-image">
                  <img src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761831585/letter_dv9lxq.png" alt="badges" />
                </div>
                <div className="feature-text">
                  <h2>Take on Typography Challenges!</h2>
                  <p>Finish each game and track your progress.</p>
                </div>
              </div>
            </div>
            <div className="feature-items-highlight">
              <div className="item-badge-highlight">
                <div className="badge-image-highlight">
                  <img src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813648/trophy_buztjj.png" alt="badges" />
                </div>
                <div className="feature-text-highlight">
                  <h2>Try TypeVenture Now!</h2>
                  <button 
                    className="guest-btn"
                    onClick={() => setShowGuestModal(true)}
                  >
                    PLAY AS GUEST
                  </button>
                </div>
              </div>
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

        {/* Guest Mode Modal */}
        {showGuestModal && (
          <div 
            className="game-modal-overlay"
            onClick={() => setShowGuestModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <div 
              className="game-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '90%',
                textAlign: 'center'
              }}
            >
              <h2 style={{ 
                color: '#a200ff', 
                marginBottom: '20px',
                fontSize: '28px'
              }}>
                Choose Your Game
              </h2>
              <p style={{ 
                color: '#000', 
                marginBottom: '30px',
                fontSize: '16px'
              }}>
                Select which game mode you'd like to try!
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                flexDirection: 'column' 
              }}>
                <button
                  onClick={() => {
                    setShowGuestModal(false);
                    navigate('/guest-game?mode=quiz');
                  }}
                  style={{
                    padding: '15px 30px',
                    fontFamily: 'Poppins',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    letterSpacing: '5px',
                    backgroundColor: '#0029FF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  QUIZ GAME
                </button>
                
                <button
                  onClick={() => {
                    setShowGuestModal(false);
                    navigate('/guest-game?mode=typography');
                  }}
                  style={{
                    padding: '15px 30px',
                    fontFamily: 'Poppins',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    letterSpacing: '5px',
                    backgroundColor: '#FF1414',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  TYPOGRAPHY GAME
                </button>
                
                <button
                  onClick={() => setShowGuestModal(false)}
                  style={{
                    padding: '12px 30px',
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    backgroundColor: '#FFF',
                    color: '#000',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </section>
    </MainLayout>
  );
}