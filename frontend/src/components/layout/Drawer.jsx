import React, { useState, useEffect } from "react";
import "./Drawer.css";

const Drawer = ({ isOpen, onClose }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch avatar and username from sessionStorage
    const storedAvatar = sessionStorage.getItem("profilePicture");
    const storedUsername = sessionStorage.getItem("username");

    if (storedAvatar)
      setAvatarUrl(storedAvatar);
    else
      setAvatarUrl("https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759649430/user_icon_ze74ys.jpg");

    if (storedUsername)
      setUsername(storedUsername);
    else
      setUsername("Guest User");
  }, []);

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}

      <div className={`drawer-panel ${isOpen ? "open" : ""}`}>
        <div className="drawer-content">
          {/* Avatar Section */}
          <div className="avatar">
            <div className="avatar-image">
              <img src={avatarUrl} alt="User Avatar" />
              <h2 className="avatar-username">{username}</h2>
            </div>
          </div>

          {/* Links */}
          <ul className="drawer-links">
            <li className="purple">
              <a href="/profile" onClick={onClose}>Profile</a>
            </li>
            <li className="green">
              <a href="/statistics" onClick={onClose}>Statistics</a>
            </li>
            <li className="orange">
              <a href="/leaderboards" onClick={onClose}>Leaderboards</a>
            </li>
          </ul>

          {/* Logout Button */}
          <button className="logout-btn" onClick={() => console.log("Logout clicked")}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Drawer;
