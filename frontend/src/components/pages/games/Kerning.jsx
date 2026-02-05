import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchGameById, submitScore } from "../../../api/games.js";
import "./Kerning.css";

// Achievement image URLs (placeholder - update with Cloudinary links)
const ACHIEVEMENT_IMAGES = {
  gold: "https://res.cloudinary.com/placeholder/gold-trophy.png",
  silver: "https://res.cloudinary.com/placeholder/silver-trophy.png",
  bronze: "https://res.cloudinary.com/placeholder/bronze-trophy.png",
  none: ""
};

const KerningGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [game, setGame] = useState(location.state?.game || null);
  const [loading, setLoading] = useState(!location.state?.game);
  const [error, setError] = useState(null);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [finalAchievement, setFinalAchievement] = useState(null);
  
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartSpacing, setDragStartSpacing] = useState(0);
  
  const wordDisplayRef = useRef(null);

  // Load game data
  useEffect(() => {
    if (!game) {
      loadGame();
    } else {
      initializeWord();
    }
  }, [gameId, game]);

  // Initialize localStorage score
  useEffect(() => {
    const storedScore = localStorage.getItem("kern");
    if (storedScore) {
      setTotalScore(parseFloat(storedScore));
    } else {
      localStorage.setItem("kern", "0");
    }
  }, []);

  const loadGame = async () => {
    try {
      setLoading(true);
      const data = await fetchGameById(gameId);
      setGame(data);
      initializeWord();
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

  const initializeWord = () => {
    if (game && game.words && game.words[currentWordIndex]) {
      const word = game.words[currentWordIndex].word;
      // Initialize spacing array with 0s (neutral spacing)
      const initialSpacing = new Array(word.length - 1).fill(0);
      setLetterSpacing(initialSpacing);
      setIsChecked(false);
      setCurrentScore(0);
    }
  };

  useEffect(() => {
    if (game) {
      initializeWord();
    }
  }, [currentWordIndex, game]);

  // Handle mouse drag for letter spacing
  const handleMouseDown = (index, e) => {
    if (isChecked) return; // Can't adjust after checking
    if (index === 0) return; // Can't move first letter pair (first letter is fixed)
    
    setDraggingIndex(index);
    setDragStartX(e.clientX);
    setDragStartSpacing(letterSpacing[index]);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (draggingIndex === null) return;
    
    const deltaX = e.clientX - dragStartX;
    const spacingChange = Math.round(deltaX / 3); // Adjust sensitivity
    const newSpacing = Math.max(-50, Math.min(50, dragStartSpacing + spacingChange));
    
    const newLetterSpacing = [...letterSpacing];
    newLetterSpacing[draggingIndex] = newSpacing;
    setLetterSpacing(newLetterSpacing);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  useEffect(() => {
    if (draggingIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingIndex, dragStartX, dragStartSpacing, letterSpacing]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isChecked) return;
      
      // Arrow keys to adjust spacing
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const change = e.key === 'ArrowLeft' ? -2 : 2;
        const newSpacing = letterSpacing.map((spacing, i) => {
          if (i === 0) return spacing; // Keep first pair fixed
          return Math.max(-50, Math.min(50, spacing + change));
        });
        setLetterSpacing(newSpacing);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [letterSpacing, isChecked]);

  // Calculate score
  const calculateScore = () => {
    if (!game || !game.words[currentWordIndex]) return 0;
    
    const idealKerning = game.words[currentWordIndex].idealKerning;
    const userKerning = letterSpacing;
    
    let totalError = 0;
    let maxPossibleError = 0;
    
    for (let i = 0; i < idealKerning.length; i++) {
      const error = Math.abs(idealKerning[i] - userKerning[i]);
      totalError += error;
      maxPossibleError += 50; // Max deviation is 50 pixels
    }
    
    // Calculate percentage score (100 - error percentage)
    const errorPercentage = (totalError / maxPossibleError) * 100;
    const score = Math.max(0, Math.round(100 - errorPercentage));
    
    return score;
  };

  const handleDone = () => {
    const score = calculateScore();
    setCurrentScore(score);
    setIsChecked(true);
    
    // Update total score in localStorage
    const newTotal = totalScore + score;
    setTotalScore(newTotal);
    localStorage.setItem("kern", newTotal.toString());
  };

  const handleNext = () => {
    if (currentWordIndex < game.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    // Calculate final average score
    const averageScore = Math.round(totalScore / game.words.length);
    
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

  const handleReset = () => {
    initializeWord();
  };

  const handleCloseModal = () => {
    // Clear localStorage score
    localStorage.setItem("kern", "0");
    setTotalScore(0);
    navigate("/games");
  };

  if (loading) {
    return (
      <div className="kerning-game-page">
        <div className="loading-message">Loading game...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="kerning-game-page">
        <div className="loading-message">
          <p>❌ {error || "Game not found"}</p>
          <button className="game-button done-button" onClick={() => navigate("/games")}>
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const currentWord = game.words[currentWordIndex];
  const progress = ((currentWordIndex + 1) / game.words.length) * 100;

  return (
    <div className="kerning-game-page">
      <div className="kerning-game-container">
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <p className="progress-text">
            Word {currentWordIndex + 1} of {game.words.length}
          </p>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Word Display */}
        <div className="word-display-container">
          <div className="word-display" ref={wordDisplayRef}>
            <div className="letter-container">
              {currentWord.word.split('').map((letter, index) => {
                const isFirst = index === 0;
                const isLast = index === currentWord.word.length - 1;
                const isDraggable = !isFirst && !isLast && !isChecked;
                
                return (
                  <span
                    key={index}
                    className={`letter ${isDraggable ? 'draggable' : ''} ${
                      index === draggingIndex ? 'dragging' : ''
                    } ${isFirst ? 'first-letter' : ''} ${isLast ? 'last-letter' : ''}`}
                    style={{
                      marginLeft: index > 0 ? `${letterSpacing[index - 1]}px` : '0px',
                      cursor: isDraggable ? 'grab' : 'default'
                    }}
                    onMouseDown={(e) => !isFirst && handleMouseDown(index - 1, e)}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="score-display">
            <div>
              <div className="score-label">Current Score</div>
              {isChecked && (
                <div className="score-value">{currentScore}/100</div>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="score-label">Total Score</div>
              <div className="score-value">{totalScore}</div>
            </div>
          </div>

          {!isChecked && (
            <div className="instructions">
              <p><strong>How to play:</strong></p>
              <p>• Drag the middle letters left or right to adjust spacing</p>
              <p>• Use Arrow keys (← →) to fine-tune spacing</p>
              <p>• First and last letters are fixed</p>
              <p>• Click "Done" when you're satisfied with the kerning</p>
            </div>
          )}

          <div className="button-group">
            {!isChecked ? (
              <>
                <button className="game-button done-button" onClick={handleDone}>
                  Done
                </button>
                <button className="game-button reset-button" onClick={handleReset}>
                  Reset
                </button>
              </>
            ) : (
              <button 
                className="game-button next-button" 
                onClick={handleNext}
              >
                {currentWordIndex < game.words.length - 1 ? 'Next' : 'Finish'}
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
              Final Score: {finalAchievement.score}/100
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

export default KerningGame;