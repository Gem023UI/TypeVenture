import React, { useEffect, useState } from "react";
import { getUserById } from "../../api/user";
import { editProfile } from "../../api/user";
import MainLayout from "../layout/MainLayout";
import Lanyard from '../bins/media/Lanyard';
import "./Profile.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [dateJoined, setDateJoined] = useState("");
  
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Modal fields
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

  const handleOpenEditModal = () => {
    // Pre-fill modal with current data
    setEditUsername(username);
    setEditEmail(email);
    setEditHobbies([...hobbies]);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSelectedFile(null);
    setPreviewUrl(sessionStorage.getItem("profilePicture") || "");
    setMessage("");
    setError("");
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
        sessionStorage.setItem("profilePicture", response.user.profilePicture);
        window.dispatchEvent(new Event('profilePictureUpdated'));
      }
      if (response.user.hobbies) {
        sessionStorage.setItem("hobbies", JSON.stringify(response.user.hobbies));
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

  return (
    <MainLayout>
      <div className="profile-container">
        {/* Profile Details Section */}
        <div className="profile-details-section">
          <h2>Profile Details</h2>
          
          <div className="detail-group">
            <label>Username</label>
            <p>{username}</p>
          </div>

          <div className="detail-group">
            <label>Email</label>
            <p>{email}</p>
          </div>

          <div className="detail-group">
            <label>Date Joined</label>
            <p>{dateJoined}</p>
          </div>

          <div className="detail-group">
            <label>Hobbies</label>
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

          <button 
            className="edit-profile-btn"
            onClick={handleOpenEditModal}
          >
            Edit Profile
          </button>
        </div>

        {/* Lanyard Section */}
        <div className="lanyard-section">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
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

              <h2>Edit Profile</h2>
              
              {message && <div className="success-message">{message}</div>}
              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Profile Picture */}
                <div className="form-group">
                  <label>Profile Picture</label>
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Profile Preview" 
                      className="profile-preview"
                    />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Username */}
                <div className="form-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    value={editUsername} 
                    onChange={(e) => setEditUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Hobbies */}
                <div className="form-group">
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
                  
                  <div className="form-group">
                    <label>Current Password</label>
                    <input 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

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
      </div>
    </MainLayout>
  );
};

export default Profile;