import React, { useEffect, useState } from "react";
import { fetchAllLessons, fetchLessonById } from "../../../api/lessons";
import { getQuizByLessonId } from "../../../api/quiz";
import { submitScore, getScoresByUsername, getLeaderboard } from "../../../api/scores";
import { getTypographyByLessonId } from "../../../api/typography";
import MainLayout from "../../layout/MainLayout";
import "./TypographyModal.css";
import "./FrontPage.css";
import "./QuizModal.css";
import "./GameModal.css";

const FrontPage = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showGameModal, setShowGameModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [score, setScore] = useState(0);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const [showTypographyModal, setShowTypographyModal] = useState(false);
  const [typographyData, setTypographyData] = useState(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [typographySubmitted, setTypographySubmitted] = useState(false);
  const [typographyScores, setTypographyScores] = useState(null);
  const [typographyValues, setTypographyValues] = useState({});

  // Fetch all lessons on load
  useEffect(() => {
    const loadLessons = async () => {
      setLoading(true);
      const data = await fetchAllLessons();
      if (data.length === 0) setError("No lessons found or failed to load.");
      setLessons(data);
      setLoading(false);
    };
    loadLessons();
  }, []);

  // Handle lesson selection
  const handleLessonClick = async (id) => {
    setLoading(true);
    const data = await fetchLessonById(id);
    if (!data) {
      setError("Failed to load lesson details.");
      setSelectedLesson(null);
    } else {
      setSelectedLesson(data);
      setError("");
    }
    setLoading(false);
  };

  const getGameInfo = (category) => {
    const gameTypes = {
      trial: {
        header: 'TRIAL GAME',
        description: 'The user will be subject to trial for progress tracking'
      },
      quiz: {
        header: 'QUIZ GAME',
        description: 'Time to show off your wits and intellectual prowess!'
      },
      typography: {
        header: 'TYPOGRAPHY GAME',
        description: 'Time for a practical test. Good luck, designer!'
      }
    };
    return gameTypes[category] || { header: 'GAME', description: 'Start your challenge!' };
  };

  const handleStartGame = async () => {
    if (selectedLesson) {
      // Always show info modal first
      setShowInfoModal(true);
    }
  };

  const handleContinueToGame = async () => {
    setShowInfoModal(false);
    
    if (!selectedLesson) {
      alert('No lesson selected');
      return;
    }
    
    if (selectedLesson.category === 'quiz') {
      // Fetch quiz data
      try {
        const response = await getQuizByLessonId(selectedLesson._id);
        if (response.success) {
          setQuizData(response.data);
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setIsAnswerChecked(false);
          setScore(0);
          setQuizCompleted(false);
          setShowQuizModal(true);
        } else {
          alert('No quiz available for this lesson');
        }
      } catch (error) {
        console.error('Error loading quiz:', error);
        alert('Failed to load quiz. Please try again.');
      }
    } else if (selectedLesson.category === 'typography') {
      // Fetch typography challenges
      try {
        const response = await getTypographyByLessonId(selectedLesson._id);
        if (response.success && response.data && response.data.length > 0) {
          setTypographyData(response.data);
          setCurrentChallengeIndex(0);
          
          // Initialize typography values with middle of slider range
          const initial = {};
          response.data[0].adjustableProperties.forEach(prop => {
            const mid = (prop.sliderRange.min + prop.sliderRange.max) / 2;
            initial[prop.property] = mid;
          });
          setTypographyValues(initial);
          
          setTypographySubmitted(false);
          setTypographyScores(null);
          setShowTypographyModal(true);
        } else {
          alert('No typography challenges available for this lesson');
        }
      } catch (error) {
        console.error('Error loading typography challenges:', error);
        alert('Failed to load typography challenges. Please try again.');
      }
    } else {
      setShowGameModal(true);
    }
  };

  const handleAnswerSelect = (option) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(option);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer && quizData) {
      const currentQuestion = quizData.questions[currentQuestionIndex];
      const correct = selectedAnswer === currentQuestion.answer;
      setIsCorrect(correct);
      setIsAnswerChecked(true);
      
      if (correct) {
        setScore(score + 5);
      }

      // Auto proceed to next question after 2 seconds
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const handleCloseQuiz = async () => {
    // Submit score before closing if quiz was completed
    if (quizCompleted && score > 0) {
      await submitQuizScore();
    }
    
    setShowQuizModal(false);
    setQuizData(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const submitQuizScore = async () => {
    try {
      const username = sessionStorage.getItem('username');
      
      if (!username) {
        console.error('No username found in session storage');
        return;
      }

      const scoreData = {
        username: username,
        gameType: 'quiz',
        lessonId: selectedLesson._id,
        score: score
      };

      const data = await submitScore(scoreData);
      
      if (data.success) {
        console.log('Score submitted successfully:', data);
      } else {
        console.error('Failed to submit score:', data.message);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const calculatePropertyScore = (userValue, { optimal, acceptable }) => {
    if (Math.abs(userValue - optimal) < 0.01) return 100;
    
    const optimalZone = Math.max(Math.abs(optimal * 0.05), 0.5);
    if (Math.abs(userValue - optimal) <= optimalZone) {
      return 90 + (10 * (1 - Math.abs(userValue - optimal) / optimalZone));
    }
    
    if (userValue >= acceptable.min && userValue <= acceptable.max) {
      const distanceFromOptimal = Math.abs(userValue - optimal);
      const maxDistance = Math.max(
        Math.abs(acceptable.max - optimal),
        Math.abs(acceptable.min - optimal)
      );
      return 60 + (30 * (1 - distanceFromOptimal / maxDistance));
    }
    
    const outsideDistance = userValue < acceptable.min 
      ? acceptable.min - userValue 
      : userValue - acceptable.max;
    return Math.max(0, 60 - outsideDistance * 5);
  };

  const handleTypographySliderChange = (property, value) => {
    setTypographyValues(prev => ({
      ...prev,
      [property]: parseFloat(value)
    }));
    if (typographySubmitted) setTypographySubmitted(false);
  };

  const handleSubmitTypography = () => {
    if (!typographyData) return;
    
    const currentChallenge = typographyData[currentChallengeIndex];
    const propertyScores = currentChallenge.adjustableProperties.map(prop => {
      const userValue = typographyValues[prop.property];
      const score = calculatePropertyScore(userValue, {
        optimal: prop.optimal,
        acceptable: prop.acceptable
      });
      return {
        property: prop.label,
        score: Math.round(score),
        userValue,
        optimal: prop.optimal,
        unit: prop.unit
      };
    });

    const totalScore = Math.round(
      propertyScores.reduce((sum, ps) => sum + ps.score, 0) / propertyScores.length
    );

    setTypographyScores({ total: totalScore, properties: propertyScores });
    setTypographySubmitted(true);
  };

  const handleNextTypographyChallenge = () => {
    if (currentChallengeIndex < typographyData.length - 1) {
      const nextIndex = currentChallengeIndex + 1;
      setCurrentChallengeIndex(nextIndex);
      setTypographySubmitted(false);
      setTypographyScores(null);
      
      // Reset values for new challenge
      const initial = {};
      typographyData[nextIndex].adjustableProperties.forEach(prop => {
        const mid = (prop.sliderRange.min + prop.sliderRange.max) / 2;
        initial[prop.property] = mid;
      });
      setTypographyValues(initial);
    } else {
      // All challenges completed
      handleCloseTypography();
    }
  };

  const handleResetTypography = () => {
    if (!typographyData) return;
    
    const initial = {};
    typographyData[currentChallengeIndex].adjustableProperties.forEach(prop => {
      const mid = (prop.sliderRange.min + prop.sliderRange.max) / 2;
      initial[prop.property] = mid;
    });
    setTypographyValues(initial);
    setTypographySubmitted(false);
    setTypographyScores(null);
  };

  const handleCloseTypography = async () => {
    // Submit score before closing if there's a score
    if (typographyScores && typographyScores.total > 0) {
      await submitTypographyScore();
    }
    
    setShowTypographyModal(false);
    setTypographyData(null);
    setCurrentChallengeIndex(0);
    setTypographyValues({});
    setTypographySubmitted(false);
    setTypographyScores(null);
  };

  const submitTypographyScore = async () => {
    try {
      const username = sessionStorage.getItem('username');
      
      if (!username) {
        console.error('No username found in session storage');
        return;
      }

      const scoreData = {
        username: username,
        gameType: 'typography',
        lessonId: selectedLesson._id,
        score: typographyScores.total
      };

      const data = await submitScore(scoreData);
      
      if (data.success) {
        console.log('Typography score submitted successfully:', data);
      } else {
        console.error('Failed to submit score:', data.message);
      }
    } catch (error) {
      console.error('Error submitting typography score:', error);
    }
  };

  const getTypographyTextStyle = () => {
    if (!typographyData) return {};
    
    const challenge = typographyData[currentChallengeIndex];
    const style = {
      fontSize: `${typographyValues.fontSize}px`,
      letterSpacing: `${typographyValues.letterSpacing}px`,
      lineHeight: typographyValues.lineHeight,
      wordSpacing: typographyValues.wordSpacing ? `${typographyValues.wordSpacing}px` : '0px',
      fontFamily: challenge.scenario === 'caution-sign' ? 'Arial Black, sans-serif' : 
                  challenge.scenario === 'event-poster' ? 'Georgia, serif' : 'Arial, sans-serif',
      fontWeight: challenge.scenario === 'caution-sign' ? 'bold' : 'normal',
      textAlign: challenge.scenario === 'caution-sign' ? 'center' : 'left',
      whiteSpace: 'pre-wrap',
      transition: 'all 0.1s ease'
    };
    return style;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 60) return 'score-acceptable';
    return 'score-poor';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent!';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Acceptable';
    return 'Needs Improvement';
  };

  return (
    <MainLayout>
    <div className="lesson-container">
      {/* ---------------- LEFT SECTION ---------------- */}
      <div className="container-one">
        <h2>LESSONS</h2>
        <p>Complete the lessons to earn badges!</p>

        {loading && <p>Loading lessons...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul className="lesson-items" style={{ listStyleType: "none", padding: 0 }}>
          {[...lessons].reverse().map((lesson) => (
            <li
              key={lesson._id}
              onClick={() => handleLessonClick(lesson._id)}
              style={{
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                border: "3px solid",
                backgroundColor:
                  selectedLesson && selectedLesson._id === lesson._id
                    ? "#ffffff"
                    : "#825cff",
                color:
                  selectedLesson && selectedLesson._id === lesson._id
                    ? "#825cff"
                    : "#ffffff",
                borderColor:
                  selectedLesson && selectedLesson._id === lesson._id
                    ? "#825cff"
                    : "#ffffff",
                transition: "0.2s",
              }}
            >
              <strong>{lesson.title}</strong>
              {/* <p style={{ margin: "5px 0", fontSize: "12px" }}>
                {lesson.content?.description}
              </p> */}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <div className="container-two">
        {selectedLesson ? (
          <>
            <h2>{selectedLesson.title}</h2>
            <h7>{selectedLesson.sourceUrl}</h7>

            <div className="lesson-content">
              <h3>Introduction</h3>
              <p>{selectedLesson.content?.introduction}</p>
              <h3>Discussion</h3>
              <p>{selectedLesson.content?.discussionOne}</p>
              <p>{selectedLesson.content?.discussionTwo}</p>
              <p>{selectedLesson.content?.discussionThree}</p>
              <p>{selectedLesson.content?.discussionFour}</p>
              <p>{selectedLesson.content?.discussionFive}</p>
            </div>

            {/* Start Game Button */}
            <button className="start-game-btn" onClick={handleStartGame}>
              Start Game
            </button>

            {/* Info Modal - Shows game rules first */}
            {showInfoModal && selectedLesson && (
              <div 
                className="game-modal-overlay"
              >
                <div 
                  className="game-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="modal-close-btn"
                    onClick={() => setShowInfoModal(false)}
                  >
                    ×
                  </button>

                  <h2 className="modal-header">
                    {selectedLesson ? getGameInfo(selectedLesson.category).header : 'GAME'}
                  </h2>

                  <p className="modal-description">
                    {selectedLesson ? getGameInfo(selectedLesson.category).description : 'Start your challenge!'}
                  </p>

                  <div className="modal-actions">
                    <button
                      className="modal-btn modal-btn-primary"
                      onClick={handleContinueToGame}
                    >
                      Continue to Game
                    </button>
                    <button
                      className="modal-btn modal-btn-secondary"
                      onClick={() => setShowInfoModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Game Modal (for trial and typography categories) */}
            {showGameModal && (
              <div 
                className="game-modal-overlay"
                onClick={() => setShowGameModal(false)}
              >
                <div 
                  className="game-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="modal-close-btn"
                    onClick={() => setShowGameModal(false)}
                  >
                    ×
                  </button>

                  <h2 className="modal-header">
                    {getGameInfo(selectedLesson.category).header}
                  </h2>

                  <p className="modal-description">
                    {getGameInfo(selectedLesson.category).description}
                  </p>

                  <div className="modal-actions">
                    <button
                      className="modal-btn modal-btn-primary"
                      onClick={() => {
                        console.log('Starting game for category:', selectedLesson.category);
                        setShowGameModal(false);
                      }}
                    >
                      Let's Go!
                    </button>
                    <button
                      className="modal-btn modal-btn-secondary"
                      onClick={() => setShowGameModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Modal */}
            {showQuizModal && quizData && (
              <div 
                className="quiz-modal-overlay"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  className="quiz-modal-content"
                >
                  {!quizCompleted ? (
                    <>
                      {/* Quiz Header */}
                      <div className="quiz-info">
                        <div className="quiz-header">
                          <h2 className="modal-header">QUIZ GAME</h2>
                          <div className="quiz-progress">
                            Question {currentQuestionIndex + 1} of {quizData.questions.length}
                          </div>
                          <div className="quiz-score">{score} PTS</div>
                        </div>
                        <div className="quiz-question">
                          <p>{quizData.questions[currentQuestionIndex].question}</p>
                        </div>

                        {/* Check Answer Button */}
                        {!isAnswerChecked && (
                          <button
                            className="quiz-check-btn"
                            onClick={handleCheckAnswer}
                            disabled={!selectedAnswer}
                          >
                            Check Answer
                          </button>
                        )}

                        {/* Feedback */}
                        {isAnswerChecked && (
                          <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {isCorrect ? '✓ Correct!' : '✗ Incorrect!'}
                          </div>
                        )}

                      </div>

                      {/* Options */}
                      <div className="quiz-options">
                      {quizData.questions[currentQuestionIndex].options.map((option, index) => {
                        // Define color sequence: purple, green, orange, then repeat
                        const colors = ['purple', 'green', 'orange'];
                        const colorClass = colors[index % colors.length];
                        
                        return (
                          <button
                            key={index}
                            className={`quiz-option quiz-option-${colorClass} ${
                              selectedAnswer === option ? 'selected' : ''
                            } ${
                              isAnswerChecked
                                ? option === quizData.questions[currentQuestionIndex].answer
                                  ? 'correct'
                                  : selectedAnswer === option
                                  ? 'incorrect'
                                  : ''
                                : ''
                            }`}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={isAnswerChecked}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    </>
                  ) : (
                    /* Quiz Completed */
                    <div className="quiz-completed">
                      <h2 className="modal-header">Quiz Completed!</h2>
                      <div className="quiz-final-score">
                        You Got {score} pts!
                      </div>
                      <div className="quiz-percentage">
                        {Math.round((score / (quizData.questions.length * 5)) * 100)}%
                      </div>
                      <button
                        className="modal-btn modal-btn-primary"
                        onClick={handleCloseQuiz}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Typography Modal */}
            {showTypographyModal && typographyData && (
              <div className="quiz-modal-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="typography-modal-content">
                  {/* Header */}
                  <div className="typography-header">
                    <h2 className="modal-header">TYPOGRAPHY CHALLENGE</h2>
                    <div className="typography-progress">
                      Challenge {currentChallengeIndex + 1} of {typographyData.length}
                    </div>
                    {typographyScores && (
                      <div className="quiz-score">{typographyScores.total} PTS</div>
                    )}
                  </div>

                  {/* Challenge Info */}
                  <div className="typography-challenge-info">
                    <p className="typography-prompt">{typographyData[currentChallengeIndex].prompt}</p>
                    <div className="typography-context">
                      <span>Distance: {typographyData[currentChallengeIndex].designContext.readingDistance}</span>
                      <span>Purpose: {typographyData[currentChallengeIndex].designContext.purpose}</span>
                      <span>Difficulty: {typographyData[currentChallengeIndex].difficulty}</span>
                    </div>
                  </div>

                  <div className="typography-game-container">
                    {/* Preview Area */}
                    <div className="typography-preview-section">
                      <h3>Preview</h3>
                      <div 
                        className="typography-preview-box"
                        style={{
                          backgroundColor: typographyData[currentChallengeIndex].scenario === 'caution-sign' ? '#FEF3C7' : '#F8FAFC'
                        }}
                      >
                        <div style={getTypographyTextStyle()}>
                          {typographyData[currentChallengeIndex].displayText}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="typography-controls-section">
                      <h3>Typography Controls</h3>
                      <div className="typography-sliders">
                        {typographyData[currentChallengeIndex].adjustableProperties.map((prop) => (
                          <div key={prop.property} className="typography-slider-group">
                            <div className="slider-label-row">
                              <label>{prop.label}</label>
                              <span className="slider-value">
                                {typographyValues[prop.property]?.toFixed(prop.unit === 'px' ? 1 : 2)}{prop.unit}
                              </span>
                            </div>
                            <input
                              type="range"
                              min={prop.sliderRange.min}
                              max={prop.sliderRange.max}
                              step={prop.sliderRange.step}
                              value={typographyValues[prop.property] || prop.sliderRange.min}
                              onChange={(e) => handleTypographySliderChange(prop.property, e.target.value)}
                              className="typography-slider"
                            />
                            <div className="slider-range-labels">
                              <span>{prop.sliderRange.min}{prop.unit}</span>
                              <span>{prop.sliderRange.max}{prop.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="typography-actions">
                        <button 
                          className="typography-btn typography-btn-reset"
                          onClick={handleResetTypography}
                        >
                          Reset
                        </button>
                        <button
                          className="typography-btn typography-btn-submit"
                          onClick={handleSubmitTypography}
                          disabled={typographySubmitted}
                        >
                          {typographySubmitted ? 'Submitted' : 'Submit Design'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Score Display */}
                  {typographySubmitted && typographyScores && (
                    <div className="typography-results">
                      <div className="results-header">
                        <h3>Your Results</h3>
                        <div className="results-score">
                          <div className={`score-number ${getScoreColor(typographyScores.total)}`}>
                            {typographyScores.total}
                          </div>
                          <div className="score-label">{getScoreLabel(typographyScores.total)}</div>
                        </div>
                      </div>

                      <div className="results-properties">
                        {typographyScores.properties.map((prop, idx) => (
                          <div key={idx} className="property-result">
                            <div className="property-name">{prop.property}</div>
                            <div className="property-values">
                              <div>Your value: <strong>{prop.userValue.toFixed(prop.unit === 'px' ? 1 : 2)}{prop.unit}</strong></div>
                              <div>Optimal: <strong className="optimal-value">{prop.optimal}{prop.unit}</strong></div>
                              <div className={`property-score ${getScoreColor(prop.score)}`}>
                                Score: {prop.score}/100
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="results-actions">
                        {currentChallengeIndex < typographyData.length - 1 ? (
                          <button
                            className="typography-btn typography-btn-next"
                            onClick={handleNextTypographyChallenge}
                          >
                            Next Challenge
                          </button>
                        ) : (
                          <button
                            className="typography-btn typography-btn-close"
                            onClick={handleCloseTypography}
                          >
                            Complete & Close
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Close Button */}
                  <button 
                    className="modal-close-btn"
                    onClick={handleCloseTypography}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

          </>
        ) : (
          <div style={{ textAlign: "center", opacity: 0.8 }}>
            <h2>Welcome to TypeVenture!</h2>
            <p style={{ color: "#825cff" }}>
              First start with the Introduction and work your way all the way down to earn badges and land a place at the Leaderboards!
            </p>
          </div>
        )}
      </div>
    </div>
    </MainLayout>
  );
};

export default FrontPage;