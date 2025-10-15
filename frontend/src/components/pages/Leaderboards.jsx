import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../api/scores";
import { getUserById } from "../../api/user";
import MainLayout from "../layout/MainLayout";
import TiltedCard from "../bins/media/TiltedCard";
import "./Leaderboards.css";

const TrophyIcon = ({ rank }) => {
  const colors = {
    1: "#FFD700",
    2: "#C0C0C0", 
    3: "#CD7F32"
  };
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill={colors[rank] || "#6B7280"} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '20px', height: '20px', marginRight: '8px' }}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
};

const Leaderboard = () => {
  const [quizLeaderboard, setQuizLeaderboard] = useState([]);
  const [typographyLeaderboard, setTypographyLeaderboard] = useState([]);
  const [totalLeaderboard, setTotalLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setLoading(true);
        
        const quizData = await getLeaderboard("quiz");
        if (quizData.success) {
          setQuizLeaderboard(quizData.data);
        }
        
        const typographyData = await getLeaderboard("typography");
        if (typographyData.success) {
          setTypographyLeaderboard(typographyData.data);
        }
        
        const totalData = await getLeaderboard();
        if (totalData.success) {
          setTotalLeaderboard(totalData.data);
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

  const handleUserClick = async (userId) => {
    try {
        console.log("🔍 Fetching user with ID:", userId);
        setLoadingProfile(true);
        setShowProfileModal(true);
        
        const response = await getUserById(userId);
        console.log("📦 Full user response:", response);
        
        if (response.success && response.data) {
        console.log("✅ User data loaded:", response.data);
        setSelectedUser(response.data);
        } else {
        console.error("❌ Failed to load user:", response);
        setSelectedUser(null);
        alert("Failed to load user profile");
        }
        
        setLoadingProfile(false);
    } catch (err) {
        console.error("❌ Error fetching user profile:", err);
        setLoadingProfile(false);
        alert("Failed to load user profile");
    }
    };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setSelectedUser(null);
  };

  const renderTopPlayer = (data, title) => {
    if (!data || data.length === 0) {
        return (
        <div className="top-player-empty">
            <p>No champion yet!</p>
        </div>
        );
    }

    const topPlayer = data[0];
    console.log(`🏆 ${title} Top player:`, topPlayer); // ✅ Debug log
    
    const profileImage = topPlayer.profileImage || "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759649430/user_icon_ze74ys.jpg";
    console.log(`🖼️ ${title} Profile image:`, profileImage); // ✅ Debug log

    return (
        <div className="top-player-section">
        <h3 className="top-player-label">{title} Champion</h3>
        <TiltedCard
            imageSrc={profileImage}
            altText={`${topPlayer.username}'s profile`}
            captionText={topPlayer.username}
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.1}
            showMobileWarning={false}
            showTooltip={false}
        />
        </div>
    );
    };

  const renderLeaderboardList = (data, startRank = 2) => {
    if (!data || data.length <= 1) {
        return <div className="no-more-data">No other players yet</div>;
    }

    const displayData = data.slice(1);

    return (
        <div className="leaderboard-list">
        {displayData.map((entry, index) => {
            const rank = startRank + index;
            return (
            <a
                key={entry._id}
                className={`leaderboard-item ${rank <= 3 ? 'top-three' : ''}`}
                onClick={(e) => {
                e.preventDefault();
                handleUserClick(entry._id);
                }}
                href="#"
            >
                <div className="item-rank">
                {rank <= 3 ? <TrophyIcon rank={rank} /> : `#${rank}`}
                </div>
                <div className="item-user">{entry.username || "Unknown User"}</div>
                <div className="item-score">{entry.totalScore} pts</div>
                <div className="item-games">{entry.gamesPlayed} games</div>
            </a>
            );
        })}
        </div>
    );
    };

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
            {/* Quiz Leaderboard */}
            <div className="leaderboard-column">
              <div className="column-header quiz-header">
                <h2>Quiz Masters</h2>
              </div>
              {renderTopPlayer(quizLeaderboard, "Quiz")}
              <div className="scrollable-list">
                {renderLeaderboardList(quizLeaderboard)}
              </div>
            </div>

            {/* Total Leaderboard */}
            <div className="leaderboard-column">
              <div className="column-header total-header">
                <h2>Overall Champions</h2>
              </div>
              {renderTopPlayer(totalLeaderboard, "Overall")}
              <div className="scrollable-list">
                {renderLeaderboardList(totalLeaderboard)}
              </div>
            </div>

            {/* Typography Leaderboard */}
            <div className="leaderboard-column">
              <div className="column-header typography-header">
                <h2>Typography Experts</h2>
              </div>
              {renderTopPlayer(typographyLeaderboard, "Typography")}
              <div className="scrollable-list">
                {renderLeaderboardList(typographyLeaderboard)}
              </div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="profile-modal-overlay" onClick={closeProfileModal}>
            <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeProfileModal}>
                ×
              </button>

              {loadingProfile ? (
                <div className="modal-loading">Loading profile...</div>
              ) : selectedUser ? (
                <>
                  <div className="profile-modal-header">
                    <img 
                      src={selectedUser.profileImage || "https://via.placeholder.com/150"} 
                      alt={selectedUser.username}
                      className="profile-modal-image"
                    />
                    <h2>{selectedUser.username}</h2>
                    <p className="profile-email">{selectedUser.email}</p>
                  </div>

                  <div className="profile-modal-body">
                    <div className="profile-info-section">
                      <h3>Profile Information</h3>
                      <div className="profile-info-grid">
                        <div className="info-item">
                          <span className="info-label">Full Name:</span>
                          <span className="info-value">{selectedUser.fullName || "Not provided"}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Bio:</span>
                          <span className="info-value">{selectedUser.bio || "No bio available"}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Member Since:</span>
                          <span className="info-value">
                            {selectedUser.createdAt 
                              ? new Date(selectedUser.createdAt).toLocaleDateString()
                              : "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedUser.achievements && selectedUser.achievements.length > 0 && (
                      <div className="profile-achievements-section">
                        <h3>Achievements</h3>
                        <div className="achievements-list">
                          {selectedUser.achievements.map((achievement, idx) => (
                            <div key={idx} className="achievement-badge">
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="modal-error">Failed to load user profile</div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Leaderboard;