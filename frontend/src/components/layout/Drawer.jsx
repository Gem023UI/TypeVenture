import React, { useEffect, useState } from "react";
import "./Drawer.css";

const Drawer = ({ isOpen, onClose }) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const storedAvatar = sessionStorage.getItem("profilePicture");
    if (storedAvatar)
      setAvatarUrl(storedAvatar);
    else
      setAvatarUrl("https://img.daisyui.com/images/profile/demo/batperson@192.webp");
  }, []);

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}

      <div className={`drawer-panel ${isOpen ? "open" : ""}`}>
        <div className="drawer-content">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatarUrl} alt="User Avatar" />
            </div>
          </div>

          {/* Links */}
          <ul className="drawer-links">
            <li><a href="/profile" onClick={onClose}>Profile</a></li>
            <li><a href="/statistics" onClick={onClose}>Statistics</a></li>
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
