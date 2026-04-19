import React, { useEffect, useState, useRef } from "react";
import * as Chart from 'chart.js';
import { getUserById, editProfile, deleteAccount, verifyEmail, getCompletedLessons, getQuizScores } from "../../api/user"
import { fetchUserScores } from "../../api/games";
import Swal from 'sweetalert2';
import MainLayout from "../layout/MainLayout";
import Lanyard from '../bins/media/Lanyard';
import Loader from "../layout/Loader";
import "./Profile.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [dateJoined, setDateJoined] = useState("");
  
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editHobbies, setEditHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [achievements, setAchievements] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [scoresLoading, setScoresLoading] = useState(true);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const lessonChartRef = useRef(null);
  const lessonChartInstance = useRef(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [lessonQuiz, setLessonQuiz] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("❌ No userId found in localStorage");
          return;
        }

        const response = await getUserById(userId);

        if (response.user) {
          setUsername(response.user.username);
          setEmail(response.user.email);
          setHobbies(response.user.hobbies || []);
          setLessonQuiz(response.user.lessonQuiz || []);

          if (response.user.createdAt) {
            const date = new Date(response.user.createdAt);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            setDateJoined(formattedDate);
          } else {
            console.warn("⚠️ No createdAt found in user data");
            setDateJoined("Unknown");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAchievementsAndScores = async () => {
      try {
        const scores = await fetchUserScores();
        
        const achievementsData = scores
          .filter(score => score.achievement && score.achievement !== 'none')
          .map(score => ({
            gameTitle: score.gameTitle,
            achievement: score.achievement,
            score: score.score,
            achievementUrl: score.achievementUrl,
            completedAt: score.completedAt
          }));
        
        setAchievements(achievementsData);

        const sortedScores = scores.sort(
          (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
        );

        const formattedScores = sortedScores.map((score, index) => ({
          index: index + 1,
          gameTitle: score.gameTitle,
          score: score.score,
          date: new Date(score.completedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }),
          fullDate: new Date(score.completedAt)
        }));

        setAllScores(formattedScores);
      } catch (err) {
        console.error("Error fetching achievements and scores:", err);
      } finally {
        setScoresLoading(false);
      }
    };

    fetchAchievementsAndScores();
  }, []);

  useEffect(() => {
    const fetchCompletedLessons = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const data = await getCompletedLessons();

        const quizScores = lessonQuiz;

        const completed = data
          .filter(lesson =>
            lesson.usersDone.some(entry => entry.userId?.toString() === userId)
          )
          .map(lesson => {
            const userEntry = lesson.usersDone.find(entry => entry.userId?.toString() === userId);
            const quizRecord = quizScores.find(q => q.lessonTitle?.trim().toLowerCase() === lesson.title?.trim().toLowerCase());
            return {
              _id:         lesson._id,
              title:       lesson.title,
              completedAt: userEntry.completedAt,
              // score earned (raw points from submitQuizScore)
              lessonScore: quizRecord?.lessonScore ?? null,
              // total quiz items in this lesson
              totalItems:  lesson.quiz?.length ?? 0,
              passed:      quizRecord?.lessonCompleted ?? false,
            };
          })
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

        setCompletedLessons(completed);
      } catch (err) {
        console.error("Error fetching completed lessons:", err);
      }
    };

    fetchCompletedLessons();
  }, [lessonQuiz]);

  useEffect(() => {
    Chart.Chart.register(
      Chart.LineController,
      Chart.LineElement,
      Chart.PointElement,
      Chart.LinearScale,
      Chart.CategoryScale,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend,
      Chart.Filler
    );

    if (allScores.length > 0 && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: allScores.map(s => s.date),
          datasets: [{
            label: 'Score',
            data: allScores.map(s => s.score),
            borderColor: '#FF1414',
            backgroundColor: 'rgba(255, 20, 20, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#FF1414',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#FFFFFF',
                font: { family: 'Poppins', size: 14 }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#FFFFFF',
              bodyColor: '#FFFFFF',
              borderColor: '#FF1414',
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                title: (context) => allScores[context[0].dataIndex].gameTitle,
                label: (context) => `Score: ${context.parsed.y}%`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                color: '#FFFFFF',
                font: { family: 'Poppins' },
                callback: (value) => value + '%'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            x: {
              ticks: {
                color: '#FFFFFF',
                font: { family: 'Poppins' }
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [allScores]);

  // ── Lesson quiz score bar chart ──────────────────────────────
  useEffect(() => {
    Chart.Chart.register(
      Chart.BarController,
      Chart.BarElement,
      Chart.LinearScale,
      Chart.CategoryScale,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend
    );

    const lessonsWithScores = completedLessons.filter(l => l.lessonScore !== null);

    if (lessonsWithScores.length > 0 && lessonChartRef.current) {
      if (lessonChartInstance.current) {
        lessonChartInstance.current.destroy();
      }

      // Reverse so oldest lesson appears first (left to right)
      const ordered = [...lessonsWithScores].reverse();

      const ctx = lessonChartRef.current.getContext('2d');
      lessonChartInstance.current = new Chart.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ordered.map(l => l.title.length > 18 ? l.title.slice(0, 18) + '…' : l.title),
          datasets: [{
            label: 'Quiz Score (pts)',
            data: ordered.map(l => l.lessonScore),
            backgroundColor: ordered.map(l =>
              l.passed
                ? 'rgba(162, 0, 255, 0.6)'
                : 'rgba(255, 20, 20, 0.5)'
            ),
            borderColor: ordered.map(l =>
              l.passed ? '#a200ff' : '#FF1414'
            ),
            borderWidth: 2,
            borderRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.85)',
              titleColor: '#FFFFFF',
              bodyColor: '#FFFFFF',
              borderColor: '#a200ff',
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                title: (context) => ordered[context[0].dataIndex].title,
                label: (context) => {
                  const l = ordered[context[0].dataIndex];
                  const status = l.passed ? '✓ Passed' : '✗ Failed';
                  return [`Score: ${context.parsed.y} pts`, status];
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#FFFFFF',
                font: { family: 'Poppins' },
              },
              grid: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
              ticks: {
                color: '#FFFFFF',
                font: { family: 'Poppins', size: 11 },
                maxRotation: 35,
                minRotation: 20,
              },
              grid: { color: 'rgba(255,255,255,0.06)' }
            }
          }
        }
      });
    }

    return () => {
      if (lessonChartInstance.current) {
        lessonChartInstance.current.destroy();
      }
    };
  }, [completedLessons]);

  const handleEditProfile = () => {
    setEditUsername(username);
    setEditEmail(email);
    setEditHobbies([...hobbies]);
    setPreviewUrl("");
    setSelectedFile(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowEditModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addHobby = () => {
    if (hobbyInput.trim() && !editHobbies.includes(hobbyInput.trim())) {
      setEditHobbies([...editHobbies, hobbyInput.trim()]);
      setHobbyInput("");
    }
  };

  const removeHobby = (hobbyToRemove) => {
    setEditHobbies(editHobbies.filter((hobby) => hobby !== hobbyToRemove));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", editUsername);
      formData.append("email", editEmail);
      formData.append("hobbies", JSON.stringify(editHobbies));

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      if (currentPassword && newPassword) {
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }

      const response = await editProfile(formData);
      setMessage("Profile updated successfully!");
      setUsername(editUsername);
      setEmail(editEmail);
      setHobbies(editHobbies);
      
      setTimeout(() => {
        setShowEditModal(false);
        setMessage("");
      }, 2000);
    } catch (err) {
      setError(err || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    setDeleteError("");
  
    if (deleteUsername !== username) {
      setDeleteError("Username doesn't match");
      setDeleteLoading(false);
      return;
    }
  
    try {
      const userId = localStorage.getItem("userId");
      await deleteAccount({ userId, username: deleteUsername, password: deletePassword });
  
      Swal.fire({
        title: 'Account Deactivated',
        text: 'Your account has been deactivated.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        localStorage.clear();
        window.location.href = '/login';
      });
    } catch (err) {
      setDeleteError(err || "Failed to deactivate account");
      setDeleteLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-details-section">
            <h2>Hello!</h2>
            <div className="detail-username">
              <p>{username}</p>
            </div>

            <div className="detail-info">
              <div className="detail-group detail-email">
                <h2>Email</h2>
                <p>{email}</p>
              </div>

              <div className="detail-group detail-date">
                <h2>Date Joined</h2>
                <p>{dateJoined}</p>
              </div>
            </div>

            <div className="detail-group">
              <h2>Hobbies</h2>
              {hobbies && hobbies.length > 0 ? (
                <div className="hobbies-display">
                  {hobbies.map((hobby, index) => (
                    <span key={index} className="hobby-tag-display">
                      {hobby}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="no-hobbies">No hobbies added yet</p>
              )}
            </div>

            <div className="profile-buttons">
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
              <button className="delete-profile-btn" onClick={() => setShowDeleteModal(true)}>
                Deactivate Account
              </button>
            </div>
          </div>

          <div className="lanyard-section">
            <Lanyard username={username} email={email} />
          </div>
        </div>

        <div className="achievements-section">
          <div className="achievements-container">
            <h2>ACHIEVEMENTS</h2>
            {achievements.length > 0 ? (
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    {achievement.achievementUrl && (
                      <img src={achievement.achievementUrl} alt={`${achievement.achievement} trophy`} />
                    )}
                    <div className="achievement-lesson-title">{achievement.gameTitle}</div>
                    <span className={`achievement-tier-label ${achievement.achievement}`}>
                      {achievement.achievement}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-achievements">No achievements yet. Play games to earn achievements!</p>
            )}
          </div>
        </div>

        <div className="progress-score-section">
          <h2>SCORE HISTORY</h2>
          <div className="progress-charts">
            {scoresLoading ? (
              <div className="chart-loading">Loading score history...</div>
            ) : allScores.length > 0 ? (
              <div className="chart-container">
                <canvas ref={chartRef}></canvas>
              </div>
            ) : (
              <p className="no-scores">No game scores yet. Start playing to track your progress!</p>
            )}
          </div>
        </div>

        <div className="lessons-section">
          <h2>COMPLETED LESSONS</h2>

          {/* ── Lesson quiz score bar chart ── */}
          {completedLessons.filter(l => l.lessonScore !== null).length > 0 && (
            <div className="lesson-chart-container">
              <p className="lesson-chart-label">Quiz Score History</p>
              <div className="lesson-chart-wrap">
                <canvas ref={lessonChartRef} />
              </div>
              <div className="lesson-chart-legend">
                <span className="lc-legend-dot passed" /> Passed &nbsp;
                <span className="lc-legend-dot failed" /> Failed
              </div>
            </div>
          )}

          {completedLessons.length > 0 ? (
            <div className="lessons-list">
              {completedLessons.map((lesson) => (
                <div key={lesson._id} className="lesson-item">
                  <div className={`lesson-icon ${lesson.passed ? 'passed' : lesson.lessonScore !== null ? 'failed' : ''}`}>
                    {lesson.passed ? '✓' : lesson.lessonScore !== null ? '✗' : '✓'}
                  </div>
                  <div className="lesson-info">
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <div className="lesson-meta-row">
                      {lesson.lessonScore !== null ? (
                        <span className={`lesson-score-badge ${lesson.passed ? 'passed' : 'failed'}`}>
                          {lesson.lessonScore} pts{lesson.totalItems > 0 && ` · ${lesson.totalItems} items`}
                        </span>
                      ) : (
                        <span className="lesson-score-badge no-quiz">No quiz taken</span>
                      )}
                      <p className="lesson-date">
                        Completed {new Date(lesson.completedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-lessons">No completed lessons yet. Start learning!</p>
          )}
        </div>

        {showEditModal && (
          <div className="edit-modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>
                ×
              </button>

              <form onSubmit={handleSubmitEdit}>
                <h2>Edit Profile</h2>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <div className="form-content">
                  <div className="form-picture">
                    <img
                      src={previewUrl || "/default-avatar.png"}
                      alt="Profile Preview"
                      className="profile-preview"
                    />
                    <label htmlFor="avatar-upload" className="custom-insert-button">
                      Upload Picture
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="form-details">
                    <div className="form-username-email">
                      <div className="form-username">
                        <label>Username:</label>
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-email">
                        <label>Email:</label>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="password-section">
                      <h3>Change Password (Optional)</h3>
                      <div className="password-field">
                        <div className="form-password">
                          <label>Current Password:</label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                          />
                        </div>
                      </div>

                      <div className="password-field">
                        <div className="form-password">
                          <label>New Password:</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>

                      <div className="password-field">
                        <div className="form-password">
                          <label>Confirm New Password:</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-hobbies">
                      <label>Hobbies:</label>
                      <div className="hobby-input-group">
                        <input
                          type="text"
                          value={hobbyInput}
                          onChange={(e) => setHobbyInput(e.target.value)}
                          placeholder="Add a hobby"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
                        />
                        <button type="button" onClick={addHobby}>
                          Add
                        </button>
                      </div>

                      {editHobbies.length > 0 && (
                        <div className="hobbies-list">
                          {editHobbies.map((hobby, index) => (
                            <div key={index} className="hobby-tag">
                              {hobby}
                              <button type="button" onClick={() => removeHobby(hobby)}>
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="done-btn" disabled={loading}>
                      {loading ? "Updating..." : "Update Profile"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="edit-modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="edit-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "400px" }}>
              <button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}>
                ×
              </button>

              <form onSubmit={handleDeleteAccount}>
                <h2 style={{ color: "#dc3545", marginBottom: "20px" }}>Deactivate Account</h2>
                
                {deleteError && <div className="error-message">{deleteError}</div>}
                
                <p style={{ marginBottom: "20px", color: "#666", textAlign: "center" }}>
                  This action cannot be undone. Please enter your username and password to confirm.
                </p>

                <div style={{ marginBottom: "15px" }}>
                  <label>Username: </label>
                  <input 
                    type="text" 
                    value={deleteUsername}
                    onChange={(e) => setDeleteUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div style={{ marginBottom: "30px" }}>
                  <label>Password:  </label>
                  <input 
                    type="password" 
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontFamily: "Poppins",
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={deleteLoading}
                    style={{
                      flex: 1,
                      padding: "10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      fontFamily: "Poppins",
                      cursor: deleteLoading ? "not-allowed" : "pointer",
                      opacity: deleteLoading ? 0.6 : 1
                    }}
                  >
                    {deleteLoading ? "Deactivate..." : "Deactivate Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;