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
        <h2>LESSONS</h2>
        <p>Complete the lessons to earn badges!</p>

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
                <p style={{ margin: "5px 0", fontSize: "12px" }}>
                  {lesson.content?.description}
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

            <div className="lesson-content">
              <h3>Description</h3>
              <p>{selectedLesson.content?.description}</p>

              <h3>Introduction</h3>
              <p>{selectedLesson.content?.introduction}</p>

              <h3>Discussion One</h3>
              <p>{selectedLesson.content?.discussionOne}</p>

              <h3>Discussion Two</h3>
              <p>{selectedLesson.content?.discussionTwo}</p>

              <h3>Discussion Three</h3>
              <p>{selectedLesson.content?.discussionThree}</p>

              <h3>Discussion Four</h3>
              <p>{selectedLesson.content?.discussionFour}</p>

              <h3>Discussion Five</h3>
              <p>{selectedLesson.content?.discussionFive}</p>

              {selectedLesson.sourceUrl}
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