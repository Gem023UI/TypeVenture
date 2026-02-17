import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchGameById, submitScore } from "../../../../api/games.js";
import { fetchLessonById } from "../../../../api/lessons.js";
import "./LessonQuiz.css";

const ACHIEVEMENT_IMAGES = {
  gold: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305621/gold_medal_w7xagi.png",
  silver: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305631/silver_medal_nfb50c.png",
  bronze: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771305618/bronze_medal_olw8ds.png",
  none: ""
};

const Lesson9QuizGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [game, setGame] = useState(location.state?.game || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasCompletedLesson, setHasCompletedLesson] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [userBlankAnswers, setUserBlankAnswers] = useState([]);
  const [usedLetterIndices, setUsedLetterIndices] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [finalAchievement, setFinalAchievement] = useState(null);
  const [availableLetters, setAvailableLetters] = useState([]);

  useEffect(() => {
    loadGameAndCheckLesson();
  }, [gameId]);

  useEffect(() => {
    if (game && hasCompletedLesson) {
      initializeQuestion();
    }
  }, [currentQuestionIndex, game, hasCompletedLesson]);

  const loadGameAndCheckLesson = async () => {
    try {
      setLoading(true);
      
      const gameData = await fetchGameById(gameId);
      setGame(gameData);
      
      if (gameData.lessonId) {
        const lessonData = await fetchLessonById(gameData.lessonId);
        const userId = localStorage.getItem("userId");
        
        const completed = lessonData.usersDone.some(entry => 
          entry.userId === userId || entry.userId.toString() === userId
        );
        
        setHasCompletedLesson(completed);
        
        if (!completed) {
          setError("You must complete the lesson before taking this quiz!");
        }
      } else {
        setHasCompletedLesson(true);
      }
      
    } catch (err) {
      console.error("Error loading game:", err);
      if (err.status === 403 && err.isVerified === false) {
        setError("Please verify your email to play this game");
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
    if (!game || !game.quizQuestions || !game.quizQuestions[currentQuestionIndex]) return;

    const question = game.quizQuestions[currentQuestionIndex];
    setUserAnswer(null);
    setIsAnswered(false);
    
    if (question.questionType === 'fillblank') {
      setUserBlankAnswers(new Array(question.missingLetters.length).fill(''));
      setUsedLetterIndices([]);
      generateAvailableLetters(question.missingLetters);
    }
  };

  const generateAvailableLetters = (missingLetters) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const uniqueMissing = [...new Set(missingLetters)];
    const numDistractors = Math.max(4, Math.ceil(uniqueMissing.length * 1.5));
    const availableDistractors = alphabet.filter(letter => !uniqueMissing.includes(letter));
    const shuffledDistractors = availableDistractors.sort(() => 0.5 - Math.random());
    const distractors = shuffledDistractors.slice(0, numDistractors);
    const allLetters = [...missingLetters, ...distractors].sort(() => 0.5 - Math.random());
    setAvailableLetters(allLetters);
  };

  const handleMultipleChoice = (option) => {
    if (isAnswered) return;
    setUserAnswer(option);
  };

  const handleTrueFalse = (answer) => {
    if (isAnswered) return;
    setUserAnswer(answer);
  };

  const handleLetterClick = (letter, letterIndex) => {
    if (isAnswered || usedLetterIndices.includes(letterIndex)) return;

    const emptyIndex = userBlankAnswers.findIndex(ans => ans === '');
    
    if (emptyIndex !== -1) {
      const newAnswers = [...userBlankAnswers];
      newAnswers[emptyIndex] = letter;
      setUserBlankAnswers(newAnswers);
      setUsedLetterIndices([...usedLetterIndices, letterIndex]);
    }
  };

  const handleBlankClick = (blankIndex) => {
    if (isAnswered) return;

    const letterToRemove = userBlankAnswers[blankIndex];
    if (letterToRemove) {
      const newAnswers = [...userBlankAnswers];
      newAnswers[blankIndex] = '';
      setUserBlankAnswers(newAnswers);
      
      const letterIndexInAvailable = availableLetters.findIndex(
        (letter, idx) => letter === letterToRemove && usedLetterIndices.includes(idx)
      );
      
      if (letterIndexInAvailable !== -1) {
        setUsedLetterIndices(usedLetterIndices.filter(idx => idx !== letterIndexInAvailable));
      }
    }
  };

  const handleSubmit = () => {
    const currentQuestion = game.quizQuestions[currentQuestionIndex];
    let correct = false;

    if (currentQuestion.questionType === 'fillblank') {
      correct = userBlankAnswers.every((ans, idx) => 
        ans === currentQuestion.missingLetters[idx]
      );
    } else {
      correct = userAnswer === currentQuestion.correctAnswer;
    }

    if (correct) {
      setScore(score + 1);
    }
    
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < game.quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    const totalQuestions = game.quizQuestions.length;
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

  const handleGoToLesson = () => {
    navigate("/lessons");
  };

  const renderQuestion = () => {
    if (!game || !game.quizQuestions[currentQuestionIndex]) return null;

    const question = game.quizQuestions[currentQuestionIndex];
    
    if (question.questionType === 'multiple') {
      return (
        <div className="options-grid">
          {question.options.map((option, index) => {
            let buttonClass = 'option-button';
            if (isAnswered) {
              if (option === question.correctAnswer) {
                buttonClass += ' correct';
              } else if (option === userAnswer) {
                buttonClass += ' incorrect';
              }
            } else if (option === userAnswer) {
              buttonClass += ' selected';
            }
            
            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleMultipleChoice(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }
    
    if (question.questionType === 'truefalse') {
      return (
        <div className="truefalse-options">
          {['True', 'False'].map((option) => {
            let buttonClass = `tf-button ${option.toLowerCase()}`;
            if (isAnswered) {
              if (option === question.correctAnswer) {
                buttonClass += ' correct';
              } else if (option === userAnswer) {
                buttonClass += ' incorrect';
              }
            } else if (option === userAnswer) {
              buttonClass += ' selected';
            }
            
            return (
              <button
                key={option}
                className={buttonClass}
                onClick={() => handleTrueFalse(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }
    
    if (question.questionType === 'fillblank') {
      return (
        <>
          <div className="blank-display">
            {question.displayText.split('').map((char, index) => {
              if (char === '_') {
                const blankIndex = question.displayText.substring(0, index).split('_').length - 1;
                const userAnswerChar = userBlankAnswers[blankIndex] || '';
                let blankClass = 'blank-space';
                
                if (userAnswerChar) {
                  blankClass += ' filled';
                }
                
                if (isAnswered) {
                  if (userAnswerChar === question.missingLetters[blankIndex]) {
                    blankClass += ' correct';
                  } else {
                    blankClass += ' incorrect';
                  }
                }
                
                return (
                  <div
                    key={index}
                    className={blankClass}
                    onClick={() => handleBlankClick(blankIndex)}
                  >
                    {userAnswerChar}
                  </div>
                );
              } else {
                return (
                  <span key={index} className="blank-letter">
                    {char}
                  </span>
                );
              }
            })}
          </div>

          {!isAnswered && (
            <div className="letter-options">
              {availableLetters.map((letter, index) => (
                <button
                  key={index}
                  className="letter-button"
                  onClick={() => handleLetterClick(letter, index)}
                  disabled={usedLetterIndices.includes(index)}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
        </>
      );
    }
  };

  if (loading) {
    return (
      <div className="quiz-game-page">
        <div className="loading-message">Loading quiz...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="quiz-game-page">
        <div className="loading-message">
          <p>❌ {error || "Quiz not found"}</p>
          {!hasCompletedLesson && (
            <button 
              className="game-button submit-button" 
              onClick={handleGoToLesson}
              style={{ marginTop: '20px' }}
            >
              Go to Lessons
            </button>
          )}
          <button 
            className="game-button next-button" 
            onClick={() => navigate("/games")}
            style={{ marginTop: '10px' }}
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  if (!hasCompletedLesson) {
    return (
      <div className="quiz-game-page">
        <div className="loading-message">
          <h2>🔒 Lesson Not Completed</h2>
          <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>
            You must complete the lesson before taking this quiz!
          </p>
          <button 
            className="game-button submit-button" 
            onClick={handleGoToLesson}
            style={{ marginTop: '30px' }}
          >
            Go to Lessons
          </button>
          <button 
            className="game-button next-button" 
            onClick={() => navigate("/games")}
            style={{ marginTop: '10px' }}
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = game.quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / game.quizQuestions.length) * 100;
  const isAnswerProvided = currentQuestion.questionType === 'fillblank' 
    ? userBlankAnswers.every(ans => ans !== '')
    : userAnswer !== null;

  return (
    <div className="quiz-game-page">
      <div className="quiz-game-container">
        <div className="progress-section">
          <div className="progress-header">
            <span className="question-counter">
              Question {currentQuestionIndex + 1} of {game.quizQuestions.length}
            </span>
            <span className="score-display">
              Score: {score}/{game.quizQuestions.length}
            </span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="question-display">
          <span className={`question-type-badge badge-${currentQuestion.questionType}`}>
            {currentQuestion.questionType === 'multiple' && 'Multiple Choice'}
            {currentQuestion.questionType === 'truefalse' && 'True or False'}
            {currentQuestion.questionType === 'fillblank' && 'Fill in the Blank'}
          </span>
          <h2 className="question-text">{currentQuestion.questionText}</h2>
        </div>

        <div className="answer-section">
          {isAnswered && (
            <div className={`feedback-message ${
              (currentQuestion.questionType === 'fillblank' 
                ? userBlankAnswers.every((ans, idx) => ans === currentQuestion.missingLetters[idx])
                : userAnswer === currentQuestion.correctAnswer) 
              ? 'correct' : 'incorrect'
            }`}>
              {(currentQuestion.questionType === 'fillblank' 
                ? userBlankAnswers.every((ans, idx) => ans === currentQuestion.missingLetters[idx])
                : userAnswer === currentQuestion.correctAnswer) 
                ? '✅ Correct!' 
                : `❌ Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
            </div>
          )}

          {renderQuestion()}

          <div className="action-buttons">
            {!isAnswered ? (
              <button 
                className="game-button submit-button"
                onClick={handleSubmit}
                disabled={!isAnswerProvided}
              >
                Submit Answer
              </button>
            ) : (
              <button 
                className="game-button next-button"
                onClick={handleNext}
              >
                {currentQuestionIndex < game.quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showAchievement && finalAchievement && (
        <div className="modal-overlay">
          <div className="achievement-modal">
            <h2>🎉 Quiz Complete! 🎉</h2>
            
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

export default Lesson9QuizGame;