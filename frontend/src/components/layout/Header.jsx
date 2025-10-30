import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    setHasToken(!!token);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
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
          <li className="green"><Link to="/games">Citations</Link></li>
          <li className="orange"><Link to="/contact">About Us</Link></li>

          {hasToken ? (
            <li className="orange">
              <Link to="/" onClick={handleLogout}>Log Out</Link>
            </li>
          ) : (
            <li className="orange">
              <Link to="/login">Log In</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
