import React, { useEffect, useState } from "react";
import { fetchAllLessons, fetchLessonById } from "../../../api/lessons";
import { getQuizByLessonId } from "../../../api/quiz";
import MainLayout from "../../layout/MainLayout";
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
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

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
      await submitScore();
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
        lessonNumber: selectedLesson._id,
        score: score
      };

      const response = await fetch('http://localhost:5000/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData)
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Score submitted successfully:', data);
      } else {
        console.error('Failed to submit score:', data.message);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
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
                          <div className="quiz-score">Score: {score}</div>
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
                        Your Score: {score} / {quizData.questions.length}
                      </div>
                      <div className="quiz-percentage">
                        {Math.round((score / quizData.questions.length) * 100)}%
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