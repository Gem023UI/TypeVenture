import React, { useEffect, useState, useRef } from "react";
import * as Chart from 'chart.js';
import { getUserById, editProfile, deleteAccount, verifyEmail, getCompletedLessons } from "../../api/user"
import { fetchUserScores } from "../../api/games";
import MainLayout from "../layout/MainLayout";
import Lanyard from '../bins/media/Lanyard';
import { sendVerificationCode } from '../../api/emailVerify';
import Swal from 'sweetalert2';
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [canResend, setCanResend] = useState(false);

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
          setIsVerified(response.user.isVerified || false);
          localStorage.setItem('isVerified', response.user.isVerified || false);

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
  
        const completed = data
          .filter(lesson =>
            lesson.usersDone.some(entry => entry.userId === userId)
          )
          .map(lesson => {
            const userEntry = lesson.usersDone.find(entry => entry.userId === userId);
            return {
              _id: lesson._id,
              title: lesson.title,
              completedAt: userEntry.completedAt
            };
          })
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  
        setCompletedLessons(completed);
      } catch (err) {
        console.error("Error fetching completed lessons:", err);
      }
    };
  
    fetchCompletedLessons();
  }, []);

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

  useEffect(() => {
    if (timeLeft > 0 && showVerificationModal) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, showVerificationModal]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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
      await deleteAccount({ username: deleteUsername, password: deletePassword });
      
      Swal.fire({
        title: 'Account Deleted',
        text: 'Your account has been permanently deleted.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        localStorage.clear();
        window.location.href = '/login';
      });
    } catch (err) {
      setDeleteError(err || "Failed to delete account");
      setDeleteLoading(false);
    }
  };

  const handleSendVerificationCode = async () => {
    try {
      setCodeLoading(true);
      await sendVerificationCode();
      setShowVerificationModal(true);
      setTimeLeft(900);
      setCanResend(false);
      setVerificationCode("");
      
      Swal.fire({
        title: 'Code Sent!',
        text: 'A verification code has been sent to your email.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message || 'Failed to send verification code',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setCodeLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setCodeLoading(true);
  
    try {
      const userId = localStorage.getItem("userId");
      const response = await verifyEmail(verificationCode, userId);
  
      if (response.success) {
        setIsVerified(true);
        localStorage.setItem('isVerified', 'true');
        setShowVerificationModal(false);
        
        Swal.fire({
          title: 'Email Verified!',
          text: 'Your email has been successfully verified.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Verification Failed',
        text: err || 'Invalid or expired code',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setCodeLoading(false);
    }
  };

  const handleResendCode = async () => {
    await handleSendVerificationCode();
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
                Delete Account
              </button>
              {!isVerified && (
                <button className="verify-email-btn" onClick={handleSendVerificationCode}>
                  Verify Email
                </button>
              )}
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
          {completedLessons.length > 0 ? (
            <div className="lessons-list">
              {completedLessons.map((lesson) => (
                <div key={lesson._id} className="lesson-item">
                  <div className="lesson-icon">✓</div>
                  <div className="lesson-info">
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <p className="lesson-date">
                      Completed {new Date(lesson.completedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
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
                <h2 style={{ color: "#dc3545", marginBottom: "20px" }}>Delete Account</h2>
                
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
                    {deleteLoading ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showVerificationModal && (
          <div className="edit-modal-overlay" onClick={() => setShowVerificationModal(false)}>
            <div className="edit-modal-content verification-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "450px" }}>
              <button className="modal-close-btn" onClick={() => setShowVerificationModal(false)}>
                ×
              </button>

              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
                  📧 Verify Your Email
                </h2>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <form onSubmit={handleVerifyEmail}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength="6"
                    required
                    disabled={codeLoading}
                    style={{
                      width: '100%',
                      maxWidth: '250px',
                      padding: '20px',
                      fontSize: '32px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      letterSpacing: '10px',
                      border: '2px solid #ddd',
                      borderRadius: '10px',
                      outline: 'none',
                      fontFamily: 'Courier New, monospace',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0029FF'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>

                <div style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                  {timeLeft > 0 ? (
                    <span>
                      Code expires in: <strong style={{ color: '#0029FF' }}>{formatTime(timeLeft)}</strong>
                    </span>
                  ) : (
                    <span style={{ color: '#FF1414', fontWeight: 600 }}>Code expired</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={codeLoading || verificationCode.length !== 6 || timeLeft === 0}
                  style={{
                    width: '100%',
                    padding: '12px 30px',
                    background: 'linear-gradient(135deg, #0029FF, #000000, #FF1414)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: (codeLoading || verificationCode.length !== 6 || timeLeft === 0) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '10px',
                    fontFamily: 'Poppins',
                    opacity: (codeLoading || verificationCode.length !== 6 || timeLeft === 0) ? 0.6 : 1,
                  }}
                >
                  {codeLoading ? 'Verifying...' : 'Verify Email'}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={codeLoading || !canResend}
                  style={{
                    width: '100%',
                    padding: '12px 30px',
                    background: 'transparent',
                    color: '#0029FF',
                    border: '2px solid #0029FF',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: (codeLoading || !canResend) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'Poppins',
                    opacity: (codeLoading || !canResend) ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!codeLoading && canResend) {
                      e.target.style.background = '#0029FF';
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#0029FF';
                  }}
                >
                  {canResend ? 'Resend Code' : `Resend available in ${formatTime(timeLeft)}`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;