import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          TypeVenture
        </Link>
      </div>

      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/games">Games</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-ghost">
          ☰
        </label>
      </div>
    </header>
  );
};

export default Header;
