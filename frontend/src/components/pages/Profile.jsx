import React, { useEffect, useState, useRef } from "react";
import * as Chart from 'chart.js';
import { getScoresByUserId } from "../../api/scores";
import { getUserById, editProfile, deleteAccount } from "../../api/user";
import { getUserAchievements } from "../../api/achievements";
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

  const [allScores, setAllScores] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [typographyScores, setTypographyScores] = useState([]);
  const [scoresLoading, setScoresLoading] = useState(true);

  const allChartRef = useRef(null);
  const quizChartRef = useRef(null);
  const typographyChartRef = useRef(null);
  const allChartInstance = useRef(null);
  const quizChartInstance = useRef(null);
  const typographyChartInstance = useRef(null);

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

          // ✅ Format "Date Joined" properly
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
    const fetchAchievements = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("❌ No userId found in localStorage");
          return;
        }

        const response = await getUserAchievements(userId);

        if (response.success) {
          setAchievements(response.data);
          console.log("Achievements loaded:", response.data);
        }
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await getScoresByUserId(userId);

        if (response.success && response.data) {
          const sortedScores = response.data.sort(
            (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
          );

          const formattedAll = sortedScores.map((score, index) => ({
            index: index + 1,
            score: score.score,
            date: new Date(score.completedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })
          }));

          const quizData = sortedScores
            .filter(score => score.gameType === 'quiz')
            .map((score, index) => ({
              index: index + 1,
              score: score.score,
              date: new Date(score.completedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }));

          const typographyData = sortedScores
            .filter(score => score.gameType === 'typography')
            .map((score, index) => ({
              index: index + 1,
              score: score.score,
              date: new Date(score.completedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }));

          setAllScores(formattedAll);
          setQuizScores(quizData);
          setTypographyScores(typographyData);
        }
      } catch (err) {
        console.error("Error fetching scores:", err);
      } finally {
        setScoresLoading(false);
      }
    };

    fetchScores();
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

    // Create All Scores Chart
    if (allScores.length > 0 && allChartRef.current) {
      if (allChartInstance.current) {
        allChartInstance.current.destroy();
      }

      const ctx = allChartRef.current.getContext('2d');
      allChartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: allScores.map(s => s.date),
          datasets: [{
            label: 'Score',
            data: allScores.map(s => s.score),
            borderColor: '#8884d8',
            backgroundColor: 'rgba(136, 132, 216, 0.6)',
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'Score: ' + context.parsed.y;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Score'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          }
        }
      });
    }

    // Create Quiz Chart
    if (quizScores.length > 0 && quizChartRef.current) {
      if (quizChartInstance.current) {
        quizChartInstance.current.destroy();
      }

      const ctx = quizChartRef.current.getContext('2d');
      quizChartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: quizScores.map(s => s.date),
          datasets: [{
            label: 'Quiz Score',
            data: quizScores.map(s => s.score),
            borderColor: '#82ca9d',
            backgroundColor: 'rgba(130, 202, 157, 0.6)',
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'Score: ' + context.parsed.y;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Score'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          }
        }
      });
    }

    // Create Typography Chart
    if (typographyScores.length > 0 && typographyChartRef.current) {
      if (typographyChartInstance.current) {
        typographyChartInstance.current.destroy();
      }

      const ctx = typographyChartRef.current.getContext('2d');
      typographyChartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: typographyScores.map(s => s.date),
          datasets: [{
            label: 'Typography Score',
            data: typographyScores.map(s => s.score),
            borderColor: '#ffc658',
            backgroundColor: 'rgba(255, 198, 88, 0.6)',
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'Score: ' + context.parsed.y;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Score'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (allChartInstance.current) allChartInstance.current.destroy();
      if (quizChartInstance.current) quizChartInstance.current.destroy();
      if (typographyChartInstance.current) typographyChartInstance.current.destroy();
    };
  }, [allScores, quizScores, typographyScores]);

  useEffect(() => {
    const verified = localStorage.getItem('isVerified') === 'true';
    setIsVerified(verified);
  }, []);

  useEffect(() => {
    const verified = localStorage.getItem('isVerified') === 'true';
    setIsVerified(verified);
  }, []);

  useEffect(() => {
    if (!showVerificationModal) return;
  
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [showVerificationModal]);

  const handleOpenEditModal = () => {
    // Pre-fill modal with current data
    setEditUsername(username);
    setEditEmail(email);
    setEditHobbies([...hobbies]);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSelectedFile(null);
    setPreviewUrl(localStorage.getItem("profilePicture") || "");
    setMessage("");
    setError("");
    setShowEditModal(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendVerificationCode = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await sendVerificationCode(userId);
      
      Swal.fire({
        icon: 'success',
        title: 'Verification Code Sent!',
        text: 'Please check your email for the verification code',
        timer: 2000,
        showConfirmButton: false,
      });
      
      setShowVerificationModal(true);
      setTimeLeft(900);
      setCanResend(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Code',
        text: error || 'Please try again',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setCodeLoading(true);
  
    try {
      const { verifyEmailCode } = await import('../../api/emailVerify');
      const userId = localStorage.getItem('userId');
      await verifyEmailCode(userId, verificationCode);
  
      Swal.fire({
        icon: 'success',
        title: 'Email Verified!',
        text: 'Your email has been verified successfully. You can now access all lessons and games!',
        timer: 3000,
        showConfirmButton: false,
      });
  
      setIsVerified(true);
      localStorage.setItem('isVerified', 'true');
      setVerificationCode('');
      setShowVerificationModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: error || 'Invalid or expired code',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setCodeLoading(false);
    }
  };

  const handleResendCode = async () => {
    setCodeLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      await sendVerificationCode(userId);
  
      Swal.fire({
        icon: 'success',
        title: 'Code Resent!',
        text: 'A new verification code has been sent to your email',
        timer: 2000,
        showConfirmButton: false,
      });
  
      setTimeLeft(900);
      setCanResend(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Resend Failed',
        text: error || 'Failed to resend code',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setCodeLoading(false);
    }
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

  const handleAddHobby = () => {
    if (hobbyInput.trim() && !editHobbies.includes(hobbyInput.trim())) {
      setEditHobbies([...editHobbies, hobbyInput.trim()]);
      setHobbyInput("");
    }
  };

  const handleRemoveHobby = (hobbyToRemove) => {
    setEditHobbies(editHobbies.filter(hobby => hobby !== hobbyToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Validate password if attempting to change
      if (newPassword || confirmPassword) {
        if (!currentPassword) {
          setError("Current password is required to change password");
          setLoading(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          setError("New passwords do not match");
          setLoading(false);
          return;
        }
      }

      const formData = new FormData();
      formData.append("username", editUsername);
      formData.append("email", editEmail);
      
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }
      
      if (currentPassword && newPassword) {
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }
      
      formData.append("hobbies", JSON.stringify(editHobbies));

      const response = await editProfile(formData);
      
      // Update sessionStorage
      if (response.user.profilePicture) {
        localStorage.setItem("profilePicture", response.user.profilePicture);
        window.dispatchEvent(new Event('profilePictureUpdated'));
      }
      if (response.user.hobbies) {
        localStorage.setItem("hobbies", JSON.stringify(response.user.hobbies));
        setHobbies(response.user.hobbies);
      }
      
      // Update displayed username and email
      setUsername(editUsername);
      setEmail(editEmail);

      setMessage("Profile updated successfully!");
      
      // Wait 1.5 seconds to show success message, then close modal
      setTimeout(() => {
        setShowEditModal(false);
      }, 1500);
      
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    setDeleteError("");

    try {
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        setDeleteError("User session not found");
        setDeleteLoading(false);
        return;
      }

      const response = await deleteAccount({
        userId,
        username: deleteUsername,
        password: deletePassword
      });

      if (response.success) {
        // Clear all localStorage data
        localStorage.clear();
        
        // Redirect to login or home page
        window.location.href = "/login"; // Change this to your login route
      }
    } catch (err) {
      setDeleteError(err.toString());
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    localStorage.setItem('isVerified', 'true');
  };

  return (
    <MainLayout>
      <div className="profile-section">
        <div className="profile-container">
          {/* Profile Details Section */}
          <div className="profile-details-section">
            <h2>Profile Details</h2>
            
            <div className="detail-username">
              <p>{username}</p>
            </div>

            <div className="detail-email">
              <p>{email}</p>
            </div>

            <div className="detail-date">
              <label>Date Joined: </label>
              <p>{dateJoined}</p>
            </div>

            <div className="detail-group">
              <div className="hobbies-display">
                {hobbies.length > 0 ? (
                  hobbies.map((hobby, index) => (
                    <span key={index} className="hobby-tag-display">
                      {hobby}
                    </span>
                  ))
                ) : (
                  <p className="no-hobbies">No hobbies added yet</p>
                )}
              </div>
            </div>
            <div className="profile-buttons">
              <button 
                className="edit-profile-btn"
                onClick={handleOpenEditModal}
              >
                Edit Profile
              </button>
              <button 
                className="delete-profile-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </button>
              {!isVerified && (
              <button 
                onClick={handleSendVerificationCode}
                className="verify-email-btn"
              >
                Verify Email
              </button>
              )}
            </div>
          </div>

          {/* Lanyard Section */}
          <div className="lanyard-section">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>

        {/* Achievements Section */}
        <div className="achievements-section">
          <h2>A C H I E V E M E N T S</h2>
          <div className="achievements-container">
            {achievements.length > 0 ? (
              <div className="achievements-grid">
                {achievements.map((achievement) => (
                  <div key={achievement._id} className="achievement-card">
                    <img 
                      src={achievement.imageUrl} 
                      alt={`${achievement.tier} medal`}
                      className="achievement-badge"
                    />
                    <p className="achievement-lesson-title">{achievement.lessonTitle}</p>
                    <span className={`achievement-tier-label ${achievement.tier}`}>
                      {achievement.tier.toUpperCase()} - {achievement.score} PTS!
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-achievements">No achievements yet. Complete lessons to earn badges!</p>
            )}
          </div>
        </div>

        {/* Score Progress Section */}
        <div className="progress-section">
          <h2>S C O R E   P R O G R E S S</h2>
          
          {scoresLoading ? (
            <p className="no-achievements">Loading score history...</p>
          ) : (
            <>
              {/* Overall History Chart */}
              <div className="progress-charts" style={{ marginBottom: '60px' }}>
                <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>
                  Overall Score History
                </h3>
                {allScores.length > 0 ? (
                  <div style={{ width: '100%', height: '300px' }}>
                    <canvas ref={allChartRef}></canvas>
                  </div>
                ) : (
                  <p className="no-achievements">No scores recorded yet.</p>
                )}
              </div>

              {/* Quiz History Chart */}
              <div className="progress-charts" style={{ marginBottom: '60px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>
                  Quiz Score History
                </h3>
                {quizScores.length > 0 ? (
                  <div style={{ width: '100%', height: '300px' }}>
                    <canvas ref={quizChartRef}></canvas>
                  </div>
                ) : (
                  <p className="no-achievements">No quiz scores recorded yet.</p>
                )}
              </div>

              {/* Typography History Chart */}
              <div className="progress-charts" style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>
                  Typography Score History
                </h3>
                {typographyScores.length > 0 ? (
                  <div style={{ width: '100%', height: '300px' }}>
                    <canvas ref={typographyChartRef}></canvas>
                  </div>
                ) : (
                  <p className="no-achievements">No typography scores recorded yet.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div 
            className="edit-modal-overlay"
            onClick={() => setShowEditModal(false)}
          >
            <div 
              className="edit-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>

              <form onSubmit={handleSubmit}>
                <div className="form-content">
                  <div className="form-picture">
                    {message && <div className="success-message">{message}</div>}
                    {error && <div className="error-message">{error}</div>}
                    <label>Profile Picture</label>
                    
                    {previewUrl && (
                      <img 
                        src={previewUrl} 
                        alt="Profile Preview" 
                        className="profile-preview"
                      />
                    )}

                    {/* Hidden file input */}
                    <input 
                      id="profileInput"
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }} // hide the default input
                    />

                    {/* Styled label acting as the button */}
                    <label htmlFor="profileInput" className="custom-insert-button">
                      Insert Profile Picture
                    </label>
                  </div>

                  <div className="form-details">
                    <h2>Edit Profile</h2>
                      <div className="form-username-email">
                        {/* Username */}
                        <div className="form-username">
                          <label>Username</label>
                          <input 
                            type="text" 
                            value={editUsername} 
                            onChange={(e) => setEditUsername(e.target.value)}
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="form-email">
                          <label>Email</label>
                          <input 
                            type="email" 
                            value={editEmail} 
                            onChange={(e) => setEditEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      {/* Hobbies */}
                      <div className="form-hobbies">
                        <label>Hobbies</label>
                        <div className="hobby-input-group">
                          <input 
                            type="text" 
                            value={hobbyInput}
                            onChange={(e) => setHobbyInput(e.target.value)}
                            placeholder="Add a hobby"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHobby())}
                          />
                          <button type="button" onClick={handleAddHobby}>Add</button>
                        </div>
                        <div className="hobbies-list">
                          {editHobbies.map((hobby, index) => (
                            <span key={index} className="hobby-tag">
                              {hobby}
                              <button type="button" onClick={() => handleRemoveHobby(hobby)}>×</button>
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Password Section */}
                      <div className="password-section">
                        <h3>Change Password (Optional)</h3>
                        <div className="password-field">
                          <div className="form-password">
                            <label>Current</label>
                            <input 
                              type="password" 
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              placeholder="Enter current password"
                            />
                          </div>

                          <div className="form-password">
                            <label>New</label>
                            <input 
                              type="password" 
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password"
                            />
                          </div>

                          <div className="form-password">
                            <label>Confirm New</label>
                            <input 
                              type="password" 
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                {/* Profile Picture */}

                {/* Done Button */}
                <button 
                  type="submit" 
                  className="done-btn"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Done"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div 
            className="edit-modal-overlay"
            onClick={() => setShowDeleteModal(false)}
          >
            <div 
              className="edit-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "400px" }}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setShowDeleteModal(false)}
              >
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

        {/* Email Verification Modal */}
        {showVerificationModal && (
          <div 
            className="edit-modal-overlay"
            onClick={() => setShowVerificationModal(false)}
          >
            <div 
              className="edit-modal-content verification-modal"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "450px" }}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setShowVerificationModal(false)}
              >
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