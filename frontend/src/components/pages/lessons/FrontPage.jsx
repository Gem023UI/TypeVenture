import React, { useEffect, useState } from "react";
import { fetchAllLessons, fetchLessonById } from "../../../api/lessons";
import MainLayout from "../../layout/MainLayout";
import "./FrontPage.css";

const FrontPage = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <MainLayout>
    <div className="lesson-container">
      {/* ---------------- LEFT SECTION ---------------- */}
      <div className="container-one">
        <h2>Available Lessons</h2>

        {loading && <p>Loading lessons...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul className="lesson-items" style={{ listStyleType: "none", padding: 0 }}>
          {lessons.map((lesson) => (
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
                    ? "#ffffff" // clicked bg color
                    : "#5522ff", // default bg color
                color:
                  selectedLesson && selectedLesson._id === lesson._id
                    ? "#5522ff" // clicked text color
                    : "#ffffff", // default text color
                borderColor:
                  selectedLesson && selectedLesson._id === lesson._id
                    ? "#5522ff" // clicked border
                    : "#ffffff", // default border
                transition: "0.2s",
              }}
            >
              <strong>{lesson.title}</strong>
              <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                Category: {lesson.category}
              </p>
              <p style={{ margin: "5px 0", fontSize: "0.8rem", opacity: 0.8 }}>
                Difficulty: {lesson.difficultyRank}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <div className="container-two">
        {selectedLesson ? (
          <>
            <h2>{selectedLesson.title}</h2>
            <p>
              <strong>Category:</strong> {selectedLesson.category}
            </p>
            <p>
              <strong>Difficulty:</strong> {selectedLesson.difficultyRank}
            </p>

            <div className="lesson-content">
              <h3>Introduction</h3>
              <p>{selectedLesson.content?.introduction}</p>

              <h3>Discussion One</h3>
              <p>{selectedLesson.content?.discussionOne}</p>

              <h3>Discussion Two</h3>
              <p>{selectedLesson.content?.discussionTwo}</p>

              {selectedLesson.sourceUrl && (
                <p>
                  <a
                    href={selectedLesson.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color1)" }}
                  >
                    View Source
                  </a>
                </p>
              )}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", opacity: 0.8 }}>
            <h2>Select a Lesson</h2>
            <p>Click a lesson on the left to view details.</p>
          </div>
        )}
      </div>
    </div>
    </MainLayout>
  );
};

export default FrontPage;
