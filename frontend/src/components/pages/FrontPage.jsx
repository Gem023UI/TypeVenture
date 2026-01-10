import React, { useEffect, useState } from "react";
import { fetchAllLessons, fetchLessonById } from "../../api/lessons";
import { getQuizByLessonId } from "../../api/quiz";
import { getScoresByUserId } from "../../api/scores";
import { getTypographyByLessonId } from "../../api/typography";
import { getUserAchievements } from "../../api/achievements";
import { submitScoreWithAchievement } from "../../api/scores";
import MainLayout from "../layout/MainLayout";
import "./TypographyModal.css";
import "./FrontPage.css";
import "./QuizModal.css";
import "./GameModal.css";

const CheckIcon = () => (
  <svg 
    fill="#0029FF" 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 26.362 26.361"
    style={{ width: '20px', height: '20px', marginRight: '0px', flexShrink: 0 }}
  >
    <g>
      <path d="M24.361,0H2C0.896,0,0,0.896,0,2v22.361c0,1.104,0.896,2,2,2h22.36c1.104,0,2-0.896,2-2V2C26.361,0.896,25.465,0,24.361,0z M21.125,9.953l-8.199,8.2c-0.375,0.375-0.884,0.586-1.414,0.586c-0.529,0-1.039-0.21-1.414-0.586l-4.861-4.862 c-0.781-0.78-0.781-2.047,0-2.828c0.781-0.78,2.047-0.78,2.828,0l3.447,3.447l6.785-6.785c0.781-0.78,2.047-0.78,2.828,0 C21.908,7.907,21.908,9.172,21.125,9.953z"></path>
    </g>
  </svg>
);

const CrossIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '20px', height: '20px', marginRight: '0px', flexShrink: 0 }}
  >
    <g transform="translate(-206, -1037)">
      <path 
        d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" 
        fill="#ff6161"
      />
    </g>
  </svg>
);

const ListIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '24px', height: '24px', marginRight: '0px', verticalAlign: 'middle' }}
  >
    <path 
      d="M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z" 
      stroke="#ffffff" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '24px', height: '24px', marginRight: '0px', verticalAlign: 'middle' }}
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM12 13.25C12.4142 13.25 12.75 13.5858 12.75 14V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V14C11.25 13.5858 11.5858 13.25 12 13.25Z" fill="#ffffff"></path> </g></svg>
)

const FrontPage = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userScores, setUserScores] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [challengeScores, setChallengeScores] = useState([]);

  const [userAchievements, setUserAchievements] = useState([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [earnedAchievement, setEarnedAchievement] = useState(null);

  const hasScore = (lessonId) => {
    return userScores.some(score => 
      score.lessonId === lessonId || 
      score.lessonId === lessonId.toString()
    );
  };

  const isLessonUnlocked = (lessonIndex) => {
    if (lessonIndex === 0) return true;
    
    const previousLesson = [...lessons].reverse()[lessonIndex - 1];
    return hasScore(previousLesson._id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchUserScores = async () => {
    try {
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        console.log("No user ID found in localStorage");
        return;
      }

      const response = await getScoresByUserId(userId);
      
      if (response.success) {
        setUserScores(response.data);
        console.log("User scores loaded:", response.data);
      }
    } catch (err) {
      console.error("Error fetching user scores:", err);
    }
  };

  const fetchUserAchievements = async () => {
    try {
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        console.log("No user ID found in localStorage");
        return;
      }

      const response = await getUserAchievements(userId);
      
      if (response.success) {
        setUserAchievements(response.data);
        console.log("User achievements loaded:", response.data);
      }
    } catch (err) {
      console.error("Error fetching user achievements:", err);
    }
  };

  useEffect(() => {
    const loadLessons = async () => {
      setLoading(true);
      const data = await fetchAllLessons();
      if (data.length === 0) setError("No lessons found or failed to load.");
      setLessons(data);
      setLoading(false);
    };
    loadLessons();
    fetchUserScores();
    fetchUserAchievements();
  }, []);

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
      try {
        const response = await getTypographyByLessonId(selectedLesson._id);
        if (response.success && response.data && response.data.length > 0) {
          setTypographyData(response.data);
          setCurrentChallengeIndex(0);
          
          const initial = {};
          response.data[0].adjustableProperties.forEach(prop => {
            if (prop.property === 'fontFamily' || prop.property === 'color' || prop.property === 'textAlign') {
              initial[prop.property] = prop.sliderRange.options?.[0] || '';
            } else {
              const mid = (prop.sliderRange.min + prop.sliderRange.max) / 2;
              initial[prop.property] = mid;
            }
          });
          setTypographyValues(initial);

          const fontProp = response.data[0].adjustableProperties.find(p => p.property === 'fontFamily');
          const colorProp = response.data[0].adjustableProperties.find(p => p.property === 'color');
          if (fontProp) setSelectedFont(fontProp.options?.[0] || '');
          if (colorProp) setSelectedColor(colorProp.options?.[0] || '');
          
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
      setTypographySubmitted(false);
      setTypographyScores(null);
      setChallengeScores([]);
      setShowTypographyModal(true);

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

      setTimeout(() => {
        handleNextQuestion();
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleCloseQuiz = async () => {
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
    
    fetchUserScores();
  };

  const submitQuizScore = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        console.error('No user ID found in localStorage');
        return;
      }

      const scoreData = {
        userId: userId,
        gameType: 'quiz',
        lessonId: selectedLesson._id,
        score: score
      };

      const data = await submitScoreWithAchievement(scoreData);
      
      if (data.success) {
        if (data.replaced) {
          console.log('Previous score replaced with new score:', data);
        } else {
          console.log('First score submitted successfully:', data);
        }
        
        fetchUserScores();
        fetchUserAchievements();
        
        if (data.achievement && data.achievement.success) {
          setEarnedAchievement(data.achievement.data);
          setShowAchievementModal(true);
        }
      } else {
        console.error('Failed to submit score:', data.message);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const calculatePropertyScore = (property, userValue, propData) => {
    // Binary choice properties (font, color)
    if (property === 'fontFamily' || property === 'color' || property === 'textAlign') {
      return userValue === propData.correctAnswer ? 100 : 0;
    }
    
    // Slider-based properties
    const { optimal, acceptable } = propData;
    
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
    // Don't parse string values for dropdown properties
    if (property === 'fontFamily' || property === 'color' || property === 'textAlign') {
      setTypographyValues(prev => ({
        ...prev,
        [property]: value  // Keep as string
      }));
    } else {
      setTypographyValues(prev => ({
        ...prev,
        [property]: parseFloat(value)  // Parse numeric values only
      }));
    }
    if (typographySubmitted) setTypographySubmitted(false);
  };

  const handleSubmitTypography = () => {
    if (!typographyData) return;
    
    const currentChallenge = typographyData[currentChallengeIndex];
    const propertyScores = currentChallenge.adjustableProperties.map(prop => {
      let userValue;
      
      if (prop.property === 'fontFamily') {
        userValue = selectedFont;
      } else if (prop.property === 'color') {
        userValue = selectedColor;
      } else if (prop.property === 'textAlign') {
        userValue = typographyValues[prop.property];
      } else {
        userValue = typographyValues[prop.property];
      }
      
      const score = calculatePropertyScore(prop.property, userValue, {
        optimal: prop.optimal,
        acceptable: prop.acceptable,
        correctAnswer: prop.correctAnswer
      });
      
      return {
        property: prop.label,
        score: Math.round(score),
        userValue: userValue,
        optimal: (prop.property === 'fontFamily' || prop.property === 'color' || prop.property === 'textAlign') ? prop.sliderRange.correctAnswer : prop.optimal,
        unit: prop.sliderRange.unit || '',
        isCorrect: (prop.property === 'fontFamily' || prop.property === 'color' || prop.property === 'textAlign') ? (userValue === prop.sliderRange.correctAnswer) : null
      };
    });

    const totalScore = Math.round(
      propertyScores.reduce((sum, ps) => sum + ps.score, 0) / propertyScores.length
    );

    setTypographyScores({ total: totalScore, properties: propertyScores });
    setTypographySubmitted(true);

    const newChallengeScores = [...challengeScores, totalScore];
    setChallengeScores(newChallengeScores);
    console.log('Challenge scores so far:', newChallengeScores);
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
        if (prop.property === 'fontFamily' || prop.property === 'color' || prop.property === 'textAlign') {
          initial[prop.property] = prop.sliderRange.options?.[0] || '';
        } else {
          const mid = (prop.sliderRange.min + prop.sliderRange.max) / 2;
          initial[prop.property] = mid;
        }
      });
      setTypographyValues(initial);

      // Reset font and color selections
      const fontProp = typographyData[nextIndex].adjustableProperties.find(p => p.property === 'fontFamily');
      const colorProp = typographyData[nextIndex].adjustableProperties.find(p => p.property === 'color');
      if (fontProp) setSelectedFont(fontProp.sliderRange.options?.[0] || '');
      if (colorProp) setSelectedColor(colorProp.sliderRange.options?.[0] || '');

    } else {
      // All challenges completed, calculate average
      const averageScore = Math.round(
        challengeScores.reduce((sum, score) => sum + score, 0) / challengeScores.length
      );
      console.log('All challenges completed! Average score:', averageScore);
      
      // Store average score for submission
      setTypographyScores({ total: averageScore, properties: [] });
      
      handleCloseTypography();
    }
  };

  const handleResetTypography = () => {
    if (!typographyData) return;
    
    const initial = {};
    typographyData[currentChallengeIndex].adjustableProperties.forEach(prop => {
      if (prop.property === 'fontFamily' || prop.property === 'color' || prop.property === 'textAlign') {
        initial[prop.property] = prop.sliderRange.options?.[0] || '';
      } else {
        const mid = (prop.sliderRange.min + prop.sliderRange.max) / 2;
        initial[prop.property] = mid;
      }
    });
    setTypographyValues(initial);

    // Reset font and color
    const fontProp = typographyData[currentChallengeIndex].adjustableProperties.find(p => p.property === 'fontFamily');
    const colorProp = typographyData[currentChallengeIndex].adjustableProperties.find(p => p.property === 'color');
    if (fontProp) setSelectedFont(fontProp.sliderRange.options?.[0] || '');
    if (colorProp) setSelectedColor(colorProp.sliderRange.options?.[0] || '');

    setTypographySubmitted(false);
    setTypographyScores(null);
  };

  const handleCloseTypography = async () => {
    if (challengeScores.length > 0) {
      const averageScore = Math.round(
        challengeScores.reduce((sum, score) => sum + score, 0) / challengeScores.length
      );
      
      const scoreData = {
        userId: localStorage.getItem('userId'),
        gameType: 'typography',
        lessonId: selectedLesson._id,
        score: averageScore
      };
      
      console.log('Submitting average score:', averageScore);
      const data = await submitScoreWithAchievement(scoreData);
      
      if (data.success) {
        console.log('Average typography score submitted:', data);
        fetchUserScores();
        fetchUserAchievements();
        
        if (data.achievement && data.achievement.success) {
          setEarnedAchievement(data.achievement.data);
          setShowAchievementModal(true);
        }
      }
    }
    
    setShowTypographyModal(false);
    setTypographyData(null);
    setCurrentChallengeIndex(0);
    setTypographyValues({});
    setTypographySubmitted(false);
    setTypographyScores(null);
    setChallengeScores([]);
    
    fetchUserScores();
  };

  const getTypographyTextStyle = () => {
    if (!typographyData) return {};
    
    const challenge = typographyData[currentChallengeIndex];
    const style = {
      fontSize: `${typographyValues.fontSize || 16}px`,
      letterSpacing: `${typographyValues.letterSpacing || 0}px`,
      lineHeight: typographyValues.lineHeight || 1.5,
      wordSpacing: typographyValues.wordSpacing ? `${typographyValues.wordSpacing}px` : '0px',
      fontFamily: typographyValues.fontFamily || selectedFont || 'Arial, sans-serif',
      color: typographyValues.color || selectedColor || '#000000',
      textAlign: typographyValues.textAlign || 'left',
      fontWeight: challenge.scenario === 'caution-sign' ? 'bold' : 'normal',
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
      <div 
        className={`container-one ${isSidebarOpen ? 'open' : 'closed'}`}
        style={{
          width: isSidebarOpen ? '30%' : '80px',
          transition: 'width 0.3s ease',
        }}
      >
        <div className="container-one-header">
          <h2 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              cursor: 'pointer',
              gap: '15px',
              transition: 'justify-content 0.3s ease'
            }}
            onClick={toggleSidebar}
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ListIcon />
            {isSidebarOpen && 'LESSONS'}
          </h2>
        </div>

        {isSidebarOpen && <p>Complete the lessons to earn badges!</p>}
        {isSidebarOpen && loading && <p>Loading lessons...</p>}
        {isSidebarOpen && error && <p style={{ color: "red" }}>{error}</p>}

        <ul className="lesson-items" style={{ listStyleType: "none", padding: 0 }}>
          {[...lessons].reverse().map((lesson, index) => {
            const unlocked = isLessonUnlocked(index);
            
            return (
              <li
                key={lesson._id}
                onClick={() => unlocked && handleLessonClick(lesson._id)}
                style={{
                  padding: isSidebarOpen ? "10px" : "10px 0px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  cursor: unlocked ? "pointer" : "not-allowed",
                  border: "3px solid",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: '15px',
                  justifyContent: isSidebarOpen ? "flex-start" : "center",
                  opacity: unlocked ? 1 : 0.5,

                  backgroundColor:
                    selectedLesson && selectedLesson._id === lesson._id
                      ? "#ffffff"
                      : "transparent",

                  color:
                    selectedLesson && selectedLesson._id === lesson._id
                      ? "purple"
                      : "#ffffff",

                  borderColor:
                    selectedLesson && selectedLesson._id === lesson._id
                      ? "transparent"
                      : "transparent",
                }}
                title={
                  isSidebarOpen 
                    ? (unlocked ? "" : "Complete the previous lesson to unlock") 
                    : (unlocked ? lesson.title : "🔒 Locked")
                }
              >
                {unlocked ? (
                  hasScore(lesson._id) ? <CheckIcon /> : <CrossIcon />
                ) : (
                  <LockIcon />
                )}
                {isSidebarOpen && <strong>{lesson.title}</strong>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <div className="container-two"
      style={{
        width: isSidebarOpen ? '70%' : 'calc(100% - 100px)',
        transition: 'width 0.3s ease',
      }}>
        {selectedLesson ? (
          <>
            <h2>{selectedLesson.title}</h2>
            <h7>{selectedLesson.sourceUrl}</h7>

            {/* Lesson Contents */}
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
            <div className="start-game">
              <button className="start-game-btn" onClick={handleStartGame}>
                START GAME!
              </button>
            </div>

            {/* Info Modal */}
            {showInfoModal && selectedLesson && (
              <div 
                className="game-modal-overlay"
              >
                <div 
                  className="game-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
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
                      Let's Go!
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

            {/* Game Modal */}
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
                    Ã—
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
                            {isCorrect ? 'Correct!' : 'Incorrect!'}
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
                        className="quiz-end"
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
              <div className="typography-modal-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="typography-modal-content">

                  <div className="typography-left">
                    <h2>TYPOGRAPHY GAME</h2>
                    <div className="typography-game-container">
                      {/* Preview Area */}
                      <div className="typography-preview-section">
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
                    </div>
                  </div>

                  <div className="typography-right">
                    {/* Challenge Info */}
                    <div className="typography-challenge-info">
                      <p className="typography-prompt">Challenge {currentChallengeIndex + 1}: {typographyData[currentChallengeIndex].prompt}</p>
                      <div className="typography-context">
                        <span>Distance: {typographyData[currentChallengeIndex].designContext.readingDistance}</span>
                        <span>Purpose: {typographyData[currentChallengeIndex].designContext.purpose}</span>
                        <span>Difficulty: {typographyData[currentChallengeIndex].difficulty}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="typography-controls-section">
                      <h3>Typography Controls</h3>
                      <div className="typography-sliders">
                        {typographyData[currentChallengeIndex].adjustableProperties.map((prop) => (
                          <div key={prop.property} className="typography-slider-group">
                            {prop.property === 'fontFamily' ? (
                              // Font selector dropdown
                              <>
                                <div className="slider-label-row">
                                  <label>{prop.label}</label>
                                </div>
                                <select
                                value={typographyValues.fontFamily || selectedFont}
                                onChange={(e) => {
                                  setSelectedFont(e.target.value);
                                  setTypographyValues(prev => ({
                                    ...prev,
                                    fontFamily: e.target.value
                                  }));
                                  if (typographySubmitted) setTypographySubmitted(false);
                                }}
                                  className="typography-dropdown"
                                  style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '2px solid #825cff',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {prop.sliderRange?.options?.map((font) => (
                                    <option key={font} value={font}>{font}</option>
                                  ))}
                                </select>
                              </>
                            ) : prop.property === 'color' ? (
                              // Color selector dropdown
                              <>
                                <div className="slider-label-row">
                                  <label>{prop.label}</label>
                                  <span className="slider-value" style={{ 
                                    display: 'inline-block',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: selectedColor,
                                    border: '1px solid #ccc',
                                    borderRadius: '3px'
                                  }}></span>
                                </div>
                                <select
                                value={typographyValues.color || selectedColor}
                                onChange={(e) => {
                                  setSelectedColor(e.target.value);
                                  setTypographyValues(prev => ({
                                    ...prev,
                                    color: e.target.value
                                  }));
                                  if (typographySubmitted) setTypographySubmitted(false);
                                }}ssName="typography-dropdown"
                                  style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '2px solid #825cff',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {prop.sliderRange?.options?.map((color) => (
                                    <option key={color} value={color}>
                                      {color === '#000000' ? 'Black' : 
                                      color === '#FFFFFF' ? 'White' :
                                      color === '#FF0000' ? 'Red' :
                                      color === '#FFA500' ? 'Orange' :
                                      color === '#FFFF00' ? 'Yellow' :
                                      color === '#1E40AF' ? 'Blue' :
                                      color === '#065F46' ? 'Green' : color}
                                    </option>
                                  ))}
                                </select>
                              </>
                            ) : prop.property === 'textAlign' ? (
                              // Text Alignment dropdown
                              <>
                                <div className="slider-label-row">
                                  <label>{prop.label}</label>
                                </div>
                                <select
                                  value={typographyValues[prop.property] || prop.sliderRange.options?.[0] || 'left'}
                                  onChange={(e) => {
                                    handleTypographySliderChange(prop.property, e.target.value);
                                  }}
                                  className="typography-dropdown"
                                  style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '2px solid #825cff',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {prop.sliderRange?.options?.map((align) => (
                                    <option key={align} value={align}>
                                      {align.charAt(0).toUpperCase() + align.slice(1)}
                                    </option>
                                  ))}
                                </select>
                              </>
                            ) : (
                              // Regular slider
                              <>
                                <div className="slider-label-row">
                                  <label>{prop.label}</label>
                                  <span className="slider-value">
                                    {typographyValues[prop.property]?.toFixed(prop.sliderRange.unit === 'px' ? 1 : 2)}{prop.sliderRange.unit}
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
                                  <span>{prop.sliderRange.min}{prop.sliderRange.unit}</span>
                                  <span>{prop.sliderRange.max}{prop.sliderRange.unit}</span>
                                </div>
                              </>
                            )}
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
                              {prop.isCorrect !== null ? (
                                // Binary choice result
                                <>
                                  <div>Your choice: <strong>{prop.userValue}</strong></div>
                                  <div>Correct answer: <strong className="optimal-value">{prop.optimal}</strong></div>
                                  <div className={`property-score ${prop.isCorrect ? 'score-excellent' : 'score-poor'}`}>
                                    {prop.isCorrect ? 'Correct (100/100)' : 'Incorrect (0/100)'}
                                  </div>
                                </>
                              ) : (
                                // Slider result
                                <>
                                  <div>Your value: <strong>{prop.userValue.toFixed(prop.unit === 'px' ? 1 : 2)}{prop.unit}</strong></div>
                                  <div>Optimal: <strong className="optimal-value">{prop.optimal}{prop.unit}</strong></div>
                                  <div className={`property-score ${getScoreColor(prop.score)}`}>
                                    Score: {prop.score}/100
                                  </div>
                                </>
                              )}
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
                </div>
              </div>
            )}

            {/* Achievement Modal */}
            {showAchievementModal && earnedAchievement && (
              <div 
                className="game-modal-overlay"
                onClick={() => setShowAchievementModal(false)}
              >
                <div 
                  className="achievement-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="modal-close-btn"
                    onClick={() => setShowAchievementModal(false)}
                  >
                    ×
                  </button>

                  <h2 className="modal-header">🏆 Achievement Unlocked!</h2>
                  
                  <div className="achievement-display">
                    <img 
                      src={earnedAchievement.imageUrl} 
                      alt={`${earnedAchievement.tier} medal`}
                      className="achievement-image"
                    />
                    <h3 className="achievement-tier">
                      {earnedAchievement.tier.charAt(0).toUpperCase() + earnedAchievement.tier.slice(1)} Medal
                    </h3>
                    <p className="achievement-score">Score: {earnedAchievement.score}</p>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="modal-btn modal-btn-primary"
                      onClick={() => setShowAchievementModal(false)}
                    >
                      Awesome!
                    </button>
                  </div>
                </div>
              </div>
            )}

          </>
        ) : (
          <div style={{ textAlign: "center", opacity: 1.0, padding: "10px" }}>
            <h2>Welcome to TypeVenture!</h2>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <img src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png" alt="TypeVenture Logo" style={{ width: "500px", height: "auto", objectFit: "cover" }} />
            </div>
            <p style={{ color: "black", textAlign: "justify", lineHeight: "2.0" }}>
              TypeVenture introduces a new, gamified way to learn typography—turning design theory into play-based discovery. It redefines how learners interact with fonts, letterforms, and layout principles by embedding them within interactive lessons and challenges. Rather than simply memorizing type rules, users engage with hands-on tasks that simulate real-world design decisions. Each module feels like a creative quest, where players earn rewards and progress through typographic mastery. The platform merges design fundamentals with the motivational aspects of gaming, such as leveling, scoring, and achievements. This encourages learners to consistently explore and improve while enjoying the process. Its interface is simple, clean, and user-centered, ensuring that learning remains visually pleasant and accessible. TypeVenture's color-coded navigation, responsive design, and animated drawer enhance usability and immersion. Beyond aesthetics, it emphasizes why typography matters—how type conveys mood, tone, and personality. It builds a bridge between creative intuition and design theory. Learners not only understand typography's visual rules but also its power as communication. The platform invites exploration, risk-taking, and self-paced learning. It positions typography as a living art form, one that evolves with the user's choices and imagination. Through gamification, TypeVenture transforms what could be a technical subject into an engaging, story-driven experience that nurtures design appreciation and skill growth simultaneously.
            </p>
            <p style={{ color: "black", textAlign: "justify", lineHeight: "2.0" }}>
              TypeVenture transforms typography into an adventure where users learn by playing. Each challenge feels like a mission to uncover design secrets. This gamified approach motivates consistent learning and curiosity. By earning achievements, users progress through lessons that mix theory and creativity, making typography exciting, interactive, and deeply rewarding.
            </p>
            <p style={{ color: "black", textAlign: "justify", lineHeight: "2.0" }}>
              The platform's core concept revolves around interactive exploration. Users experiment with fonts, hierarchy, and spacing within playful environments. Gamification elements like levels and badges enhance motivation. This encourages learners to practice continuously, reinforcing knowledge through fun, visually driven activities that merge education with creative problem-solving.
            </p>
            <p style={{ color: "black", textAlign: "justify", lineHeight: "2.0" }}>
              TypeVenture applies game logic to learning structure. Progression systems guide users from basic principles to advanced design techniques. Each success unlocks new challenges, sustaining engagement. The approach reframes typography not as rules but as discovery, encouraging experimentation and emotional connection to type as creative expression.
            </p>
            <p style={{ color: "black", textAlign: "justify", lineHeight: "2.0" }}>
              Gamified lessons make typography feel like storytelling. Users 'play' with type to express ideas, not just design layouts. The reward system fuels motivation, while interactive modules turn feedback into progress. This playful learning model builds confidence, blending technical understanding with enjoyment and visual exploration.
            </p>
          </div>
        )}
      </div>
    </div>
    </MainLayout>
  );
};

export default FrontPage