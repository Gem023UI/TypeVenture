import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./FrontPage.css";
import "./QuizModal.css";
import "./TypographyModal.css";

// Embedded Guest Quiz Data
const GUEST_QUIZ_DATA = {
  questions: [
    {
      question: "What is typography primarily concerned with?",
      options: [
        "The study of images",
        "The style, arrangement, and appearance of text",
        "The design of websites",
      ],
      answer: "The style, arrangement, and appearance of text",
    },
    {
      question: "What is a serif in typography?",
      options: [
        "The small line or stroke attached to the end of a letter's main strokes",
        "The thickness of a letter",
        "The spacing between lines",
      ],
      answer: "The small line or stroke attached to the end of a letter's main strokes",
    },
    {
      question: "What does 'sans serif' literally mean?",
      options: ["Without serifs", "With curves", "Simple font"],
      answer: "Without serifs",
    },
    {
      question: "What is kerning in typography?",
      options: [
        "The space between lines of text",
        "The space between individual letters",
        "The space around a paragraph",
      ],
      answer: "The space between individual letters",
    },
    {
      question: "What is leading in typography?",
      options: [
        "The vertical space between lines of text",
        "The horizontal spacing between words",
        "The font thickness",
      ],
      answer: "The vertical space between lines of text",
    },
  ],
};

// Embedded Guest Typography Challenges
const GUEST_TYPOGRAPHY_DATA = [
  {
    prompt: "Create a readable button label for a mobile interface",
    scenario: "button-label",
    displayText: "Get Started",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Typeface",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Roboto, sans-serif", "Arial, sans-serif", "Helvetica, sans-serif"],
          correctAnswer: "Roboto, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 16,
        acceptable: { min: 14, max: 18 },
        sliderRange: { min: 10, max: 24, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0.5,
        acceptable: { min: 0, max: 1 },
        sliderRange: { min: -2, max: 4, step: 0.1, unit: "px" }
      },
      {
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["left", "center", "right"],
          correctAnswer: "center",
        }
      }
    ],
    designContext: {
      readingDistance: "close",
      targetAudience: "general",
      purpose: "actionable"
    },
    difficulty: "beginner"
  },
  {
    prompt: "Design a headline for a blog article that stands out",
    scenario: "blog-headline",
    displayText: "The Future of Design",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Georgia, serif", "Times New Roman, serif", "Merriweather, serif"],
          correctAnswer: "Georgia, serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 32,
        acceptable: { min: 28, max: 36 },
        sliderRange: { min: 20, max: 48, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: -0.5,
        acceptable: { min: -1, max: 0 },
        sliderRange: { min: -3, max: 3, step: 0.1, unit: "px" }
      },
      {
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.2,
        acceptable: { min: 1.1, max: 1.3 },
        sliderRange: { min: 1.0, max: 2.0, step: 0.05, unit: "" }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "beginner"
  },
  {
    prompt: "Create readable body text for a mobile article",
    scenario: "mobile-body-text",
    displayText: "Typography is the art and technique of arranging type to make written language legible and appealing.",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Roboto, sans-serif", "Arial, sans-serif", "Open Sans, sans-serif"],
          correctAnswer: "Roboto, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 16,
        acceptable: { min: 14, max: 18 },
        sliderRange: { min: 12, max: 24, step: 1, unit: "px" }
      },
      {
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.6,
        acceptable: { min: 1.5, max: 1.7 },
        sliderRange: { min: 1.0, max: 2.5, step: 0.05, unit: "" }
      },
      {
        property: "wordSpacing",
        label: "Word Spacing",
        optimal: 0,
        acceptable: { min: -1, max: 1 },
        sliderRange: { min: -5, max: 10, step: 0.5, unit: "px" }
      },
      {
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["left", "center", "justify"],
          correctAnswer: "left",
        }
      }
    ],
    designContext: {
      readingDistance: "close",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "beginner"
  },
  {
    prompt: "Design a card title with subtext maintaining hierarchy",
    scenario: "card-title",
    displayText: "New Message\nYou have 3 unread notifications",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Roboto, sans-serif", "Helvetica, sans-serif", "Inter, sans-serif"],
          correctAnswer: "Roboto, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 20,
        acceptable: { min: 18, max: 24 },
        sliderRange: { min: 14, max: 32, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0,
        acceptable: { min: -0.5, max: 0.5 },
        sliderRange: { min: -2, max: 4, step: 0.1, unit: "px" }
      },
      {
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.4,
        acceptable: { min: 1.3, max: 1.5 },
        sliderRange: { min: 1.0, max: 2.0, step: 0.05, unit: "" }
      },
      {
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["#000000", "#1F2937", "#374151"],
          correctAnswer: "#000000",
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "intermediate"
  },
  {
    prompt: "Style a navigation menu item for optimal readability",
    scenario: "nav-menu",
    displayText: "Dashboard",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Inter, sans-serif", "Roboto, sans-serif", "Arial, sans-serif"],
          correctAnswer: "Inter, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 14,
        acceptable: { min: 13, max: 16 },
        sliderRange: { min: 10, max: 20, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0.5,
        acceptable: { min: 0, max: 1 },
        sliderRange: { min: -1, max: 3, step: 0.1, unit: "px" }
      },
      {
        property: "wordSpacing",
        label: "Word Spacing",
        optimal: 0,
        acceptable: { min: -1, max: 1 },
        sliderRange: { min: -5, max: 10, step: 0.5, unit: "px" }
      },
      {
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["left", "center", "right"],
          correctAnswer: "left",
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "professionals",
      purpose: "navigational"
    },
    difficulty: "intermediate"
  },
  {
    prompt: "Create a price tag that is clear and attention-grabbing",
    scenario: "price-tag",
    displayText: "$29.99",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Roboto, sans-serif", "Arial, sans-serif", "Helvetica, sans-serif"],
          correctAnswer: "Roboto, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 36,
        acceptable: { min: 32, max: 40 },
        sliderRange: { min: 24, max: 52, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: -1,
        acceptable: { min: -1.5, max: -0.5 },
        sliderRange: { min: -3, max: 2, step: 0.1, unit: "px" }
      },
      {
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["#000000", "#065F46", "#1E40AF"],
          correctAnswer: "#065F46",
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "actionable"
    },
    difficulty: "intermediate"
  },
  {
    prompt: "Design a testimonial quote with proper emphasis and readability",
    scenario: "testimonial",
    displayText: "This product changed my life!\nThe attention to detail is remarkable.",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Georgia, serif", "Merriweather, serif", "Playfair Display, serif"],
          correctAnswer: "Georgia, serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 18,
        acceptable: { min: 16, max: 20 },
        sliderRange: { min: 14, max: 28, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0.2,
        acceptable: { min: 0, max: 0.5 },
        sliderRange: { min: -2, max: 3, step: 0.1, unit: "px" }
      },
      {
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.7,
        acceptable: { min: 1.6, max: 1.8 },
        sliderRange: { min: 1.2, max: 2.5, step: 0.05, unit: "" }
      },
      {
        property: "wordSpacing",
        label: "Word Spacing",
        optimal: 1,
        acceptable: { min: 0, max: 2 },
        sliderRange: { min: -3, max: 8, step: 0.5, unit: "px" }
      },
      {
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["left", "center", "right"],
          correctAnswer: "center",
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "advanced"
  },
  {
    prompt: "Style a form label with input hint maintaining visual balance",
    scenario: "form-label",
    displayText: "Email Address\nWe'll never share your email with anyone",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Inter, sans-serif", "Roboto, sans-serif", "System UI, sans-serif"],
          correctAnswer: "Inter, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 14,
        acceptable: { min: 13, max: 16 },
        sliderRange: { min: 11, max: 20, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0.1,
        acceptable: { min: 0, max: 0.3 },
        sliderRange: { min: -1, max: 2, step: 0.1, unit: "px" }
      },
      {
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.5,
        acceptable: { min: 1.4, max: 1.6 },
        sliderRange: { min: 1.0, max: 2.2, step: 0.05, unit: "" }
      },
      {
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["#374151", "#4B5563", "#6B7280"],
          correctAnswer: "#374151",
        }
      },
      {
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["left", "center", "right"],
          correctAnswer: "left",
        }
      }
    ],
    designContext: {
      readingDistance: "close",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "advanced"
  },
  {
    prompt: "Create a warning message that demands attention while remaining readable",
    scenario: "warning-message",
    displayText: "WARNING: This action cannot be undone",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Roboto, sans-serif", "Arial Black, sans-serif", "Impact, sans-serif"],
          correctAnswer: "Roboto, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 16,
        acceptable: { min: 15, max: 18 },
        sliderRange: { min: 12, max: 24, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0.5,
        acceptable: { min: 0.3, max: 1 },
        sliderRange: { min: -1, max: 3, step: 0.1, unit: "px" }
      },
      {
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.3,
        acceptable: { min: 1.2, max: 1.4 },
        sliderRange: { min: 1.0, max: 2.0, step: 0.05, unit: "" }
      },
      {
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["#FF0000", "#FFA500", "#000000"],
          correctAnswer: "#FF0000",
        }
      },
      {
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["left", "center", "right"],
          correctAnswer: "center",
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "actionable"
    },
    difficulty: "advanced"
  },
  {
    prompt: "Design a footer copyright text with subtle styling",
    scenario: "footer-text",
    displayText: "© 2025 TypeVenture. All rights reserved.",
    adjustableProperties: [
      {
        property: "fontFamily",
        label: "Font Family",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["Roboto, sans-serif", "Arial, sans-serif", "Helvetica, sans-serif"],
          correctAnswer: "Roboto, sans-serif",
        }
      },
      {
        property: "fontSize",
        label: "Font Size",
        optimal: 12,
        acceptable: { min: 11, max: 14 },
        sliderRange: { min: 9, max: 18, step: 1, unit: "px" }
      },
      {
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0.3,
        acceptable: { min: 0, max: 0.5 },
        sliderRange: { min: -1, max: 2, step: 0.1, unit: "px" }
      },
      {
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.5,
        acceptable: { min: 1.4, max: 1.6 },
        sliderRange: { min: 1.0, max: 2.0, step: 0.05, unit: "" }
      },
      {
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["#6B7280", "#9CA3AF", "#4B5563"],
          correctAnswer: "#6B7280",
        }
      },
      {
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          options: ["left", "center", "right"],
          correctAnswer: "center",
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "advanced"
  }
];

const GuestGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameMode = searchParams.get('mode');

  // Quiz states
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Typography states
  const [typographyData, setTypographyData] = useState(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [typographySubmitted, setTypographySubmitted] = useState(false);
  const [typographyScores, setTypographyScores] = useState(null);
  const [typographyValues, setTypographyValues] = useState({});
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [challengeScores, setChallengeScores] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGameData();
    
    // Clear any existing guest scores on component mount
    localStorage.removeItem('guestQuizScore');
    localStorage.removeItem('guestTypographyScore');
  }, [gameMode]);

  const loadGameData = () => {
    setLoading(true);
    
    try {
      if (gameMode === 'quiz') {
        setQuizData(GUEST_QUIZ_DATA);
      } else if (gameMode === 'typography') {
        setTypographyData(GUEST_TYPOGRAPHY_DATA);
        
        const initial = {};
        GUEST_TYPOGRAPHY_DATA[0].adjustableProperties.forEach(prop => {
          if (prop.property === 'fontFamily' || prop.property === 'color' || prop.property === 'textAlign') {
            initial[prop.property] = prop.sliderRange.options?.[0] || '';
          } else {
            const mid = (prop.sliderRange.min + prop.sliderRange.max) / 2;
            initial[prop.property] = mid;
          }
        });
        setTypographyValues(initial);

        const fontProp = GUEST_TYPOGRAPHY_DATA[0].adjustableProperties.find(p => p.property === 'fontFamily');
        const colorProp = GUEST_TYPOGRAPHY_DATA[0].adjustableProperties.find(p => p.property === 'color');
        if (fontProp) setSelectedFont(fontProp.sliderRange.options?.[0] || '');
        if (colorProp) setSelectedColor(colorProp.sliderRange.options?.[0] || '');
      }
    } catch (error) {
      console.error('Error loading game data:', error);
      alert('An error occurred. Please try again.');
      navigate('/');
    }
    
    setLoading(false);
  };

  // Quiz Functions
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
      // Store final score in localStorage
      localStorage.setItem('guestQuizScore', score + (isCorrect ? 5 : 0));
    }
  };

  const handleCloseQuiz = () => {
    // Clear localStorage and navigate back
    localStorage.removeItem('guestQuizScore');
    navigate('/');
  };

  // Typography Functions
  const calculatePropertyScore = (property, userValue, propData) => {
    if (property === 'fontFamily' || property === 'color' || property === 'textAlign') {
      return userValue === propData.correctAnswer ? 100 : 0;
    }
    
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
    if (property === 'fontFamily' || property === 'color' || property === 'textAlign') {
      setTypographyValues(prev => ({
        ...prev,
        [property]: value
      }));
    } else {
      setTypographyValues(prev => ({
        ...prev,
        [property]: parseFloat(value)
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
        correctAnswer: prop.sliderRange.correctAnswer
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
  };

  const handleNextTypographyChallenge = () => {
    if (currentChallengeIndex < typographyData.length - 1) {
      const nextIndex = currentChallengeIndex + 1;
      setCurrentChallengeIndex(nextIndex);
      setTypographySubmitted(false);
      setTypographyScores(null);
      
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

      const fontProp = typographyData[nextIndex].adjustableProperties.find(p => p.property === 'fontFamily');
      const colorProp = typographyData[nextIndex].adjustableProperties.find(p => p.property === 'color');
      if (fontProp) setSelectedFont(fontProp.sliderRange.options?.[0] || '');
      if (colorProp) setSelectedColor(colorProp.sliderRange.options?.[0] || '');

    } else {
      const averageScore = Math.round(
        challengeScores.reduce((sum, score) => sum + score, 0) / challengeScores.length
      );
      
      // Store final score in localStorage
      localStorage.setItem('guestTypographyScore', averageScore);
      
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

    const fontProp = typographyData[currentChallengeIndex].adjustableProperties.find(p => p.property === 'fontFamily');
    const colorProp = typographyData[currentChallengeIndex].adjustableProperties.find(p => p.property === 'color');
    if (fontProp) setSelectedFont(fontProp.sliderRange.options?.[0] || '');
    if (colorProp) setSelectedColor(colorProp.sliderRange.options?.[0] || '');

    setTypographySubmitted(false);
    setTypographyScores(null);
  };

  const handleCloseTypography = () => {
    // Clear localStorage and navigate back
    localStorage.removeItem('guestTypographyScore');
    navigate('/');
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
      fontWeight: 'normal',
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

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
        color: '#825cff'
      }}>
        Loading game...
      </div>
    );
  }

  return (
    <div className="guest-container" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ 
            color: '#FFF', 
            fontFamily: 'Poppins',
            padding: '0px 40px'
        }}>
          Guest Mode - {gameMode === 'quiz' ? 'Quiz Game' : 'Typography Game'}
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem('guestQuizScore');
            localStorage.removeItem('guestTypographyScore');
            navigate('/');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: 'Poppins'
          }}
        >
          Back to Home
        </button>
      </div>

      {/* Quiz Game */}
      {gameMode === 'quiz' && quizData && (
        <div className="quiz-modal-overlay" style={{ position: 'relative', backgroundColor: 'transparent' }}>
          <div className="quiz-modal-content">
            {!quizCompleted ? (
              <>
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

                  {!isAnswerChecked && (
                    <button
                      className="quiz-check-btn"
                      onClick={handleCheckAnswer}
                      disabled={!selectedAnswer}
                    >
                      Check Answer
                    </button>
                  )}

                  {isAnswerChecked && (
                    <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect!'}
                    </div>
                  )}
                </div>

                <div className="quiz-options">
                  {quizData.questions[currentQuestionIndex].options.map((option, index) => {
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
                  Finish & Return Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Typography Game */}
      {gameMode === 'typography' && typographyData && (
        <div className="typography-modal-overlay" style={{ position: 'relative', backgroundColor: 'transparent' }}>
          <div className="typography-modal-content">
            <div className="typography-left">
              <h2>TYPOGRAPHY GAME</h2>
              <div className="typography-game-container">
                <div className="typography-preview-section">
                  <div 
                    className="typography-preview-box"
                    style={{ backgroundColor: '#F8FAFC' }}
                  >
                    <div style={getTypographyTextStyle()}>
                      {typographyData[currentChallengeIndex].displayText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="typography-right">
              <div className="typography-challenge-info">
                <p className="typography-prompt">
                  Challenge {currentChallengeIndex + 1}: {typographyData[currentChallengeIndex].prompt}
                </p>
                <div className="typography-context">
                  <span>Distance: {typographyData[currentChallengeIndex].designContext.readingDistance}</span>
                  <span>Purpose: {typographyData[currentChallengeIndex].designContext.purpose}</span>
                  <span>Difficulty: {typographyData[currentChallengeIndex].difficulty}</span>
                </div>
              </div>

              <div className="typography-controls-section">
                <h3>Typography Controls</h3>
                <div className="typography-sliders">
                  {typographyData[currentChallengeIndex].adjustableProperties.map((prop) => (
                    <div key={prop.property} className="typography-slider-group">
                      {prop.property === 'fontFamily' ? (
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
                            {prop.sliderRange?.options?.map((color) => (
                              <option key={color} value={color}>
                                {color === '#000000' ? 'Black' : 
                                color === '#FFFFFF' ? 'White' :
                                color === '#FF0000' ? 'Red' :
                                color === '#FFA500' ? 'Orange' :
                                color === '#FFFF00' ? 'Yellow' :
                                color === '#1E40AF' ? 'Blue' :
                                color === '#065F46' ? 'Green' :
                                color === '#374151' ? 'Dark Gray' :
                                color === '#4B5563' ? 'Medium Gray' :
                                color === '#6B7280' ? 'Gray' :
                                color === '#9CA3AF' ? 'Light Gray' :
                                color === '#1F2937' ? 'Darker Gray' : color}
                              </option>
                            ))}
                          </select>
                        </>
                      ) : prop.property === 'textAlign' ? (
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
                              {prop.isCorrect ? '✓ Correct (100/100)' : '✗ Incorrect (0/100)'}
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
                      Next Challenge ({currentChallengeIndex + 1}/{typographyData.length})
                    </button>
                  ) : (
                    <button
                      className="typography-btn typography-btn-close"
                      onClick={handleCloseTypography}
                    >
                      Complete & Return Home
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestGame;