import React, { useEffect, useState } from "react";
import { getLeaderboardWithDetails } from "../../api/scores";
import { getUserById } from "../../api/user";
import { getUserAchievements } from "../../api/achievements";
import MainLayout from "../layout/MainLayout";
import TiltedCard from "../bins/media/TiltedCard";
import "./Leaderboards.css";

const TrophyIcon = ({ rank }) => {
  const svgs = {
    1: (
      <svg height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ marginRight: '8px' }}>
        <path fill="#ffbb00" d="M497.679,53.348c-9.285-10.52-22.496-16.551-36.246-16.551h-47.01c-2.358-33.432-25.059-28.785-33.9-28.785 c-9.33,0-124.522,0-124.522,0s-115.191,0-124.521,0c-8.842,0-31.547-4.646-33.904,28.785h-47.01 c-13.748,0-26.959,6.033-36.246,16.551C3.064,66.1-1.793,84.503,0.594,105.255c0.442,9.219,5.098,56.574,54.09,90.256 c24.898,17.117,48.828,25.844,70.598,30.285c4.771,1.031,9.598,1.957,14.545,2.68c0.068,0.076,0.135,0.154,0.205,0.229 c101.859,107.191,89.42,45.18,89.42,143.435c0,38.092-52.771,25.762-52.771,55c0,29.236-41.129,5.174-37.322,39.863 c2.332,21.264,65.318,37.205,116.644,37.205c51.322,0,114.312-15.942,116.644-37.205c3.805-34.689-37.326-10.627-37.326-39.863 c0-29.238-52.768-16.908-52.768-55c0-98.256-12.44-36.244,89.42-143.435c0.14-0.149,0.27-0.307,0.41-0.457 c25.365-3.285,54.457-11.779,84.938-32.736c48.988-33.682,53.644-81.037,54.086-90.256 C513.794,84.503,508.935,66.098,497.679,53.348z M471.214,101.165l-0.184,0.992l0.025,1.353 c-0.096,2.625-2.006,34.916-36.621,58.715c-9.467,6.51-18.627,11.444-27.535,15.276c-2.014,0.816-4.024,1.633-6.084,2.344 c12.162-34.25,14.137-72.558,14.172-102.654h46.445c1.558,0,3.857,0.502,5.965,2.888C470.99,84.149,472.382,91.833,471.214,101.165 z M227.514,204.143c-3.805,4.799-9.436,7.299-15.117,7.299c-4.198,0-8.424-1.363-11.967-4.174 c-48.381-38.371-52.434-91.045-52.434-137.404c0-10.646,8.633-19.277,19.279-19.277c10.646,0,19.277,8.631,19.277,19.277 c0,40.676,2.895,79.482,37.836,107.195C232.73,183.676,234.129,195.802,227.514,204.143z M77.566,162.225 c-34.584-23.777-36.524-56.029-36.623-58.707l0.022-0.92l-0.18-1.434c-1.168-9.33,0.224-17.016,3.818-21.086 c2.108-2.386,4.406-2.888,5.963-2.888h46.445c0.031,25.693,1.533,57.357,9.52,87.386c1.332,5.178,2.808,10.326,4.543,15.385 C100.31,175.89,89.16,170.196,77.566,162.225z"/>
      </svg>
    ),
    2: (
      <svg height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ marginRight: '8px' }}>
        <path fill="#a3a3a3" d="M497.679,53.348c-9.285-10.52-22.496-16.551-36.246-16.551h-47.01c-2.358-33.432-25.059-28.785-33.9-28.785 c-9.33,0-124.522,0-124.522,0s-115.191,0-124.521,0c-8.842,0-31.547-4.646-33.904,28.785h-47.01 c-13.748,0-26.959,6.033-36.246,16.551C3.064,66.1-1.793,84.503,0.594,105.255c0.442,9.219,5.098,56.574,54.09,90.256 c24.898,17.117,48.828,25.844,70.598,30.285c4.771,1.031,9.598,1.957,14.545,2.68c0.068,0.076,0.135,0.154,0.205,0.229 c101.859,107.191,89.42,45.18,89.42,143.435c0,38.092-52.771,25.762-52.771,55c0,29.236-41.129,5.174-37.322,39.863 c2.332,21.264,65.318,37.205,116.644,37.205c51.322,0,114.312-15.942,116.644-37.205c3.805-34.689-37.326-10.627-37.326-39.863 c0-29.238-52.768-16.908-52.768-55c0-98.256-12.44-36.244,89.42-143.435c0.14-0.149,0.27-0.307,0.41-0.457 c25.365-3.285,54.457-11.779,84.938-32.736c48.988-33.682,53.644-81.037,54.086-90.256 C513.794,84.503,508.935,66.098,497.679,53.348z M471.214,101.165l-0.184,0.992l0.025,1.353 c-0.096,2.625-2.006,34.916-36.621,58.715c-9.467,6.51-18.627,11.444-27.535,15.276c-2.014,0.816-4.024,1.633-6.084,2.344 c12.162-34.25,14.137-72.558,14.172-102.654h46.445c1.558,0,3.857,0.502,5.965,2.888C470.99,84.149,472.382,91.833,471.214,101.165 z M227.514,204.143c-3.805,4.799-9.436,7.299-15.117,7.299c-4.198,0-8.424-1.363-11.967-4.174 c-48.381-38.371-52.434-91.045-52.434-137.404c0-10.646,8.633-19.277,19.279-19.277c10.646,0,19.277,8.631,19.277,19.277 c0,40.676,2.895,79.482,37.836,107.195C232.73,183.676,234.129,195.802,227.514,204.143z M77.566,162.225 c-34.584-23.777-36.524-56.029-36.623-58.707l0.022-0.92l-0.18-1.434c-1.168-9.33,0.224-17.016,3.818-21.086 c2.108-2.386,4.406-2.888,5.963-2.888h46.445c0.031,25.693,1.533,57.357,9.52,87.386c1.332,5.178,2.808,10.326,4.543,15.385 C100.31,175.89,89.16,170.196,77.566,162.225z"/>
      </svg>
    ),
    3: (
      <svg height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ marginRight: '8px' }}>
        <path fill="#cc6300" d="M497.679,53.348c-9.285-10.52-22.496-16.551-36.246-16.551h-47.01c-2.358-33.432-25.059-28.785-33.9-28.785 c-9.33,0-124.522,0-124.522,0s-115.191,0-124.521,0c-8.842,0-31.547-4.646-33.904,28.785h-47.01 c-13.748,0-26.959,6.033-36.246,16.551C3.064,66.1-1.793,84.503,0.594,105.255c0.442,9.219,5.098,56.574,54.09,90.256 c24.898,17.117,48.828,25.844,70.598,30.285c4.771,1.031,9.598,1.957,14.545,2.68c0.068,0.076,0.135,0.154,0.205,0.229 c101.859,107.191,89.42,45.18,89.42,143.435c0,38.092-52.771,25.762-52.771,55c0,29.236-41.129,5.174-37.322,39.863 c2.332,21.264,65.318,37.205,116.644,37.205c51.322,0,114.312-15.942,116.644-37.205c3.805-34.689-37.326-10.627-37.326-39.863 c0-29.238-52.768-16.908-52.768-55c0-98.256-12.44-36.244,89.42-143.435c0.14-0.149,0.27-0.307,0.41-0.457 c25.365-3.285,54.457-11.779,84.938-32.736c48.988-33.682,53.644-81.037,54.086-90.256 C513.794,84.503,508.935,66.098,497.679,53.348z M471.214,101.165l-0.184,0.992l0.025,1.353 c-0.096,2.625-2.006,34.916-36.621,58.715c-9.467,6.51-18.627,11.444-27.535,15.276c-2.014,0.816-4.024,1.633-6.084,2.344 c12.162-34.25,14.137-72.558,14.172-102.654h46.445c1.558,0,3.857,0.502,5.965,2.888C470.99,84.149,472.382,91.833,471.214,101.165 z M227.514,204.143c-3.805,4.799-9.436,7.299-15.117,7.299c-4.198,0-8.424-1.363-11.967-4.174 c-48.381-38.371-52.434-91.045-52.434-137.404c0-10.646,8.633-19.277,19.279-19.277c10.646,0,19.277,8.631,19.277,19.277 c0,40.676,2.895,79.482,37.836,107.195C232.73,183.676,234.129,195.802,227.514,204.143z M77.566,162.225 c-34.584-23.777-36.524-56.029-36.623-58.707l0.022-0.92l-0.18-1.434c-1.168-9.33,0.224-17.016,3.818-21.086 c2.108-2.386,4.406-2.888,5.963-2.888h46.445c0.031,25.693,1.533,57.357,9.52,87.386c1.332,5.178,2.808,10.326,4.543,15.385 C100.31,175.89,89.16,170.196,77.566,162.225z"/>
      </svg>
    )
  };
  
  return svgs[rank] || <span style={{ marginRight: '8px' }}>#{rank}</span>;
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
  const [selectedUserAchievements, setSelectedUserAchievements] = useState([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setLoading(true);
        
        const quizData = await getLeaderboardWithDetails("quiz");
        if (quizData.success) {
          setQuizLeaderboard(quizData.data);
        }
        
        const typographyData = await getLeaderboardWithDetails("typography");
        if (typographyData.success) {
          setTypographyLeaderboard(typographyData.data);
        }
        
        const totalData = await getLeaderboardWithDetails();
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
      
      // Backend returns { user: {...} } directly
      if (response.user) {
        const userData = {
          _id: response.user._id,
          username: response.user.username,
          email: response.user.email,
          profileImage: response.user.profilePicture,
          fullName: response.user.username,
          bio: response.user.hobbies?.join(", ") || "No bio available",
          createdAt: response.user.createdAt
        };
        console.log("✅ User data loaded:", userData);
        setSelectedUser(userData);
        
        // ✅ ADD THIS: Fetch user achievements
        const achievementsResponse = await getUserAchievements(userId);
        if (achievementsResponse.success) {
          setSelectedUserAchievements(achievementsResponse.data);
          console.log("✅ User achievements loaded:", achievementsResponse.data);
        } else {
          setSelectedUserAchievements([]);
          console.log("⚠️ No achievements found for user");
        }
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
    setSelectedUserAchievements([]);
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
            rotateAmplitude={20}
            scaleOnHover={1.1}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            /* overlayContent={
            <div className="tilted-card-overlay">
            <div className="trophy-crown">
                <svg height="48px" width="48px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="#ffbb00" d="M497.679,53.348c-9.285-10.52-22.496-16.551-36.246-16.551h-47.01c-2.358-33.432-25.059-28.785-33.9-28.785 c-9.33,0-124.522,0-124.522,0s-115.191,0-124.521,0c-8.842,0-31.547-4.646-33.904,28.785h-47.01 c-13.748,0-26.959,6.033-36.246,16.551C3.064,66.1-1.793,84.503,0.594,105.255c0.442,9.219,5.098,56.574,54.09,90.256 c24.898,17.117,48.828,25.844,70.598,30.285c4.771,1.031,9.598,1.957,14.545,2.68c0.068,0.076,0.135,0.154,0.205,0.229 c101.859,107.191,89.42,45.18,89.42,143.435c0,38.092-52.771,25.762-52.771,55c0,29.236-41.129,5.174-37.322,39.863 c2.332,21.264,65.318,37.205,116.644,37.205c51.322,0,114.312-15.942,116.644-37.205c3.805-34.689-37.326-10.627-37.326-39.863 c0-29.238-52.768-16.908-52.768-55c0-98.256-12.44-36.244,89.42-143.435c0.14-0.149,0.27-0.307,0.41-0.457 c25.365-3.285,54.457-11.779,84.938-32.736c48.988-33.682,53.644-81.037,54.086-90.256 C513.794,84.503,508.935,66.098,497.679,53.348z M471.214,101.165l-0.184,0.992l0.025,1.353 c-0.096,2.625-2.006,34.916-36.621,58.715c-9.467,6.51-18.627,11.444-27.535,15.276c-2.014,0.816-4.024,1.633-6.084,2.344 c12.162-34.25,14.137-72.558,14.172-102.654h46.445c1.558,0,3.857,0.502,5.965,2.888C470.99,84.149,472.382,91.833,471.214,101.165 z M227.514,204.143c-3.805,4.799-9.436,7.299-15.117,7.299c-4.198,0-8.424-1.363-11.967-4.174 c-48.381-38.371-52.434-91.045-52.434-137.404c0-10.646,8.633-19.277,19.279-19.277c10.646,0,19.277,8.631,19.277,19.277 c0,40.676,2.895,79.482,37.836,107.195C232.73,183.676,234.129,195.802,227.514,204.143z M77.566,162.225 c-34.584-23.777-36.524-56.029-36.623-58.707l0.022-0.92l-0.18-1.434c-1.168-9.33,0.224-17.016,3.818-21.086 c2.108-2.386,4.406-2.888,5.963-2.888h46.445c0.031,25.693,1.533,57.357,9.52,87.386c1.332,5.178,2.808,10.326,4.543,15.385 C100.31,175.89,89.16,170.196,77.566,162.225z"/>
                </svg>
            </div>
            <h3 className="tilted-username">{topPlayer.username}</h3>
            <p className="tilted-score">{topPlayer.totalScore} pts</p>
            </div>
            } */
        />
        </div>
    );
  };

 const renderLeaderboardList = (data, startRank = 1) => {
    if (!data || data.length === 0) {
        return <div className="no-more-data">No players yet</div>;
    }

    return (
        <div className="leaderboard-list">
        {data.map((entry, index) => {
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
              <div className="column-header quizzes-header">
                <h2>Quiz Masters</h2>
              </div>
              {renderTopPlayer(quizLeaderboard, "Quiz")}
              <div className="scrollable-list">
                {renderLeaderboardList(quizLeaderboard)}
              </div>
            </div>

            {/* Total Leaderboard */}
            <div className="overall-leaderboard-column">
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

              {loadingProfile ? (
                <div className="modal-loading">Loading profile...</div>
              ) : selectedUser ? (
                <>
                  <div className="profile-modal-container">
                    <div className="profile-modal-header">
                      <img 
                        src={selectedUser.profileImage || "https://via.placeholder.com/150"} 
                        alt={selectedUser.username}
                        className="profile-modal-image"
                      />
                    </div>

                    <div className="profile-modal-body">
                      <div className="profile-info-section">
                        <div className="profile-info-grid">
                          <div className="info-item">
                            <span className="info-username">{selectedUser.username || "Not provided"}</span>
                            <span className="info-value">{selectedUser.email || "Not provided"}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Hobbies:</span>
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
                    </div>
                  </div>

                  <div className="profile-achievements">
                    {selectedUserAchievements && selectedUserAchievements.length > 0 && (
                      <div className="profile-achievements-section">
                        <h3>A C H I E V E M E N T S</h3>
                        <div className="achievements-grid-modal">
                          {selectedUserAchievements.map((achievement) => (
                            <div key={achievement._id} className="achievement-card-modal">
                              <img 
                                src={achievement.imageUrl} 
                                alt={`${achievement.tier} medal`}
                                className="achievement-badge-modal"
                              />
                              <p className="achievement-lesson-title-modal">{achievement.lessonTitle}</p>
                              <span className={`achievement-tier-label-modal ${achievement.tier}`}>
                                {achievement.tier.toUpperCase()} -  {achievement.score} PTS!
                              </span>
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