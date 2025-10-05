import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import "./FrontPage.css";

const LandingPage = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Fetch all lessons from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/lessons`)
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        if (data.length > 0) setSelectedLesson(data[0]); // default to first lesson
      })
      .catch((err) => console.error("Error fetching lessons:", err));
  }, []);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* === LEFT CONTAINER === */}
        <div className="w-full md:w-1/3 bg-base-200 p-6 overflow-y-auto border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-primary">Lessons</h2>
          <ul className="space-y-3">
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <li
                  key={lesson._id}
                  onClick={() => handleLessonClick(lesson)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedLesson && selectedLesson._id === lesson._id
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <h3 className="font-semibold">{lesson.title}</h3>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No lessons available</p>
            )}
          </ul>
        </div>

        {/* === RIGHT CONTAINER === */}
        <div className="w-full md:w-2/3 p-8 overflow-y-auto">
          {selectedLesson ? (
            <>
              <h1 className="text-4xl font-bold text-primary mb-4">
                {selectedLesson.title}
              </h1>
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {selectedLesson.content?.introduction}
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
                <p>{selectedLesson.content?.discussionOne}</p>
                <p>{selectedLesson.content?.discussionTwo}</p>
              </div>
              <button className="btn btn-primary mt-8">
                Continue to Game {selectedLesson.gameNumber}
              </button>
            </>
          ) : (
            <p className="text-gray-500">Select a lesson to view its contents.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
