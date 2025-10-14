import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../api/scores";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import "./Leaderboards.css";

const TrophyIcon = ({ rank }) => {
  const colors = {
    1: "#FFD700", // Gold
    2: "#C0C0C0", // Silver
    3: "#CD7F32"  // Bronze
  };
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill={colors[rank] || "#6B7280"} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '24px', height: '24px', marginRight: '8px' }}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
};

const Leaderboard = () => {
  const [quizLeaderboard, setQuizLeaderboard] = useState([]);
  const [totalLeaderboard, setTotalLeaderboard] = useState([]);
  const [typographyLeaderboard, setTypographyLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setLoading(true);
        
        // Fetch quiz leaderboard
        const quizData = await getLeaderboard("quiz");
        if (quizData.success) {
          setQuizLeaderboard(quizData.data);
        }
        
        // Fetch total (combined) leaderboard
        const totalData = await getLeaderboard();
        if (totalData.success) {
          setTotalLeaderboard(totalData.data);
        }
        
        // Fetch typography leaderboard
        const typographyData = await getLeaderboard("typography");
        if (typographyData.success) {
          setTypographyLeaderboard(typographyData.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboards:", err);
        setError("Failed to load leaderboards");
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const renderLeaderboardTable = (data, title) => (
    <div className="leaderboard-column">
      <h2 className="leaderboard-title">{title}</h2>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <span className="rank-header">Rank</span>
          <span className="user-header">User</span>
          <span className="score-header">Score</span>
          <span className="games-header">Games</span>
        </div>
        <div className="leaderboard-body">
          {data.length === 0 ? (
            <div className="no-data">No data available</div>
          ) : (
            data.map((entry, index) => (
              <div 
                key={entry._id} 
                className={`leaderboard-row ${index < 3 ? 'top-three' : ''}`}
              >
                <div className="rank-cell">
                  {index < 3 ? <TrophyIcon rank={index + 1} /> : `#${index + 1}`}
                </div>
                <div 
                  className="user-cell"
                  onClick={() => handleUserClick(entry._id)}
                >
                  {entry.username || "Unknown User"}
                </div>
                <div className="score-cell">{entry.totalScore}</div>
                <div className="games-cell">{entry.gamesPlayed}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="leaderboard-container">
        <div className="leaderboard-header-section">
          <h1>Leaderboards</h1>
          <p>Compete with other designers and climb to the top!</p>
        </div>

        {loading ? (
          <div className="loading-message">Loading leaderboards...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="leaderboard-grid">
            {renderLeaderboardTable(quizLeaderboard, "Quiz Masters")}
            {renderLeaderboardTable(totalLeaderboard, "Overall Champions")}
            {renderLeaderboardTable(typographyLeaderboard, "Typography Experts")}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Leaderboard;