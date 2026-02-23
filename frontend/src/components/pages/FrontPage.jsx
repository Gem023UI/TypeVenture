import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchAllLessons, fetchLessonById, markLessonComplete } from "../../api/lessons";
import MainLayout from "../layout/MainLayout";
import "./FrontPage.css";

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
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const hasUserCompleted = (lesson) => {
    const userId = localStorage.getItem("userId");
    if (!lesson || !lesson.usersDone) return false;
    
    return lesson.usersDone.some(entry => 
      entry.userId === userId || entry.userId.toString() === userId
    );
  };
  
  const isLessonUnlocked = (lessonIndex) => {
    if (lessonIndex === 0) return true;
    
    const reversedLessons = [...lessons].reverse();
    const previousLesson = reversedLessons[lessonIndex - 1];
    
    return hasUserCompleted(previousLesson);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePrevImage = () => {
    if (selectedLesson && selectedLesson.imageUrls) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedLesson.imageUrls.length - 1 : prev - 1
      );
    }
  };
  
  const handleNextImage = () => {
    if (selectedLesson && selectedLesson.imageUrls) {
      setCurrentImageIndex((prev) => 
        prev === selectedLesson.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const handleLessonComplete = async () => {
    try {
      const response = await markLessonComplete(selectedLesson._id);
      
      // Refresh lessons to update completion status
      await fetchLessons();
      
      // Check if there's a next lesson from the response
      const nextLesson = response.nextLesson;
      
      if (nextLesson) {
        Swal.fire({
          icon: 'success',
          title: 'Lesson Complete! 🎉',
          html: `
            <p>Congratulations! You've completed this lesson.</p>
            <p style="margin-top: 15px; font-size: 14px; color: #666;">📧 We've sent you an email with details about your next lesson:</p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #0029FF;">
              <p style="font-weight: 600; color: #0029FF; margin: 0;">${nextLesson.title}</p>
              <p style="font-size: 14px; color: #666; margin: 10px 0 0 0;">${nextLesson.description}</p>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Continue to Next Lesson',
          cancelButtonText: 'Stay Here',
          confirmButtonColor: '#0029FF',
          cancelButtonColor: '#6c757d',
        }).then((result) => {
          if (result.isConfirmed) {
            // Find the next lesson in the current lessons array
            const reversedLessons = [...lessons].reverse();
            const currentIndex = reversedLessons.findIndex(l => l._id === selectedLesson._id);
            const nextLessonObj = reversedLessons[currentIndex + 1];
            if (nextLessonObj) {
              handleLessonClick(nextLessonObj);
            }
          }
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'All Lessons Complete! 🎊',
          html: `
            <p style="font-size: 18px; font-weight: 600; color: #0029FF; margin: 20px 0;">Congratulations!</p>
            <p>You've completed all available lessons!</p>
            <p style="margin-top: 15px; font-size: 14px; color: #666;">📧 Check your email for a summary of your achievement.</p>
          `,
          confirmButtonText: 'Awesome!',
          confirmButtonColor: '#0029FF',
        });
      }
      
      setShowCompleteModal(false);
    } catch (error) {
      console.error("Error completing lesson:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to mark lesson as complete. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d9534f',
      });
    }
  };

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const data = await fetchAllLessons();
      setLessons(data);
    } catch (err) {
      if (err.status === 403 && err.isVerified === false) {
        Swal.fire({
          icon: 'warning',
          title: 'Email Verification Required',
          text: err.message || 'Proceed to the Profile Page to verify your email.',
          confirmButtonText: 'OK'
        });
        setError("Proceed to the Profile Page to verify your email.");
      } else {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = async (lesson) => {
    try {
      setLoading(true);
      const data = await fetchLessonById(lesson._id);
      setSelectedLesson(data);
      setCurrentImageIndex(0);
      setError("");
    } catch (err) {
      if (err.status === 403 && err.isVerified === false) {
        Swal.fire({
          icon: 'warning',
          title: 'Email Verification Required',
          text: err.message || 'Proceed to the Profile Page to verify your email.',
          confirmButtonText: 'OK'
        });
        setError("Proceed to the Profile Page to verify your email.");
      } else {
        console.error("Error fetching lesson:", err);
        setError("Failed to load lesson. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <MainLayout>
      <div className="lesson-container">
        {/* LEFT COLUMN - Lesson List */}
        <div className={`container-one ${!isSidebarOpen ? 'closed' : ''}`}>
          <div className="container-one-header">
            <h2 onClick={toggleSidebar} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'flex-start' : 'center' }}>
              <ListIcon />
              <span style={{ marginLeft: '8px', display: isSidebarOpen ? 'inline' : 'none' }}>Lessons</span>
            </h2>
          </div>
  
          {loading && !selectedLesson ? (
            <p className="status-text">Loading lessons...</p>
          ) : error && lessons.length === 0 ? (
            <p className="status-text error">{error}</p>
          ) : (
            <ul className="lesson-list">
              {[...lessons].reverse().map((lesson, index) => {
                const isUnlocked = isLessonUnlocked(index);
                const isCompleted = hasUserCompleted(lesson);
                
                return (
                  <li
                    key={lesson._id}
                    className={`lesson-items ${
                      selectedLesson?._id === lesson._id ? "selected" : ""
                    }`}
                    onClick={() => isUnlocked && handleLessonClick(lesson)}
                    style={{
                      opacity: isUnlocked ? 1 : 0.5,
                      cursor: isUnlocked ? "pointer" : "not-allowed",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      backgroundColor: isCompleted 
                        ? 'rgba(0, 41, 255, 0.1)' 
                        : selectedLesson?._id === lesson._id 
                          ? 'var(--color1)' 
                          : 'transparent'
                    }}
                  >
                    {isSidebarOpen ? (
                      <>
                        <div style={{ flex: 1 }}>
                          <strong style={{ display: 'block', marginBottom: '4px' }}>
                            {lesson.title}
                          </strong>
                          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>
                            {lesson.content.description}
                          </p>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                          {isCompleted ? <CheckIcon /> : !isUnlocked ? <LockIcon /> : null}
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {isCompleted ? <CheckIcon /> : !isUnlocked ? <LockIcon /> : <ListIcon />}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
  
        {/* RIGHT COLUMN - Lesson Content */}
        <div className="container-two">
          {loading && selectedLesson ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>Loading lesson content...</p>
            </div>
          ) : selectedLesson ? (
            <>
              <h2>{selectedLesson.title}</h2>
              <h7>Source: <a href={selectedLesson.sourceUrl} target="_blank" rel="noopener noreferrer">{selectedLesson.sourceUrl}</a></h7>
  
              <div className="lesson-content">
                {/* YouTube Video */}
                {selectedLesson.youtubeUrl && (
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="450"
                      src={selectedLesson.youtubeUrl}
                      title="Lesson Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
  
                <h3>Introduction</h3>
                <p>{selectedLesson.content.introduction}</p>
  
                {/* Image Slideshow */}
                {selectedLesson.imageUrls && selectedLesson.imageUrls.length > 0 && (
                  <div className="image-slideshow">
                    <div className="slideshow-container">
                      <button 
                        className="slideshow-btn prev-btn" 
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      
                      <img 
                        src={selectedLesson.imageUrls[currentImageIndex]} 
                        alt={`Lesson visual ${currentImageIndex + 1}`}
                        className="slideshow-image"
                      />
                      
                      <button 
                        className="slideshow-btn next-btn" 
                        onClick={handleNextImage}
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </div>
                    
                    <div className="slideshow-indicators">
                      {selectedLesson.imageUrls.map((_, idx) => (
                        <span
                          key={idx}
                          className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(idx)}
                        />
                      ))}
                    </div>
                  </div>
                )}
  
                {/* Dynamic Discussion Sections */}
                {['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'].map((num, index) => {
                  const headerKey = `header${num}`;
                  const discussionKey = `discussion${num}`;
                  
                  // Only render if both header and discussion exist
                  if (selectedLesson.content[headerKey] && selectedLesson.content[discussionKey]) {
                    return (
                      <div key={index}>
                        <h3>{selectedLesson.content[headerKey]}</h3>
                        <p>{selectedLesson.content[discussionKey]}</p>
                      </div>
                    );
                  }
                  return null;
                })}
  
                {/* Lesson Complete Button */}
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                  {hasUserCompleted(selectedLesson) ? (
                    <button
                      style={{
                        padding: '15px 40px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        backgroundColor: '#0029FF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'default',
                        opacity: 0.7
                      }}
                      disabled
                    >
                      ✓ Lesson Cleared!
                    </button>
                  ) : (
                    <button
                      style={{
                        padding: '15px 40px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #ff1414, purple, #0029ff)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onClick={handleLessonComplete}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
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