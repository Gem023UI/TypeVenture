import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    setHasToken(!!token);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };


  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <FontAwesomeIcon icon={faBars} onClick={onMenuClick} />
        <img
          src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759670092/Logo_urcuji.png"
          alt="TypeVenture Logo"
          className="logo"
        />
        <a href="./">TypeVenture</a>
      </div>

      <div className="header-right">
        <ul className="header-links">
          <li className="green"><Link to="/citations">Citations</Link></li>
          <li className="orange"><Link to="/aboutus">About Us</Link></li>

          {hasToken ? (
            <li className="orange">
              <Link onClick={handleLogout}>Log Out</Link>
            </li>
          ) : (
            <li className="orange">
              <Link to="/login">Log In</Link>
            </li>
          )}
        </ul>
      </div>

      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Are you sure you want to log out?</h3>
            <div className="logout-modal-buttons">
              <button onClick={confirmLogout} className="confirm-btn">Yes</button>
              <button onClick={cancelLogout} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
