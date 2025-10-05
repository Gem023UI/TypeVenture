import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiAward, FiLogOut } from "react-icons/fi";
import "./Drawer.css";

const Drawer = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4 space-y-3">
          <li className="text-xl font-bold mb-2 text-primary">TypeVenture</li>
          <div className="divider my-2"></div>

          <li>
            <Link to="/profile" className="flex items-center gap-2">
              <FiUser /> User Profile
            </Link>
          </li>
          <li>
            <Link to="/leaderboards" className="flex items-center gap-2">
              <FiAward /> Leaderboards
            </Link>
          </li>

          <div className="divider my-2"></div>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-error"
            >
              <FiLogOut /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
