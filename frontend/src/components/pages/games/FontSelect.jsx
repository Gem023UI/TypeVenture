import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchGameById, submitScore } from "../../../api/games.js";
import "./FontSelect.css";

const ACHIEVEMENT_IMAGES = {
  gold: "https://res.cloudinary.com/placeholder/gold-trophy.png",
  silver: "https://res.cloudinary.com/placeholder/silver-trophy.png",
  bronze: "https://res.cloudinary.com/placeholder/bronze-trophy.png",
  none: ""
};

const FontSelectionGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [game, setGame] = useState(location.state?.game || null);
  const [loading, setLoading] = useState(!location.state?.game);
  const [error, setError] = useState(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedFont, setSelectedFont] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [finalAchievement, setFinalAchievement] = useState(null);

  useEffect(() => {
    if (!game) {
      loadGame();
    }
  }, [gameId, game]);

  useEffect(() => {
    if (game) {
      resetQuestion();
    }
  }, [currentQuestionIndex, game]);

  const loadGame = async () => {
    try {
      setLoading(true);
      const data = await fetchGameById(gameId);
      setGame(data);
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

  const resetQuestion = () => {
    setSelectedFont(null);
    setIsAnswered(false);
  };

  const handleFontSelect = (fontName) => {
    if (isAnswered) return;
    setSelectedFont(fontName);
  };

  const handleSubmit = () => {
    if (!selectedFont) {
      alert("Please select a font before submitting!");
      return;
    }

    const currentQuestion = game.questions[currentQuestionIndex];
    const correct = selectedFont === currentQuestion.correctAnswer;
    
    if (correct) {
      setScore(score + 1);
    }
    
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    const totalQuestions = game.questions.length;
    const percentageScore = Math.round((score / totalQuestions) * 100);
    
    let achievement = "none";
    if (percentageScore >= 97) achievement = "gold";
    else if (percentageScore >= 94) achievement = "silver";
    else if (percentageScore >= 90) achievement = "bronze";
    
    setFinalAchievement({
      tier: achievement,
      score: percentageScore,
      correctAnswers: score,
      totalQuestions: totalQuestions,
      imageUrl: ACHIEVEMENT_IMAGES[achievement]
    });
    
    try {
      await submitScore(gameId, percentageScore);
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
      <div className="font-selection-game-page">
        <div className="loading-message">Loading game...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="font-selection-game-page">
        <div className="loading-message">
          <p>❌ {error || "Game not found"}</p>
          <button className="game-button submit-button" onClick={() => navigate("/games")}>
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = game.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / game.questions.length) * 100;

  return (
    <div className="font-selection-game-page">
      <div className="font-selection-game-container">
        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="question-counter">
              Question {currentQuestionIndex + 1} of {game.questions.length}
            </span>
            <span className="score-display">
              Score: {score}/{game.questions.length}
            </span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Scenario Display */}
        <div className="scenario-display">
          <h2 className="scenario-title">{currentQuestion.questionText}</h2>
          
          <div className="scenario-content">
            <p className="scenario-purpose">{currentQuestion.purpose}</p>
            
            <div className="scenario-details">
              <div className="scenario-detail-item">
                <div className="detail-label">Theme</div>
                <div className="detail-value">{currentQuestion.theme}</div>
              </div>
              <div className="scenario-detail-item">
                <div className="detail-label">Atmosphere</div>
                <div className="detail-value">{currentQuestion.atmosphere}</div>
              </div>
              <div className="scenario-detail-item">
                <div className="detail-label">Context</div>
                <div className="detail-value">{currentQuestion.context}</div>
              </div>
            </div>
            
            <p className="scenario-instruction">
              Choose the most appropriate font for this scenario
            </p>
          </div>
        </div>

        {/* Font Options Section */}
        <div className="font-options-section">
          <h3 className="section-title">Select Your Font Choice</h3>
          
          <div className="font-options-grid">
            {currentQuestion.options.map((option, index) => {
              let cardClass = 'font-option-card';
              
              if (isAnswered) {
                if (option.fontName === currentQuestion.correctAnswer) {
                  cardClass += ' correct';
                } else if (option.fontName === selectedFont) {
                  cardClass += ' incorrect';
                }
                cardClass += ' disabled';
              } else if (option.fontName === selectedFont) {
                cardClass += ' selected';
              }
              
              return (
                <div
                  key={index}
                  className={cardClass}
                  onClick={() => handleFontSelect(option.fontName)}
                >
                  <div className="font-image-container">
                    <img 
                      src={option.fontImage} 
                      alt={option.fontName}
                      className="font-sample-image"
                    />
                  </div>
                  <div className="font-name">{option.fontName}</div>
                </div>
              );
            })}
          </div>

          {/* Feedback Section */}
          {isAnswered && (
            <div className="feedback-section">
              <div className={`feedback-message ${
                selectedFont === currentQuestion.correctAnswer ? 'correct' : 'incorrect'
              }`}>
                {selectedFont === currentQuestion.correctAnswer 
                  ? '✅ Excellent choice!' 
                  : `❌ Not quite. The best choice is: ${currentQuestion.correctAnswer}`}
              </div>
              
              <div className="feedback-explanation">
                <strong>Why this works:</strong> {currentQuestion.explanation}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            {!isAnswered ? (
              <button 
                className="game-button submit-button"
                onClick={handleSubmit}
                disabled={!selectedFont}
              >
                Submit Choice
              </button>
            ) : (
              <button 
                className="game-button next-button"
                onClick={handleNext}
              >
                {currentQuestionIndex < game.questions.length - 1 ? 'Next Question' : 'Finish Game'}
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
              You got {finalAchievement.correctAnswers} out of {finalAchievement.totalQuestions} correct!
              <br />
              Final Score: {finalAchievement.score}%
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

export default FontSelectionGame;