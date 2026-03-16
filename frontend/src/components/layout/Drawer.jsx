import React, { useState, useEffect } from "react";
import { getUserById } from "../../api/user";
import "./Drawer.css";

const Drawer = ({ isOpen, onClose }) => {
  const [avatarUrl, setAvatarUrl] = useState("https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759649430/user_icon_ze74ys.jpg");
  const [username, setUsername] = useState("Guest User");
  const [email, setEmail] = useState("Guest User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.drawer-panel') && !event.target.closest('.drawer-overlay')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          console.log("No userId or token found");
          setLoading(false);
          return;
        }

        const data = await getUserById(userId);

        if (data.user) {
          setUsername(data.user.username);
          setEmail(data.user.email);
          setAvatarUrl(data.user.profilePicture || "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759649430/user_icon_ze74ys.jpg");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}

      <div className={`drawer-panel ${isOpen ? "open" : ""}`}>
        <div className="drawer-content">
          {/* Avatar Section */}
          <div className="avatar">
            <div className="avatar-image">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <img src={avatarUrl} alt="User Avatar" />
                  <h2 className="avatar-username">{username}</h2>
                  <p className="avatar-email">{email}</p>
                </>
              )}
            </div>
          </div>

          {/* Links */}
          <ul className="drawer-links">
            <li className="red">
              <a href="/lessons" onClick={onClose}>Lessons</a>
            </li>
            <li className="blue">
              <a href="/articles" onClick={onClose}>Articles</a>
            </li>
            <li className="blue">
              <a href="/games" onClick={onClose}>Games</a>
            </li>
            <li className="purple">
              <a href="/profile" onClick={onClose}>Profile</a>
            </li>
            <li className="blue">
              <a href="/leaderboards" onClick={onClose}>Leaderboards</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;