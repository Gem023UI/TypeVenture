import React, { useEffect, useState } from "react";
import { editProfile } from "../../api/user";
import MainLayout from "../layout/MainLayout";
import Lanyard from '../bins/media/Lanyard';
import "./Profile.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [hobbies, setHobbies] = useState([]);
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
    // Load user data from sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    const storedEmail = sessionStorage.getItem("email");
    const storedProfilePicture = sessionStorage.getItem("profilePicture");
    const storedHobbies = sessionStorage.getItem("hobbies");

    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
      setPreviewUrl(storedProfilePicture);
    }
    if (storedHobbies) {
      try {
        setHobbies(JSON.parse(storedHobbies));
      } catch (e) {
        setHobbies([]);
      }
    }
  }, []);

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
    if (hobbyInput.trim() && !hobbies.includes(hobbyInput.trim())) {
      setHobbies([...hobbies, hobbyInput.trim()]);
      setHobbyInput("");
    }
  };

  const handleRemoveHobby = (hobbyToRemove) => {
    setHobbies(hobbies.filter(hobby => hobby !== hobbyToRemove));
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
      formData.append("username", username);
      
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }
      
      if (currentPassword && newPassword) {
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }
      
      formData.append("hobbies", JSON.stringify(hobbies));

      const response = await editProfile(formData);
      
      // Update sessionStorage
      if (response.user.profilePicture) {
        sessionStorage.setItem("profilePicture", response.user.profilePicture);
        setProfilePicture(response.user.profilePicture);
      }
      if (response.user.hobbies) {
        sessionStorage.setItem("hobbies", JSON.stringify(response.user.hobbies));
      }

      setMessage("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSelectedFile(null);
      
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="profile-container">
        {/* Lanyard Component */}
        <div className="lanyard-section">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>

        {/* Profile Form */}
        <div className="profile-form-section">
          <h2>Edit Profile</h2>
          
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Profile Picture Preview */}
            <div className="profile-picture-section">
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

            {/* Username (read-only) */}
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={username} 
                disabled 
              />
            </div>

            {/* Email (read-only) */}
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                disabled 
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
                {hobbies.map((hobby, index) => (
                  <span key={index} className="hobby-tag">
                    {hobby}
                    <button type="button" onClick={() => handleRemoveHobby(hobby)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Password Change Section */}
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

            {/* Submit Button */}
            <button 
              type="submit" 
              className="save-profile-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;