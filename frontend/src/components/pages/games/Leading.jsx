import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchGameById, submitScore } from "../../../api/games.js";
import "./Leading.css";

// Achievement image URLs (placeholder - update with Cloudinary links)
const ACHIEVEMENT_IMAGES = {
  gold: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305621/gold_medal_w7xagi.png",
  silver: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305631/silver_medal_nfb50c.png",
  bronze: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305618/bronze_medal_olw8ds.png",
  none: ""
};

const LeadingGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [game, setGame] = useState(location.state?.game || null);
  const [loading, setLoading] = useState(!location.state?.game);
  const [error, setError] = useState(null);
  
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [leading, setLeading] = useState(1.5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [finalAchievement, setFinalAchievement] = useState(null);

  // Load game data
  useEffect(() => {
    if (!game) {
      loadGame();
    } else {
      initializeParagraph();
    }
  }, [gameId, game]);

  useEffect(() => {
    if (game) {
      initializeParagraph();
    }
  }, [currentParagraphIndex, game]);

  const loadGame = async () => {
    try {
      setLoading(true);
      const data = await fetchGameById(gameId);
      setGame(data);
      initializeParagraph();
    } catch (err) {
      console.error("Error loading game:", err);
      
      if (err.status === 403 && err.isVerified === false) {
        setError(err.message);
        alert("Please verify your email to play this game");
        navigate("/profile");
      } else {
        setError(err.message || "Failed to load game");
      }
    } finally {
      setLoading(false);
    }
  };

  const initializeParagraph = () => {
    if (game && game.paragraphs && game.paragraphs[currentParagraphIndex]) {
      // Start with a random leading between min and max
      const paragraph = game.paragraphs[currentParagraphIndex];
      const randomLeading = (paragraph.minLeading + paragraph.maxLeading) / 2;
      setLeading(randomLeading);
      setIsSubmitted(false);
      setCurrentScore(0);
    }
  };

  const handleLeadingChange = (e) => {
    setLeading(parseFloat(e.target.value));
  };

  const calculateScore = () => {
    if (!game || !game.paragraphs[currentParagraphIndex]) return 0;
    
    const paragraph = game.paragraphs[currentParagraphIndex];
    const idealLeading = paragraph.idealLeading;
    const userLeading = leading;
    
    // Calculate the difference as a percentage
    const difference = Math.abs(idealLeading - userLeading);
    const maxDifference = paragraph.maxLeading - paragraph.minLeading;
    const errorPercentage = (difference / maxDifference) * 100;
    
    // Score: 100 - error percentage
    const score = Math.max(0, Math.round(100 - errorPercentage));
    
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setCurrentScore(score);
    setTotalScore(totalScore + score);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentParagraphIndex < game.paragraphs.length - 1) {
      setCurrentParagraphIndex(currentParagraphIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleReset = () => {
    initializeParagraph();
  };

  const handleFinish = async () => {
    // Calculate final average score
    const totalParagraphs = game.paragraphs.length;
    const averageScore = Math.round(totalScore / totalParagraphs);
    
    // Determine achievement
    let achievement = "none";
    if (averageScore >= 97) achievement = "gold";
    else if (averageScore >= 94) achievement = "silver";
    else if (averageScore >= 90) achievement = "bronze";
    
    setFinalAchievement({
      tier: achievement,
      score: averageScore,
      imageUrl: ACHIEVEMENT_IMAGES[achievement]
    });
    
    // Submit score to backend
    try {
      await submitScore(gameId, averageScore);
      console.log("✅ Score submitted successfully");
    } catch (err) {
      console.error("Error submitting score:", err);
      if (err.status === 403) {
        alert("Please verify your email to submit scores");
      }
    }
    
    setShowAchievement(true);
  };

  const handleCloseModal = () => {
    navigate("/games");
  };

  if (loading) {
    return (
      <div className="leading-game-page">
        <div className="loading-message">Loading game...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="leading-game-page">
        <div className="loading-message">
          <p>❌ {error || "Game not found"}</p>
          <button className="game-button submit-button" onClick={() => navigate("/games")}>
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const currentParagraph = game.paragraphs[currentParagraphIndex];
  const progress = ((currentParagraphIndex + 1) / game.paragraphs.length) * 100;

  return (
    <div className="leading-game-page">
      <div className="leading-game-container">
        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="paragraph-counter">
              Paragraph {currentParagraphIndex + 1} of {game.paragraphs.length}
            </span>
            <span className="score-display">
              Total Score: {totalScore}
            </span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Paragraph Display */}
        <div className="paragraph-display-section">
          <h2 className="paragraph-title">
            Adjust the line spacing (leading) to improve readability
          </h2>
          <div className="paragraph-container">
            <p 
              className="adjustable-paragraph"
              style={{
                fontSize: `${currentParagraph.fontSize}px`,
                lineHeight: leading
              }}
            >
              {currentParagraph.text}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          {!isSubmitted && (
            <div className="instructions">
              <p><strong>How to play:</strong></p>
              <p>• Use the slider to adjust the line spacing (leading)</p>
              <p>• Try to find the most readable spacing for this paragraph</p>
              <p>• Click "Submit" when you're satisfied with your adjustment</p>
            </div>
          )}

          {isSubmitted && (
            <div className={`feedback-message ${currentScore >= 70 ? 'good' : 'poor'}`}>
              {currentScore >= 90 ? (
                <>🎯 Excellent! Your leading is spot-on. Score: {currentScore}/100</>
              ) : currentScore >= 70 ? (
                <>👍 Good job! Your leading is pretty close. Score: {currentScore}/100</>
              ) : (
                <>📊 Keep practicing! Try to feel the rhythm of the text. Score: {currentScore}/100</>
              )}
            </div>
          )}

          <div className="leading-controls">
            <div className="control-label">
              <span className="control-label-text">Line Height (Leading)</span>
              <span className="leading-value">{leading.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={currentParagraph.minLeading}
              max={currentParagraph.maxLeading}
              step="0.01"
              value={leading}
              onChange={handleLeadingChange}
              className="leading-slider"
              disabled={isSubmitted}
            />
          </div>

          <div className="action-buttons">
            {!isSubmitted ? (
              <>
                <button 
                  className="game-button submit-button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button 
                  className="game-button reset-button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </>
            ) : (
              <button 
                className="game-button next-button"
                onClick={handleNext}
              >
                {currentParagraphIndex < game.paragraphs.length - 1 ? 'Next Paragraph' : 'Finish'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Modal */}
      {showAchievement && finalAchievement && (
        <div className="modal-overlay">
          <div className="achievement-modal">
            <h2>🎉 Game Complete! 🎉</h2>
            
            {finalAchievement.tier !== "none" && (
              <>
                <img 
                  src={finalAchievement.imageUrl} 
                  alt={`${finalAchievement.tier} achievement`}
                  className="achievement-image"
                />
                <div className={`achievement-tier ${finalAchievement.tier}`}>
                  {finalAchievement.tier} Achievement!
                </div>
              </>
            )}
            
            <div className="achievement-score">
              Average Score: {finalAchievement.score}/100
            </div>
            
            {finalAchievement.tier === "none" && (
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Keep practicing! You need 90% or higher for an achievement.
              </p>
            )}
            
            <button className="close-modal-button" onClick={handleCloseModal}>
              Back to Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadingGame;