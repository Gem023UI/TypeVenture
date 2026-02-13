import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchGameById, submitScore } from "../../../api/games.js";
import "./Typeface.css";

// Achievement image URLs (placeholder - update with Cloudinary links)
const ACHIEVEMENT_IMAGES = {
  gold: "https://res.cloudinary.com/placeholder/gold-trophy.png",
  silver: "https://res.cloudinary.com/placeholder/silver-trophy.png",
  bronze: "https://res.cloudinary.com/placeholder/bronze-trophy.png",
  none: ""
};

const TypefaceGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [game, setGame] = useState(location.state?.game || null);
  const [loading, setLoading] = useState(!location.state?.game);
  const [error, setError] = useState(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [finalAchievement, setFinalAchievement] = useState(null);

  // Load game data
  useEffect(() => {
    if (!game) {
      loadGame();
    }
  }, [gameId, game]);

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

  const handleOptionClick = (option) => {
    if (isAnswered) return; // Prevent changing answer after submission
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = game.questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    
    setIsCorrect(correct);
    setIsAnswered(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // Game finished
      handleFinish();
    }
  };

  const handleFinish = async () => {
    // Calculate final score as percentage
    const totalQuestions = game.questions.length;
    const percentageScore = Math.round((score / totalQuestions) * 100);
    
    // Determine achievement
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
    
    // Submit score to backend
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
      <div className="typeface-game-page">
        <div className="loading-message">Loading game...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="typeface-game-page">
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
    <div className="typeface-game-page">
      <div className="typeface-game-container">
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

        {/* Question Display */}
        <div className="question-display">
          <h2 className="question-title">What typeface is this?</h2>
          <div className="font-image-container">
            <img 
              src={currentQuestion.imageUrl} 
              alt="Font sample"
              className="font-image"
            />
          </div>
        </div>

        {/* Options Section */}
        <div className="options-section">
          {isAnswered && (
            <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>✅ Correct! The answer is {currentQuestion.correctAnswer}</>
              ) : (
                <>❌ Incorrect. The correct answer is {currentQuestion.correctAnswer}</>
              )}
            </div>
          )}

          <div className="options-grid">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'option-button';
              
              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass += ' correct';
                } else if (option === selectedAnswer && !isCorrect) {
                  buttonClass += ' incorrect';
                }
              } else if (option === selectedAnswer) {
                buttonClass += ' selected';
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="action-buttons">
            {!isAnswered ? (
              <button 
                className="game-button submit-button"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </button>
            ) : (
              <button 
                className="game-button next-button"
                onClick={handleNext}
              >
                {currentQuestionIndex < game.questions.length - 1 ? 'Next Question' : 'Finish'}
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

export default TypefaceGame;