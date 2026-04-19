import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const MANAGEMENT_LINKS = [
  { label: "Users",    path: "/adminusers" },
  { label: "Lessons",  path: "/adminlessons" },
  { label: "Games",    path: "/admingames" },
  { label: "Articles", path: "/adminarticles" },
];

const Header = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [hasToken, setHasToken]               = useState(false);
  const [isAdmin, setIsAdmin]                 = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const dropdownRef                           = useRef(null);
  const mobileMenuRef                         = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const token    = localStorage.getItem("token");
    const userrole = localStorage.getItem("userrole");
    setHasToken(!!token);
    setIsAdmin(userrole === "admin");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setMobileMenuOpen(false);
  };

  const confirmLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const cancelLogout = () => setShowLogoutModal(false);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <FontAwesomeIcon icon={faBars} onClick={onMenuClick} />
        <img
          src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759670092/Logo_urcuji.png"
          alt="TypeVenture Logo"
          className="logo"
        />
        <Link to="/">TypeVenture</Link>
      </div>

      {/* ── Desktop Nav ── */}
      <div className="header-right desktop-nav">
        <ul className="header-links">
          <li className="green"><Link to="/citations">Citations</Link></li>
          <li className="orange"><Link to="/aboutus">About Us</Link></li>

          {isAdmin && (
            <li className="management-menu" ref={dropdownRef}>
              <span
                className="management-label"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                Management
                <span className={`management-caret ${dropdownOpen ? "open" : ""}`}>▾</span>
              </span>

              {dropdownOpen && (
                <ul className="management-dropdown">
                  {MANAGEMENT_LINKS.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} onClick={() => setDropdownOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}

          {hasToken ? (
            <li className="orange"><Link onClick={handleLogout}>Log Out</Link></li>
          ) : (
            <li className="orange"><Link to="/login">Log In</Link></li>
          )}
        </ul>
      </div>

      {/* ── Mobile Nav ── */}
      <div className="mobile-nav" ref={mobileMenuRef}>
        {/* Top row: Menu toggle + Login/Logout */}
        <ul className="mobile-top-bar header-links">
          <li>
            <span
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(prev => !prev)}
            >
              Menu
              <span className={`management-caret ${mobileMenuOpen ? "open" : ""}`}>▾</span>
            </span>
          </li>
          <li>
            {hasToken ? (
              <Link onClick={handleLogout}>Log Out</Link>
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </li>
        </ul>

        {/* Expandable dropdown */}
        {mobileMenuOpen && (
          <ul className="mobile-dropdown">
            <li><Link to="/citations" onClick={() => setMobileMenuOpen(false)}>Citations</Link></li>
            <li><Link to="/aboutus" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
            {isAdmin && MANAGEMENT_LINKS.map((item) => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
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