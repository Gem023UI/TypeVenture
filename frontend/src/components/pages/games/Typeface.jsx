import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchGameById, submitScore } from "../../../api/games.js";
import "./Typeface.css";

// Achievement image URLs (placeholder - update with Cloudinary links)
const ACHIEVEMENT_IMAGES = {
  gold: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305621/gold_medal_w7xagi.png",
  silver: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305631/silver_medal_nfb50c.png",
  bronze: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305618/bronze_medal_olw8ds.png",
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
  const [userAnswers, setUserAnswers] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [finalAchievement, setFinalAchievement] = useState(null);
  const [availableLetters, setAvailableLetters] = useState([]);

  // Load game data
  useEffect(() => {
    if (!game) {
      loadGame();
    } else {
      initializeQuestion();
    }
  }, [gameId, game]);

  useEffect(() => {
    if (game) {
      initializeQuestion();
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

  const initializeQuestion = () => {
    if (!game || !game.questions || !game.questions[currentQuestionIndex]) return;

    const question = game.questions[currentQuestionIndex];
    
    // Initialize empty answers array
    setUserAnswers(new Array(question.missingLetters.length).fill(''));
    setUsedLetters([]);
    setIsAnswered(false);
    setIsCorrect(false);
    
    // Generate available letters (missing letters + some random distractors)
    generateAvailableLetters(question.missingLetters);
  };

  const generateAvailableLetters = (missingLetters) => {
    // All possible letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    // Get unique missing letters
    const uniqueMissing = [...new Set(missingLetters)];
    
    // Calculate how many distractors we need
    const numDistractors = Math.max(4, Math.ceil(uniqueMissing.length * 1.5));
    
    // Get random distractors that aren't in missing letters
    const availableDistractors = alphabet.filter(letter => !uniqueMissing.includes(letter));
    const shuffledDistractors = availableDistractors.sort(() => 0.5 - Math.random());
    const distractors = shuffledDistractors.slice(0, numDistractors);
    
    // Combine and shuffle all letters
    const allLetters = [...missingLetters, ...distractors].sort(() => 0.5 - Math.random());
    
    setAvailableLetters(allLetters);
  };

  const handleLetterClick = (letter, letterIndex) => {
    if (isAnswered || usedLetters.includes(letterIndex)) return;

    // Find the first empty position in userAnswers
    const emptyIndex = userAnswers.findIndex(ans => ans === '');
    
    if (emptyIndex !== -1) {
      const newAnswers = [...userAnswers];
      newAnswers[emptyIndex] = letter;
      setUserAnswers(newAnswers);
      
      // Mark this letter as used
      setUsedLetters([...usedLetters, letterIndex]);
    }
  };

  const handleBlankClick = (blankIndex) => {
    if (isAnswered) return;

    const letterToRemove = userAnswers[blankIndex];
    if (letterToRemove) {
      // Remove the answer
      const newAnswers = [...userAnswers];
      newAnswers[blankIndex] = '';
      setUserAnswers(newAnswers);
      
      // Find and remove the used letter index
      const letterIndexInAvailable = availableLetters.findIndex(
        (letter, idx) => letter === letterToRemove && usedLetters.includes(idx)
      );
      
      if (letterIndexInAvailable !== -1) {
        setUsedLetters(usedLetters.filter(idx => idx !== letterIndexInAvailable));
      }
    }
  };

  const handleSubmitAnswer = () => {
    if (userAnswers.some(ans => ans === '')) {
      alert("Please fill in all blanks before submitting!");
      return;
    }

    const currentQuestion = game.questions[currentQuestionIndex];
    const correct = userAnswers.every((ans, idx) => 
      ans === currentQuestion.missingLetters[idx]
    );
    
    setIsCorrect(correct);
    setIsAnswered(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleReset = () => {
    initializeQuestion();
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

  // Render the font name with blanks
  const renderFontName = () => {
    if (!game || !game.questions[currentQuestionIndex]) return null;

    const question = game.questions[currentQuestionIndex];
    const displayText = question.displayText;
    const blankedPositions = question.blankedPositions;
    
    let blankIndex = 0;
    
    return displayText.split('').map((char, index) => {
      if (char === '_') {
        const currentBlankIndex = blankIndex;
        blankIndex++;
        
        const userAnswer = userAnswers[currentBlankIndex] || '';
        let blankClass = 'font-blank';
        
        if (userAnswer) {
          blankClass += ' filled';
        }
        
        if (isAnswered) {
          if (userAnswer === question.missingLetters[currentBlankIndex]) {
            blankClass += ' correct';
          } else {
            blankClass += ' incorrect';
          }
        }
        
        return (
          <div
            key={index}
            className={blankClass}
            onClick={() => handleBlankClick(currentBlankIndex)}
            style={{ cursor: isAnswered ? 'default' : 'pointer' }}
          >
            {userAnswer}
          </div>
        );
      } else {
        return (
          <span key={index} className="font-letter">
            {char}
          </span>
        );
      }
    });
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

        {/* Answer Section */}
        <div className="answer-section">
          {!isAnswered && (
            <div className="instructions">
              <p><strong>How to play:</strong></p>
              <p>• Click on letters below to fill in the blanks</p>
              <p>• Click on a filled blank to remove the letter</p>
              <p>• Complete the typeface name and submit your answer</p>
            </div>
          )}

          {isAnswered && (
            <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>✅ Correct! The typeface is {currentQuestion.correctAnswer}</>
              ) : (
                <>❌ Incorrect. The correct answer is {currentQuestion.correctAnswer}</>
              )}
            </div>
          )}

          <h3 className="answer-title">Complete the typeface name:</h3>
          
          <div className="font-name-display">
            {renderFontName()}
          </div>

          {!isAnswered && (
            <div className="letter-options">
              {availableLetters.map((letter, index) => (
                <button
                  key={index}
                  className={`letter-button ${usedLetters.includes(index) ? 'used' : ''}`}
                  onClick={() => handleLetterClick(letter, index)}
                  disabled={usedLetters.includes(index)}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}

          <div className="action-buttons">
            {!isAnswered ? (
              <>
                <button 
                  className="game-button submit-button"
                  onClick={handleSubmitAnswer}
                >
                  Submit Answer
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